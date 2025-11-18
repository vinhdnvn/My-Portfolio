import { useQuery, useMutation, useQueryClient, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';
import { ApiResponse, ApiError } from '@/lib/types/api';
import { apiClient } from '@/lib/utils/api';

// Generic hook for fetching data with React Query
export function useApiData<T = unknown>(
  key: string | string[],
  url: string,
  options?: Omit<UseQueryOptions<ApiResponse<T>>, 'queryKey'> & {
    enabled?: boolean;
    retry?: number;
    staleTime?: number;
    cacheTime?: number;
    refetchOnWindowFocus?: boolean;
    refetchOnReconnect?: boolean;
  }
) {
  const queryKey = Array.isArray(key) ? key : [key];

  return useQuery<ApiResponse<T>>({
    queryKey,
    queryFn: async () => {
      return apiClient.get<T>(url, {}, { enabled: true, ttl: options?.staleTime });
    },
    enabled: options?.enabled ?? true,
    retry: options?.retry ?? 3,
    staleTime: options?.staleTime ?? 5 * 60 * 1000, // 5 minutes
    cacheTime: options?.cacheTime ?? 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: options?.refetchOnWindowFocus ?? false,
    refetchOnReconnect: options?.refetchOnReconnect ?? true,
    ...options,
  });
}

// Generic hook for creating data with React Query
export function useCreateApiData<T = unknown>(
  url: string,
  options?: UseMutationOptions<ApiResponse<T>, ApiError, unknown> & {
    onSuccess?: (data: T) => void;
    onError?: (error: ApiError) => void;
    onSettled?: () => void;
  }
) {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<T>, ApiError, unknown>({
    mutationFn: async (data: unknown) => {
      return apiClient.post<T>(url, data);
    },
    onSuccess: (response) => {
      if (response.success && response.data) {
        options?.onSuccess?.(response.data);
      }
    },
    onError: (error) => {
      options?.onError?.(error as ApiError);
    },
    onSettled: () => {
      options?.onSettled?.();
    },
    ...options,
  });
}

// Generic hook for updating data with React Query
export function useUpdateApiData<T = unknown>(
  url: string,
  options?: UseMutationOptions<ApiResponse<T>, ApiError, { id: string; data: Partial<T> }> & {
    onSuccess?: (data: T) => void;
    onError?: (error: ApiError) => void;
    onSettled?: () => void;
  }
) {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<T>, ApiError, { id: string; data: Partial<T> }>({
    mutationFn: async ({ id, data }) => {
      return apiClient.put<T>(`${url}/${id}`, data);
    },
    onSuccess: (response) => {
      if (response.success && response.data) {
        options?.onSuccess?.(response.data);
      }
    },
    onError: (error) => {
      options?.onError?.(error as ApiError);
    },
    onSettled: () => {
      options?.onSettled?.();
    },
    ...options,
  });
}

// Generic hook for deleting data with React Query
export function useDeleteApiData<T = unknown>(
  url: string,
  options?: UseMutationOptions<ApiResponse<T>, ApiError, string> & {
    onSuccess?: (data: T) => void;
    onError?: (error: ApiError) => void;
    onSettled?: () => void;
  }
) {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<T>, ApiError, string>({
    mutationFn: async (id: string) => {
      return apiClient.delete<T>(`${url}/${id}`);
    },
    onSuccess: (response) => {
      if (response.success && response.data) {
        options?.onSuccess?.(response.data);
      }
    },
    onError: (error) => {
      options?.onError?.(error as ApiError);
    },
    onSettled: () => {
      options?.onSettled?.();
    },
    ...options,
  });
}

// Hook for paginated data fetching
export function usePaginatedApiData<T = unknown>(
  key: string | string[],
  url: string,
  options?: Omit<UseQueryOptions<ApiResponse<{ items: T[]; pagination: Record<string, unknown> }>>, 'queryKey'> & {
    enabled?: boolean;
    page?: number;
    limit?: number;
    retry?: number;
    staleTime?: number;
  }
) {
  const queryKey = Array.isArray(key) ? key : [key];
  const page = options?.page ?? 1;
  const limit = options?.limit ?? 10;

  return useQuery<ApiResponse<{ items: T[]; pagination: Record<string, unknown> }>>({
    queryKey: [...queryKey, page, limit],
    queryFn: async () => {
      const searchParams = new URLSearchParams({ page: page.toString(), limit: limit.toString() });
      return apiClient.get<{ items: T[]; pagination: Record<string, unknown> }>(`${url}?${searchParams}`, {}, { enabled: true, ttl: options?.staleTime });
    },
    enabled: options?.enabled ?? true,
    retry: options?.retry ?? 3,
    staleTime: options?.staleTime ?? 5 * 60 * 1000, // 5 minutes
    ...options,
  });
}

// Hook for infinite scroll data fetching
export function useInfiniteApiData<T = unknown>(
  key: string | string[],
  url: string,
  options?: Omit<UseQueryOptions<ApiResponse<{ items: T[]; nextCursor?: string }>>, 'queryKey'> & {
    enabled?: boolean;
    limit?: number;
    retry?: number;
    staleTime?: number;
  }
) {
  const queryKey = Array.isArray(key) ? key : [key];
  const limit = options?.limit ?? 10;

  return useQuery<ApiResponse<{ items: T[]; nextCursor?: string }>>({
    queryKey: queryKey,
    queryFn: async () => {
      const searchParams = new URLSearchParams({ limit: limit.toString() });
      return apiClient.get<{ items: T[]; nextCursor?: string }>(`${url}?${searchParams}`, {}, { enabled: true, ttl: options?.staleTime });
    },
    enabled: options?.enabled ?? true,
    retry: options?.retry ?? 3,
    staleTime: options?.staleTime ?? 5 * 60 * 1000, // 5 minutes
    ...options,
  });
}

// Hook for real-time data with polling
export function useRealTimeApiData<T = unknown>(
  key: string | string[],
  url: string,
  options?: Omit<UseQueryOptions<ApiResponse<T>>, 'queryKey'> & {
    enabled?: boolean;
    retry?: number;
    staleTime?: number;
    refetchInterval?: number; // in milliseconds
  }
) {
  const queryKey = Array.isArray(key) ? key : [key];

  return useQuery<ApiResponse<T>>({
    queryKey,
    queryFn: async () => {
      return apiClient.get<T>(url, {}, { enabled: true, ttl: options?.staleTime });
    },
    enabled: options?.enabled ?? true,
    retry: options?.retry ?? 3,
    staleTime: options?.staleTime ?? 30 * 1000, // 30 seconds for real-time data
    refetchInterval: options?.refetchInterval,
    ...options,
  });
}
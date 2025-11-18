import type { 
  ApiResponse, 
  ApiError, 
  HttpClientConfig, 
  RequestInterceptor, 
  ResponseInterceptor,
  CacheConfig
} from '@/lib/types/api';

class ApiClient {
  private baseURL: string;
  private timeout: number;
  private headers: Record<string, string>;
  private retries: number;
  private retryDelay: number;
  private requestInterceptors: RequestInterceptor[] = [];
  private responseInterceptors: ResponseInterceptor[] = [];
  private cache: Map<string, { data: unknown; timestamp: number; ttl?: number }> = new Map();

  constructor(config: HttpClientConfig = {}) {
    this.baseURL = config.baseURL || '';
    this.timeout = config.timeout || 10000;
    this.headers = config.headers || {};
    this.retries = config.retries || 3;
    this.retryDelay = config.retryDelay || 1000;
  }

  // Request interceptor methods
  addRequestInterceptor(interceptor: RequestInterceptor) {
    this.requestInterceptors.push(interceptor);
  }

  // Response interceptor methods
  addResponseInterceptor(interceptor: ResponseInterceptor) {
    this.responseInterceptors.push(interceptor);
  }

  // Private method to apply request interceptors
  private async applyRequestInterceptors(config: RequestInit): Promise<RequestInit> {
    let processedConfig = { ...config };

    for (const interceptor of this.requestInterceptors) {
      if (interceptor.onRequest) {
        processedConfig = await interceptor.onRequest(processedConfig);
      }
    }

    return processedConfig;
  }

  // Private method to apply response interceptors
  private async applyResponseInterceptors(response: Response): Promise<Response> {
    let processedResponse = response;

    for (const interceptor of this.responseInterceptors) {
      if (interceptor.onResponse) {
        processedResponse = await interceptor.onResponse(processedResponse);
      }
    }

    return processedResponse;
  }

  // Private method to handle request errors
  private async handleRequestError(error: Error): Promise<Error> {
    for (const interceptor of this.requestInterceptors) {
      if (interceptor.onRequestError) {
        return await interceptor.onRequestError(error);
      }
    }

    return error;
  }

  // Private method to handle response errors
  private async handleResponseError(error: Error): Promise<Error> {
    for (const interceptor of this.responseInterceptors) {
      if (interceptor.onResponseError) {
        return await interceptor.onResponseError(error);
      }
    }

    return error;
  }

  // Cache management
  private getCacheKey(url: string, options: RequestInit = {}): string {
    return `${url}:${JSON.stringify(options)}`;
  }

  private getFromCache(key: string): unknown | null {
    const cached = this.cache.get(key);
    if (!cached) return null;

    const now = Date.now();
    if (cached.ttl && now - cached.timestamp > cached.ttl * 1000) {
      this.cache.delete(key);
      return null;
    }

    return cached.data;
  }

  private setCache(key: string, data: unknown, ttl?: number): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl,
    });
  }

  // HTTP request method with retry logic
  private async makeRequest(
    url: string,
    options: RequestInit = {},
    retryCount = 0
  ): Promise<Response> {
    try {
      // Apply request interceptors
      const processedOptions = await this.applyRequestInterceptors(options);

      // Set up timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.timeout);

      // Make the request
      const response = await fetch(`${this.baseURL}${url}`, {
        ...processedOptions,
        signal: controller.signal,
        headers: {
          ...this.headers,
          ...processedOptions.headers,
        },
      });

      clearTimeout(timeoutId);

      // Apply response interceptors
      return await this.applyResponseInterceptors(response);
    } catch (error) {
      if (retryCount < this.retries) {
        await new Promise(resolve => setTimeout(resolve, this.retryDelay));
        return this.makeRequest(url, options, retryCount + 1);
      }

      throw error;
    }
  }

  // Generic request method
  async request<T = unknown>(
    url: string,
    options: RequestInit = {},
    cacheConfig?: CacheConfig
  ): Promise<ApiResponse<T>> {
    try {
      // Check cache if enabled
      if (cacheConfig?.enabled) {
        const cacheKey = this.getCacheKey(url, options);
        const cachedData = this.getFromCache(cacheKey);
        if (cachedData) {
          return {
            data: cachedData as T,
            success: true,
          };
        }
      }

      const response = await this.makeRequest(url, options);

      if (!response.ok) {
        const errorData: ApiError = {
          message: response.statusText,
          code: response.status.toString(),
        };

        try {
          const errorBody = await response.json();
          errorData.details = errorBody;
        } catch {
          // Ignore JSON parsing errors
        }

        return {
          data: null as T,
          success: false,
          message: errorData.message,
          errors: [errorData.message],
        };
      }

      const data = await response.json();

      // Cache the response if enabled
      if (cacheConfig?.enabled) {
        const cacheKey = this.getCacheKey(url, options);
        this.setCache(cacheKey, data, cacheConfig.ttl);
      }

      return {
        data,
        success: true,
      };
    } catch (error) {
      const apiError: ApiError = {
        message: error instanceof Error ? error.message : 'Unknown error occurred',
        code: 'NETWORK_ERROR',
        details: error instanceof Error ? { message: error.message, stack: error.stack } : { error },
      };

      return {
        data: null as T,
        success: false,
        message: apiError.message,
        errors: [apiError.message],
      };
    }
  }

  // Convenience methods
  async get<T = unknown>(
    url: string,
    options: Omit<RequestInit, 'method'> = {},
    cacheConfig?: CacheConfig
  ): Promise<ApiResponse<T>> {
    return this.request<T>(url, { ...options, method: 'GET' }, cacheConfig);
  }

  async post<T = unknown>(
    url: string,
    data?: unknown,
    options: Omit<RequestInit, 'method' | 'body'> = {}
  ): Promise<ApiResponse<T>> {
    return this.request<T>(url, {
      ...options,
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });
  }

  async put<T = unknown>(
    url: string,
    data?: unknown,
    options: Omit<RequestInit, 'method' | 'body'> = {}
  ): Promise<ApiResponse<T>> {
    return this.request<T>(url, {
      ...options,
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });
  }

  async patch<T = unknown>(
    url: string,
    data?: unknown,
    options: Omit<RequestInit, 'method' | 'body'> = {}
  ): Promise<ApiResponse<T>> {
    return this.request<T>(url, {
      ...options,
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });
  }

  async delete<T = unknown>(
    url: string,
    options: Omit<RequestInit, 'method'> = {}
  ): Promise<ApiResponse<T>> {
    return this.request<T>(url, { ...options, method: 'DELETE' });
  }
}

// Create default API client instance
export const apiClient = new ApiClient({
  timeout: 10000,
  retries: 3,
  retryDelay: 1000,
});

// Export the ApiClient class for creating custom instances
export { ApiClient };
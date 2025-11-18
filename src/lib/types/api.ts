// API Request/Response types
export interface ApiResponse<T = unknown> {
  data: T;
  success: boolean;
  message?: string;
  errors?: string[];
}

export interface ApiError {
  message: string;
  code?: string;
  details?: Record<string, unknown>;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  offset?: number;
}

export interface SortParams {
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface FilterParams {
  search?: string;
  filters?: Record<string, unknown>;
}

export interface QueryParams extends PaginationParams, SortParams, FilterParams {}

// API Endpoint types
export interface ApiEndpoint {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: Record<string, unknown>;
  params?: QueryParams;
}

// Specific API endpoints for our entities
export interface ProfileApiEndpoints {
  getProfile: (id: string) => ApiEndpoint;
  getProfiles: (params?: QueryParams) => ApiEndpoint;
  createProfile: (data: Record<string, unknown>) => ApiEndpoint;
  updateProfile: (id: string, data: Record<string, unknown>) => ApiEndpoint;
  deleteProfile: (id: string) => ApiEndpoint;
}

export interface ProjectApiEndpoints {
  getProject: (id: string) => ApiEndpoint;
  getProjects: (params?: QueryParams) => ApiEndpoint;
  createProject: (data: Record<string, unknown>) => ApiEndpoint;
  updateProject: (id: string, data: Record<string, unknown>) => ApiEndpoint;
  deleteProject: (id: string) => ApiEndpoint;
}

export interface ExperienceApiEndpoints {
  getExperience: (id: string) => ApiEndpoint;
  getExperiences: (params?: QueryParams) => ApiEndpoint;
  createExperience: (data: Record<string, unknown>) => ApiEndpoint;
  updateExperience: (id: string, data: Record<string, unknown>) => ApiEndpoint;
  deleteExperience: (id: string) => ApiEndpoint;
}

export interface PostApiEndpoints {
  getPost: (id: string) => ApiEndpoint;
  getPosts: (params?: QueryParams) => ApiEndpoint;
  getPostBySlug: (slug: string) => ApiEndpoint;
  createPost: (data: Record<string, unknown>) => ApiEndpoint;
  updatePost: (id: string, data: Record<string, unknown>) => ApiEndpoint;
  deletePost: (id: string) => ApiEndpoint;
}

export interface AchievementApiEndpoints {
  getAchievement: (id: string) => ApiEndpoint;
  getAchievements: (params?: QueryParams) => ApiEndpoint;
  createAchievement: (data: Record<string, unknown>) => ApiEndpoint;
  updateAchievement: (id: string, data: Record<string, unknown>) => ApiEndpoint;
  deleteAchievement: (id: string) => ApiEndpoint;
}

export interface SiteSettingsApiEndpoints {
  getSiteSettings: () => ApiEndpoint;
  updateSiteSettings: (id: string, data: Record<string, unknown>) => ApiEndpoint;
}

// HTTP Client configuration
export interface HttpClientConfig {
  baseURL?: string;
  timeout?: number;
  headers?: Record<string, string>;
  retries?: number;
  retryDelay?: number;
}

// Request interceptor types
export interface RequestInterceptor {
  onRequest?: (config: Record<string, unknown>) => Record<string, unknown>;
  onRequestError?: (error: Error) => Promise<Error>;
}

export interface ResponseInterceptor {
  onResponse?: (response: Response) => Response;
  onResponseError?: (error: Error) => Promise<Error>;
}

// Cache configuration
export interface CacheConfig {
  enabled: boolean;
  ttl?: number; // Time to live in seconds
  maxSize?: number;
}
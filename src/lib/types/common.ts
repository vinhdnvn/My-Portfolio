// Common utility types used throughout the application

// Primitive types
export type ID = string;
export type Timestamp = string;
export type DateString = string;
export type Email = string;
export type URL = string;
export type PhoneNumber = string;

// Status types
export type Status = 'idle' | 'loading' | 'success' | 'error';
export type LoadingState = 'idle' | 'pending' | 'success' | 'error';

// Selection types
export type SelectOption<T = string> = {
  value: T;
  label: string;
  disabled?: boolean;
};

export type MultiSelectOption<T = string> = SelectOption<T> & {
  selected?: boolean;
};

// File types
export interface FileUpload {
  file: File;
  preview?: string;
  progress?: number;
  error?: string;
}

export interface UploadedFile {
  id: string;
  name: string;
  url: string;
  size: number;
  type: string;
  uploadedAt: string;
}

// Error types
export interface AppError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
  timestamp: string;
}

export interface ValidationError {
  field: string;
  message: string;
  code?: string;
}

// Event types
export interface BaseEvent {
  id: string;
  timestamp: string;
  type: string;
  payload?: Record<string, unknown>;
}

// User preferences
export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  language: string;
  timezone: string;
  notifications: {
    email: boolean;
    push: boolean;
    inApp: boolean;
  };
  privacy: {
    profileVisibility: 'public' | 'private';
    showEmail: boolean;
    showPhone: boolean;
  };
}

// Search and filter types
export interface SearchFilters {
  query?: string;
  category?: string;
  tags?: string[];
  dateRange?: {
    start: string;
    end: string;
  };
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface SearchResult<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

// Metadata types
export interface Metadata {
  title?: string;
  description?: string;
  keywords?: string[];
  author?: string;
  image?: string;
  url?: string;
}

// Social media types
export interface SocialLinks {
  github?: string;
  linkedin?: string;
  twitter?: string;
  facebook?: string;
  instagram?: string;
  youtube?: string;
  website?: string;
}

// Contact information
export interface ContactInfo {
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  country?: string;
  socialLinks?: SocialLinks;
}

// Pagination types
export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

// Sort types
export interface SortOption {
  field: string;
  direction: 'asc' | 'desc';
}

// Array utility types
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredBy<T, K extends keyof T> = T & Required<Pick<T, K>>;
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

// Function types
export type EventHandler<T = Event> = (event: T) => void;
export type AsyncEventHandler<T = Event> = (event: T) => Promise<void>;
export type AsyncCallback<T = void, R = void> = (...args: T[]) => Promise<R>;

// Component lifecycle types
export interface LifecycleCallbacks {
  onMount?: () => void | Promise<void>;
  onUnmount?: () => void | Promise<void>;
  onUpdate?: (prevProps: unknown, prevState: unknown) => void | Promise<void>;
}

// Cache types
export interface CacheEntry<T> {
  value: T;
  timestamp: number;
  ttl?: number;
}

export interface CacheOptions {
  ttl?: number;
  maxSize?: number;
  strategy?: 'lru' | 'fifo' | 'lfu';
}

// Environment types
export type Environment = 'development' | 'staging' | 'production';

// Feature flag types
export interface FeatureFlags {
  [key: string]: boolean;
}

// Analytics types
export interface AnalyticsEvent {
  event: string;
  properties?: Record<string, unknown>;
  timestamp?: string;
  userId?: string;
  sessionId?: string;
}

// Notification types
export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
  dismissible?: boolean;
  timestamp: string;
}

// Route types
export interface Route {
  path: string;
  component: React.ComponentType;
  exact?: boolean;
  protected?: boolean;
  roles?: string[];
  metadata?: Metadata;
}

// Breadcrumb types
export interface BreadcrumbItem {
  label: string;
  href?: string;
  active?: boolean;
}

// Tab types
export interface TabItem {
  id: string;
  label: string;
  content: React.ReactNode;
  disabled?: boolean;
  icon?: React.ReactNode;
}

// Modal types
export interface ModalConfig {
  title?: string;
  content: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  closable?: boolean;
  maskClosable?: boolean;
  className?: string;
}

// Drawer types
export interface DrawerConfig {
  title?: string;
  content: React.ReactNode;
  placement?: 'left' | 'right' | 'top' | 'bottom';
  size?: number | string;
  closable?: boolean;
  maskClosable?: boolean;
  className?: string;
}
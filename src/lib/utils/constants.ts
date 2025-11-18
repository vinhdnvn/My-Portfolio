// API endpoints
export const API_ENDPOINTS = {
  // Profile endpoints
  PROFILES: '/api/profiles',
  PROFILE: (id: string) => `/api/profiles/${id}`,
  
  // Project endpoints
  PROJECTS: '/api/projects',
  PROJECT: (id: string) => `/api/projects/${id}`,
  
  // Experience endpoints
  EXPERIENCES: '/api/experiences',
  EXPERIENCE: (id: string) => `/api/experiences/${id}`,
  
  // Post endpoints
  POSTS: '/api/posts',
  POST: (id: string) => `/api/posts/${id}`,
  POST_BY_SLUG: (slug: string) => `/api/posts/slug/${slug}`,
  
  // Achievement endpoints
  ACHIEVEMENTS: '/api/achievements',
  ACHIEVEMENT: (id: string) => `/api/achievements/${id}`,
  
  // Site settings endpoints
  SITE_SETTINGS: '/api/site-settings',
} as const;

// Pagination constants
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100,
} as const;

// Cache TTL constants (in seconds)
export const CACHE_TTL = {
  SHORT: 60, // 1 minute
  MEDIUM: 300, // 5 minutes
  LONG: 900, // 15 minutes
  VERY_LONG: 3600, // 1 hour
} as const;

// File upload constants
export const FILE_UPLOAD = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_TYPES: [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
    'application/pdf',
    'text/plain',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ],
  MAX_COUNT: 5,
} as const;

// Date format constants
export const DATE_FORMATS = {
  DISPLAY: 'MMMM d, yyyy',
  API: 'yyyy-MM-dd',
  DATETIME: 'yyyy-MM-dd HH:mm:ss',
  TIME: 'HH:mm:ss',
} as const;

// Validation constants
export const VALIDATION = {
  MIN_PASSWORD_LENGTH: 8,
  MAX_PASSWORD_LENGTH: 128,
  MIN_NAME_LENGTH: 2,
  MAX_NAME_LENGTH: 50,
  MAX_DESCRIPTION_LENGTH: 500,
  MAX_BIO_LENGTH: 1000,
  MAX_TITLE_LENGTH: 100,
  MAX_EMAIL_LENGTH: 254,
  MAX_URL_LENGTH: 2048,
} as const;

// UI constants
export const UI = {
  ANIMATION_DURATION: {
    FAST: 150,
    NORMAL: 300,
    SLOW: 500,
  },
  BREAKPOINTS: {
    SM: 640,
    MD: 768,
    LG: 1024,
    XL: 1280,
    '2XL': 1536,
  },
  Z_INDEX: {
    DROPDOWN: 1000,
    MODAL: 1050,
    TOOLTIP: 1100,
    NOTIFICATION: 9999,
  },
} as const;

// Theme constants
export const THEME = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system',
} as const;

// Status constants
export const STATUS = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
} as const;

// Sort options
export const SORT_OPTIONS = {
  ASC: 'asc',
  DESC: 'desc',
} as const;

// Common sort fields
export const SORT_FIELDS = {
  CREATED_AT: 'createdAt',
  UPDATED_AT: 'updatedAt',
  TITLE: 'title',
  NAME: 'name',
  DATE: 'date',
} as const;

// Error codes
export const ERROR_CODES = {
  NETWORK_ERROR: 'NETWORK_ERROR',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  NOT_FOUND: 'NOT_FOUND',
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  SERVER_ERROR: 'SERVER_ERROR',
  TIMEOUT: 'TIMEOUT',
} as const;

// Regular expressions
export const REGEX = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  URL: /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&=]*)$/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/,
  SLUG: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
  PHONE: /^\+?[\d\s-()]{10,}$/,
} as const;

// Social media platforms
export const SOCIAL_PLATFORMS = {
  GITHUB: 'github',
  LINKEDIN: 'linkedin',
  TWITTER: 'twitter',
  FACEBOOK: 'facebook',
  INSTAGRAM: 'instagram',
  YOUTUBE: 'youtube',
  WEBSITE: 'website',
} as const;

// Notification types
export const NOTIFICATION_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
} as const;

// Loading states
export const LOADING_STATES = {
  IDLE: 'idle',
  PENDING: 'pending',
  SUCCESS: 'success',
  ERROR: 'error',
} as const;

// Environment variables
export const ENV = {
  DEVELOPMENT: 'development',
  STAGING: 'staging',
  PRODUCTION: 'production',
} as const;

// Feature flags
export const FEATURES = {
  DARK_MODE: 'darkMode',
  NOTIFICATIONS: 'notifications',
  ANALYTICS: 'analytics',
  BETA_FEATURES: 'betaFeatures',
} as const;

// Default values
export const DEFAULTS = {
  PAGE_SIZE: 10,
  DEBOUNCE_DELAY: 300,
  TOAST_DURATION: 5000,
  MODAL_CLOSE_DELAY: 200,
} as const;
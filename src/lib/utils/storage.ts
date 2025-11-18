import type { UploadedFile } from '@/lib/types/common';

/**
 * Local storage utility functions
 */

// Storage keys
export const STORAGE_KEYS = {
  THEME: 'portfolio-theme',
  LANGUAGE: 'portfolio-language',
  AUTH_TOKEN: 'portfolio-auth-token',
  USER_PREFERENCES: 'portfolio-user-preferences',
  RECENT_SEARCHES: 'portfolio-recent-searches',
  DRAFTS: 'portfolio-drafts',
} as const;

/**
 * Get item from localStorage
 * @param key - Storage key
 * @returns Stored value or null
 */
export function getStorageItem<T = unknown>(key: string): T | null {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch {
    return null;
  }
}

/**
 * Set item in localStorage
 * @param key - Storage key
 * @param value - Value to store
 */
export function setStorageItem<T = unknown>(key: string, value: T): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Silent fail for localStorage errors
  }
}

/**
 * Remove item from localStorage
 * @param key - Storage key
 */
export function removeStorageItem(key: string): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    localStorage.removeItem(key);
  } catch {
    // Silent fail for localStorage errors
  }
}

/**
 * Clear all localStorage items
 */
export function clearStorage(): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    localStorage.clear();
  } catch {
    // Silent fail for localStorage errors
  }
}

/**
 * Get all storage keys
 * @returns Array of storage keys
 */
export function getStorageKeys(): string[] {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const keys = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) {
        keys.push(key);
      }
    }
    return keys;
  } catch {
    return [];
  }
}

/**
 * Get storage usage information
 * @returns Storage usage object
 */
export function getStorageUsage(): {
  used: number;
  total: number;
  percentage: number;
} {
  if (typeof window === 'undefined') {
    return { used: 0, total: 0, percentage: 0 };
  }

  try {
    let used = 0;
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) {
        const value = localStorage.getItem(key);
        used += new Blob([value as string]).size;
      }
    }

    // Estimate 5MB total storage
    const total = 5 * 1024 * 1024;
    
    return {
      used,
      total,
      percentage: (used / total) * 100,
    };
  } catch {
    return { used: 0, total: 0, percentage: 0 };
  }
}

/**
 * Session storage utility functions
 */

/**
 * Get item from sessionStorage
 * @param key - Storage key
 * @returns Stored value or null
 */
export function getSessionItem<T = unknown>(key: string): T | null {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const item = sessionStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch {
    return null;
  }
}

/**
 * Set item in sessionStorage
 * @param key - Storage key
 * @param value - Value to store
 */
export function setSessionItem<T = unknown>(key: string, value: T): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    sessionStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Silent fail for sessionStorage errors
  }
}

/**
 * Remove item from sessionStorage
 * @param key - Storage key
 */
export function removeSessionItem(key: string): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    sessionStorage.removeItem(key);
  } catch {
    // Silent fail for sessionStorage errors
  }
}

/**
 * File upload storage utilities
 */

/**
 * Save uploaded file information
 * @param file - Uploaded file to save
 * @param key - Storage key (optional)
 */
export function saveUploadedFile(
  file: UploadedFile,
  key: string = 'uploaded-files'
): void {
  const existingFiles = getStorageItem<UploadedFile[]>(key) || [];
  const updatedFiles = [...existingFiles, file];
  setStorageItem(key, updatedFiles);
}

/**
 * Get uploaded files
 * @param key - Storage key (optional)
 * @returns Array of uploaded files
 */
export function getUploadedFiles(key: string = 'uploaded-files'): UploadedFile[] {
  return getStorageItem<UploadedFile[]>(key) || [];
}

/**
 * Remove uploaded file
 * @param fileId - File ID to remove
 * @param key - Storage key (optional)
 */
export function removeUploadedFile(
  fileId: string,
  key: string = 'uploaded-files'
): void {
  const existingFiles = getStorageItem<UploadedFile[]>(key) || [];
  const updatedFiles = existingFiles.filter(file => file.id !== fileId);
  setStorageItem(key, updatedFiles);
}

/**
 * Cache utilities
 */

/**
 * Simple in-memory cache
 */
export class MemoryCache<T = unknown> {
  private cache = new Map<string, { value: T; timestamp: number; ttl?: number }>();

  /**
   * Get item from cache
   * @param key - Cache key
   * @returns Cached value or null
   */
  get(key: string): T | null {
    const item = this.cache.get(key);
    if (!item) return null;

    // Check if item has expired
    if (item.ttl && Date.now() - item.timestamp > item.ttl * 1000) {
      this.cache.delete(key);
      return null;
    }

    return item.value;
  }

  /**
   * Set item in cache
   * @param key - Cache key
   * @param value - Value to cache
   * @param ttl - Time to live in seconds (optional)
   */
  set(key: string, value: T, ttl?: number): void {
    this.cache.set(key, {
      value,
      timestamp: Date.now(),
      ttl,
    });
  }

  /**
   * Remove item from cache
   * @param key - Cache key
   */
  delete(key: string): void {
    this.cache.delete(key);
  }

  /**
   * Clear all cache items
   */
  clear(): void {
    this.cache.clear();
  }

  /**
   * Get cache size
   * @returns Number of items in cache
   */
  size(): number {
    return this.cache.size;
  }

  /**
   * Clean expired items
   */
  clean(): void {
    const now = Date.now();
    for (const [key, item] of this.cache.entries()) {
      if (item.ttl && now - item.timestamp > item.ttl * 1000) {
        this.cache.delete(key);
      }
    }
  }
}

// Create a global cache instance
export const globalCache = new MemoryCache();
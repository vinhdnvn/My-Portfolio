/**
 * Object utility functions
 */

/**
 * Deep clone an object
 * @param obj - Object to clone
 * @returns Cloned object
 */
export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (obj instanceof Date) {
    return new Date(obj.getTime()) as T;
  }

  // Handle arrays
  if (Array.isArray(obj)) {
    return obj.map(item => deepClone(item)) as T;
  }

  // Handle plain objects
  const cloned = {} as T;
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      cloned[key] = deepClone(obj[key]);
    }
  }

  return cloned;
}

/**
 * Deep merge objects
 * @param objects - Objects to merge
 * @returns Merged object
 */
export function deepMerge<T extends Record<string, unknown>>(...objects: T[]): T {
  const result = {} as T;

  for (const obj of objects) {
    if (obj && typeof obj === 'object') {
      for (const key in obj) {
        if (obj[key] !== undefined) {
          if (result[key] === undefined) {
            result[key] = obj[key] as T[Extract<keyof T, string>];
          } else {
            result[key] = deepMerge(result[key] as Record<string, unknown>, obj[key] as Record<string, unknown>) as T[Extract<keyof T, string>];
          }
        }
      }
    }
  }

  return result;
}

/**
 * Check if object is empty
 * @param obj - Object to check
 * @returns True if empty
 */
export function isEmpty(obj: unknown): boolean {
  if (obj === null || obj === undefined) return true;
  if (typeof obj === 'object') {
    return Object.keys(obj).length === 0;
  }
  return false;
}

/**
 * Get object keys
 * @param obj - Object to get keys from
 * @returns Array of keys
 */
export function keys<T extends Record<string, unknown>>(obj: T): (keyof T)[] {
  return Object.keys(obj) as (keyof T)[];
}

/**
 * Get object values
 * @param obj - Object to get values from
 * @returns Array of values
 */
export function values<T extends Record<string, unknown>>(obj: T): T[keyof T][] {
  return Object.values(obj) as T[keyof T][];
}

/**
 * Get object entries
 * @param obj - Object to get entries from
 * @returns Array of key-value pairs
 */
export function entries<T extends Record<string, unknown>>(obj: T): [keyof T, T[keyof T]][] {
  return Object.entries(obj) as [keyof T, T[keyof T]][];
}

/**
 * Pick specific keys from object
 * @param obj - Object to pick from
 * @param keys - Keys to pick
 * @returns Object with picked keys
 */
export function pick<T extends Record<string, unknown>, K extends keyof T>(
  obj: T,
  keys: K[]
): Pick<T, K> {
  const result = {} as Pick<T, K>;
  for (const key of keys) {
    result[key] = obj[key];
  }
  return result;
}

/**
 * Omit specific keys from object
 * @param obj - Object to omit from
 * @param keys - Keys to omit
 * @returns Object without specified keys
 */
export function omit<T extends Record<string, unknown>, K extends keyof T>(
  obj: T,
  keys: K[]
): Omit<T, K> {
  const result = { ...obj } as T;
  for (const key of keys) {
    delete result[key];
  }
  return result as Omit<T, K>;
}

/**
 * Check if object has specific key
 * @param obj - Object to check
 * @param key - Key to check for
 * @returns True if key exists
 */
export function hasKey<T extends Record<string, unknown>>(
  obj: T,
  key: string | number | symbol
): key is keyof T {
  return Object.prototype.hasOwnProperty.call(obj, key);
}

/**
 * Get nested object property
 * @param obj - Object to get property from
 * @param path - Dot notation path
 * @returns Property value or undefined
 */
export function getNestedProperty(obj: unknown, path: string): unknown {
  return path.split('.').reduce((current: unknown, key: string) => {
    if (current && typeof current === 'object' && key in current) {
      return (current as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj as Record<string, unknown>);
}

/**
 * Set nested object property
 * @param obj - Object to set property on
 * @param path - Dot notation path
 * @param value - Value to set
 */
export function setNestedProperty(obj: unknown, path: string, value: unknown): void {
  const keys = path.split('.');
  const lastKey = keys.pop()!;
  
  const target = keys.reduce((current: unknown, key: string, index: number) => {
    if (index === keys.length - 1) {
      return current as Record<string, unknown>;
    }
    
    if (!current || typeof current !== 'object') {
      (current as Record<string, unknown>)[key] = {};
    }
    
    return (current as Record<string, unknown>)[key];
  }, obj as Record<string, unknown>);
  
  (target as Record<string, unknown>)[lastKey] = value;
}

/**
 * Compare two objects
 * @param obj1 - First object
 * @param obj2 - Second object
 * @returns Comparison result
 */
export function compareObjects(obj1: unknown, obj2: unknown): number {
  const str1 = JSON.stringify(obj1);
  const str2 = JSON.stringify(obj2);
  
  if (str1 < str2) return -1;
  if (str1 > str2) return 1;
  return 0;
}

/**
 * Freeze object (prevent modifications)
 * @param obj - Object to freeze
 * @returns Frozen object
 */
export function freeze<T>(obj: T): T {
  return Object.freeze(obj);
}

/**
 * Create object from array of key-value pairs
 * @param entries - Array of [key, value] pairs
 * @returns Created object
 */
export function fromEntries<T extends Record<string, unknown>>(
  entries: [keyof T, T[keyof T]][]
): T {
  return Object.fromEntries(entries) as T;
}

/**
 * Convert object to query string
 * @param obj - Object to convert
 * @returns Query string
 */
export function toQueryString(obj: Record<string, unknown>): string {
  const params = new URLSearchParams();
  
  for (const [key, value] of Object.entries(obj)) {
    if (value !== undefined && value !== null) {
      params.append(key, String(value));
    }
  }
  
  return params.toString();
}

/**
 * Convert query string to object
 * @param queryString - Query string to convert
 * @returns Parsed object
 */
export function fromQueryString(queryString: string): Record<string, string> {
  const params = new URLSearchParams(queryString);
  const result: Record<string, string> = {};
  
  for (const [key, value] of params.entries()) {
    result[key] = value;
  }
  
  return result;
}

/**
 * Check if two objects are equal
 * @param obj1 - First object
 * @param obj2 - Second object
 * @returns True if equal
 */
export function isEqual(obj1: unknown, obj2: unknown): boolean {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
}

/**
 * Get object size (number of properties)
 * @param obj - Object to measure
 * @returns Number of properties
 */
export function size(obj: unknown): number {
  if (obj === null || obj === undefined) return 0;
  if (typeof obj === 'object') {
    return Object.keys(obj).length;
  }
  return 1;
}

/**
 * Transform object values
 * @param obj - Object to transform
 * @param transformer - Transform function
 * @returns Transformed object
 */
export function transform<T extends Record<string, unknown>, U>(
  obj: T,
  transformer: (value: T[keyof T], key: keyof T) => U
): Record<keyof T, U> {
  const result = {} as Record<keyof T, U>;
  
  for (const key in obj) {
    if (obj[key] !== undefined) {
      result[key] = transformer(obj[key], key);
    }
  }
  
  return result;
}

/**
 * Filter object properties
 * @param obj - Object to filter
 * @param predicate - Filter function
 * @returns Filtered object
 */
export function filterObject<T extends Record<string, unknown>>(
  obj: T,
  predicate: (value: T[keyof T], key: keyof T) => boolean
): Partial<T> {
  const result = {} as Partial<T>;
  
  for (const key in obj) {
    if (obj[key] !== undefined && predicate(obj[key], key)) {
      result[key] = obj[key];
    }
  }
  
  return result;
}

/**
 * Map object values
 * @param obj - Object to map
 * @param mapper - Map function
 * @returns Mapped object
 */
export function mapObject<T extends Record<string, unknown>, U>(
  obj: T,
  mapper: (value: T[keyof T], key: keyof T) => U
): Record<keyof T, U> {
  const result = {} as Record<keyof T, U>;
  
  for (const key in obj) {
    if (obj[key] !== undefined) {
      result[key] = mapper(obj[key], key);
    }
  }
  
  return result;
}
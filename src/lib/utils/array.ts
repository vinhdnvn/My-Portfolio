/**
 * Array utility functions
 */

/**
 * Remove duplicates from array
 * @param array - Array to process
 * @returns Array with duplicates removed
 */
export function removeDuplicates<T>(array: T[]): T[] {
  return [...new Set(array)];
}

/**
 * Group array items by key
 * @param array - Array to group
 * @param key - Key function
 * @returns Grouped object
 */
export function groupBy<T, K extends keyof T>(
  array: T[],
  key: K
): Record<string, T[]> {
  return array.reduce((groups: Record<string, T[]>, item) => {
    const groupKey = String(item[key]);
    if (!groups[groupKey]) {
      groups[groupKey] = [];
    }
    groups[groupKey].push(item);
    return groups;
  }, {} as Record<string, T[]>);
}

/**
 * Sort array by key
 * @param array - Array to sort
 * @param key - Key to sort by
 * @param order - Sort order ('asc' | 'desc')
 * @returns Sorted array
 */
export function sortBy<T, K extends keyof T>(
  array: T[],
  key: K,
  order: 'asc' | 'desc' = 'asc'
): T[] {
  return [...array].sort((a, b) => {
    const aVal = a[key];
    const bVal = b[key];
    
    if (aVal < bVal) {
      return order === 'asc' ? -1 : 1;
    }
    if (aVal > bVal) {
      return order === 'asc' ? 1 : -1;
    }
    
    return 0;
  });
}

/**
 * Chunk array into smaller arrays
 * @param array - Array to chunk
 * @param size - Chunk size
 * @returns Array of chunks
 */
export function chunk<T>(array: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}

/**
 * Flatten nested arrays
 * @param array - Array to flatten
 * @returns Flattened array
 */
export function flatten<T>(array: (T | T[])[]): T[] {
  return array.reduce<T[]>((flat, item) => {
    return flat.concat(Array.isArray(item) ? flatten(item) : item);
  }, []);
}

/**
 * Check if array is empty
 * @param array - Array to check
 * @returns True if empty
 */
export function isEmpty<T>(array: T[]): boolean {
  return array.length === 0;
}

/**
 * Get random item from array
 * @param array - Array to pick from
 * @returns Random item
 */
export function getRandom<T>(array: T[]): T | undefined {
  if (array.length === 0) return undefined;
  return array[Math.floor(Math.random() * array.length)];
}

/**
 * Get first item of array
 * @param array - Array to get from
 * @returns First item or undefined
 */
export function first<T>(array: T[]): T | undefined {
  return array[0];
}

/**
 * Get last item of array
 * @param array - Array to get from
 * @returns Last item or undefined
 */
export function last<T>(array: T[]): T | undefined {
  return array[array.length - 1];
}

/**
 * Remove item from array
 * @param array - Array to modify
 * @param item - Item to remove
 * @returns Modified array
 */
export function remove<T>(array: T[], item: T): T[] {
  const index = array.indexOf(item);
  if (index > -1) {
    return [...array.slice(0, index), ...array.slice(index + 1)];
  }
  return array;
}

/**
 * Remove items from array by index
 * @param array - Array to modify
 * @param startIndex - Start index
 * @param count - Number of items to remove
 * @returns Modified array
 */
export function removeAt<T>(array: T[], startIndex: number, count: number = 1): T[] {
  return [...array.slice(0, startIndex), ...array.slice(startIndex + count)];
}

/**
 * Insert item into array at specific position
 * @param array - Array to modify
 * @param index - Insert position
 * @param item - Item to insert
 * @returns Modified array
 */
export function insertAt<T>(array: T[], index: number, item: T): T[] {
  return [...array.slice(0, index), item, ...array.slice(index)];
}

/**
 * Move item in array
 * @param array - Array to modify
 * @param fromIndex - Current position
 * @param toIndex - New position
 * @returns Modified array
 */
export function move<T>(array: T[], fromIndex: number, toIndex: number): T[] {
  const result = [...array];
  const [removed] = result.splice(fromIndex, 1);
  result.splice(toIndex, 0, removed);
  return result;
}

/**
 * Find item in array
 * @param array - Array to search
 * @param predicate - Find function
 * @returns Found item or undefined
 */
export function find<T>(array: T[], predicate: (item: T, index: number) => boolean): T | undefined {
  return array.find(predicate);
}

/**
 * Find index of item in array
 * @param array - Array to search
 * @param predicate - Find function
 * @returns Index of found item or -1
 */
export function findIndex<T>(array: T[], predicate: (item: T, index: number) => boolean): number {
  return array.findIndex(predicate);
}

/**
 * Filter array items
 * @param array - Array to filter
 * @param predicate - Filter function
 * @returns Filtered array
 */
export function filter<T>(array: T[], predicate: (item: T, index: number) => boolean): T[] {
  return array.filter(predicate);
}

/**
 * Map array items
 * @param array - Array to map
 * @param mapper - Map function
 * @returns Mapped array
 */
export function map<T, U>(array: T[], mapper: (item: T, index: number) => U): U[] {
  return array.map(mapper);
}

/**
 * Reduce array items
 * @param array - Array to reduce
 * @param reducer - Reduce function
 * @param initialValue - Initial value
 * @returns Reduced value
 */
export function reduce<T, U>(
  array: T[],
  reducer: (accumulator: U, item: T, index: number) => U,
  initialValue: U
): U {
  return array.reduce(reducer, initialValue);
}

/**
 * Check if all items pass predicate
 * @param array - Array to check
 * @param predicate - Check function
 * @returns True if all items pass
 */
export function every<T>(array: T[], predicate: (item: T, index: number) => boolean): boolean {
  return array.every(predicate);
}

/**
 * Check if any item passes predicate
 * @param array - Array to check
 * @param predicate - Check function
 * @returns True if any item passes
 */
export function some<T>(array: T[], predicate: (item: T, index: number) => boolean): boolean {
  return array.some(predicate);
}

/**
 * Get unique items from array
 * @param array - Array to process
 * @returns Array with unique items
 */
export function unique<T>(array: T[]): T[] {
  return [...new Set(array)];
}

/**
 * Join arrays
 * @param arrays - Arrays to join
 * @returns Concatenated array
 */
export function join<T>(...arrays: T[][]): T[] {
  return arrays.flat();
}

/**
 * Get intersection of arrays
 * @param arrays - Arrays to intersect
 * @returns Intersection array
 */
export function intersection<T>(...arrays: T[][]): T[] {
  return arrays.reduce((result, array) => {
    return result.filter(item => array.includes(item));
  });
}

/**
 * Get difference of arrays
 * @param array1 - First array
 * @param array2 - Second array
 * @returns Difference array
 */
export function difference<T>(array1: T[], array2: T[]): T[] {
  return array1.filter(item => !array2.includes(item));
}

/**
 * Get union of arrays
 * @param arrays - Arrays to union
 * @returns Union array
 */
export function union<T>(...arrays: T[][]): T[] {
  return unique(join(...arrays));
}

/**
 * Shuffle array items
 * @param array - Array to shuffle
 * @returns Shuffled array
 */
export function shuffle<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * Take first n items from array
 * @param array - Array to take from
 * @param n - Number of items to take
 * @returns First n items
 */
export function take<T>(array: T[], n: number): T[] {
  return array.slice(0, n);
}

/**
 * Take last n items from array
 * @param array - Array to take from
 * @param n - Number of items to take
 * @returns Last n items
 */
export function takeRight<T>(array: T[], n: number): T[] {
  return array.slice(-n);
}

/**
 * Drop first n items from array
 * @param array - Array to drop from
 * @param n - Number of items to drop
 * @returns Array without first n items
 */
export function drop<T>(array: T[], n: number): T[] {
  return array.slice(n);
}

/**
 * Drop last n items from array
 * @param array - Array to drop from
 * @param n - Number of items to drop
 * @returns Array without last n items
 */
export function dropRight<T>(array: T[], n: number): T[] {
  return array.slice(0, -n);
}

/**
 * Create array with range of numbers
 * @param start - Start number
 * @param end - End number
 * @param step - Step size (default: 1)
 * @returns Array of numbers
 */
export function range(start: number, end: number, step: number = 1): number[] {
  const result: number[] = [];
  for (let i = start; i < end; i += step) {
    result.push(i);
  }
  return result;
}

/**
 * Partition array into two arrays based on predicate
 * @param array - Array to partition
 * @param predicate - Partition function
 * @returns Tuple of two arrays
 */
export function partition<T>(array: T[], predicate: (item: T, index: number) => boolean): [T[], T[]] {
  const pass: T[] = [];
  const fail: T[] = [];
  
  array.forEach((item, index) => {
    if (predicate(item, index)) {
      pass.push(item);
    } else {
      fail.push(item);
    }
  });
  
  return [pass, fail];
}
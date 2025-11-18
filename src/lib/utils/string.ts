import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines class names using clsx and tailwind-merge
 * @param inputs - Class names to combine
 * @returns Combined class string
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Capitalizes the first letter of a string
 * @param str - The string to capitalize
 * @returns Capitalized string
 */
export function capitalize(str: string): string {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Converts a string to title case
 * @param str - The string to convert
 * @returns Title case string
 */
export function toTitleCase(str: string): string {
  if (!str) return str;
  return str.replace(/\w\S*/g, (txt) => 
    txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  );
}

/**
 * Truncates a string to a specified length
 * @param str - The string to truncate
 * @param length - Maximum length
 * @param suffix - Suffix to add if truncated (default: '...')
 * @returns Truncated string
 */
export function truncate(str: string, length: number, suffix: string = '...'): string {
  if (!str) return str;
  if (str.length <= length) return str;
  return str.substring(0, length - suffix.length) + suffix;
}

/**
 * Converts a string to slug format
 * @param str - The string to convert
 * @returns Slug string
 */
export function toSlug(str: string): string {
  if (!str) return str;
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Checks if a string is empty or only whitespace
 * @param str - The string to check
 * @returns True if string is empty or whitespace
 */
export function isEmpty(str: string | null | undefined): boolean {
  return !str || str.trim().length === 0;
}

/**
 * Validates if a string is a valid email
 * @param email - The email to validate
 * @returns True if valid email
 */
export function isValidEmail(email: string): boolean {
  if (!email) return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validates if a string is a valid URL
 * @param url - The URL to validate
 * @returns True if valid URL
 */
export function isValidUrl(url: string): boolean {
  if (!url) return false;
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Removes HTML tags from a string
 * @param str - The string with HTML
 * @returns String without HTML tags
 */
export function stripHtml(str: string): string {
  if (!str) return str;
  return str.replace(/<[^>]*>/g, '');
}

/**
 * Converts a string to camelCase
 * @param str - The string to convert
 * @returns camelCase string
 */
export function toCamelCase(str: string): string {
  if (!str) return str;
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, '');
}

/**
 * Converts a string to PascalCase
 * @param str - The string to convert
 * @returns PascalCase string
 */
export function toPascalCase(str: string): string {
  if (!str) return str;
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word) => {
      return word.toUpperCase();
    })
    .replace(/\s+/g, '');
}

/**
 * Converts a string to snake_case
 * @param str - The string to convert
 * @returns snake_case string
 */
export function toSnakeCase(str: string): string {
  if (!str) return str;
  return str
    .replace(/\W+/g, ' ')
    .split(/ |\B(?=[A-Z])/)
    .map(word => word.toLowerCase())
    .join('_');
}

/**
 * Converts a string to kebab-case
 * @param str - The string to convert
 * @returns kebab-case string
 */
export function toKebabCase(str: string): string {
  if (!str) return str;
  return str
    .replace(/\W+/g, ' ')
    .split(/ |\B(?=[A-Z])/)
    .map(word => word.toLowerCase())
    .join('-');
}

/**
 * Pads a string to a specified length
 * @param str - The string to pad
 * @param length - The target length
 * @param padString - The string to pad with (default: ' ')
 * @returns Padded string
 */
export function padString(str: string, length: number, padString: string = ' '): string {
  if (!str) return str;
  if (str.length >= length) return str;
  const padLength = length - str.length;
  const padLeft = Math.floor(padLength / 2);
  const padRight = padLength - padLeft;
  return padString.repeat(padLeft) + str + padString.repeat(padRight);
}

/**
 * Counts words in a string
 * @param str - The string to count words in
 * @returns Number of words
 */
export function countWords(str: string): number {
  if (!str) return 0;
  return str.trim().split(/\s+/).filter(word => word.length > 0).length;
}

/**
 * Counts characters in a string (excluding spaces)
 * @param str - The string to count characters in
 * @returns Number of characters
 */
export function countCharacters(str: string, includeSpaces: boolean = false): number {
  if (!str) return 0;
  return includeSpaces ? str.length : str.replace(/\s/g, '').length;
}

/**
 * Generates a random string
 * @param length - The length of the string
 * @param chars - The characters to use (default: alphanumeric)
 * @returns Random string
 */
export function generateRandomString(
  length: number,
  chars: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
): string {
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}
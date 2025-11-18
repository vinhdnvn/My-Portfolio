import type { DateString } from '@/lib/types/common';

/**
 * Format a date to display format
 * @param date - Date to format
 * @param format - Format string (default: 'MMM d, yyyy')
 * @returns Formatted date string
 */
export function formatDate(
  date: Date | DateString,
  format: string = 'MMM d, yyyy'
): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  if (isNaN(dateObj.getTime())) {
    return '';
  }

  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(dateObj);
}

/**
 * Format a date to relative time (e.g., "2 days ago")
 * @param date - Date to format
 * @returns Relative time string
 */
export function formatRelativeTime(date: Date | DateString): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  if (isNaN(dateObj.getTime())) {
    return '';
  }

  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return 'just now';
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
  } else if (diffInSeconds < 2592000) {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days} day${days !== 1 ? 's' : ''} ago`;
  } else if (diffInSeconds < 31536000) {
    const months = Math.floor(diffInSeconds / 2592000);
    return `${months} month${months !== 1 ? 's' : ''} ago`;
  } else {
    const years = Math.floor(diffInSeconds / 31536000);
    return `${years} year${years !== 1 ? 's' : ''} ago`;
  }
}

/**
 * Format a number with commas
 * @param num - Number to format
 * @returns Formatted number string
 */
export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-US').format(num);
}

/**
 * Format a number as currency
 * @param amount - Amount to format
 * @param currency - Currency code (default: 'USD')
 * @returns Formatted currency string
 */
export function formatCurrency(
  amount: number,
  currency: string = 'USD'
): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
}

/**
 * Format a number as percentage
 * @param value - Value to format
 * @param decimals - Number of decimal places (default: 1)
 * @returns Formatted percentage string
 */
export function formatPercentage(
  value: number,
  decimals: number = 1
): string {
  return `${(value * 100).toFixed(decimals)}%`;
}

/**
 * Format file size
 * @param bytes - Size in bytes
 * @returns Formatted file size string
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const dm = i < 2 ? 0 : i - 2;

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

/**
 * Format a phone number
 * @param phone - Phone number to format
 * @returns Formatted phone number
 */
export function formatPhone(phone: string): string {
  // Remove all non-numeric characters
  const cleaned = phone.replace(/\D/g, '');
  
  // Check if it's a valid phone number
  if (cleaned.length !== 10) {
    return phone; // Return original if invalid
  }

  // Format as (XXX) XXX-XXXX
  return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
}

/**
 * Truncate text and add ellipsis
 * @param text - Text to truncate
 * @param maxLength - Maximum length
 * @returns Truncated text
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) {
    return text;
  }

  return text.slice(0, maxLength - 3) + '...';
}

/**
 * Capitalize first letter of each word
 * @param text - Text to capitalize
 * @returns Capitalized text
 */
export function capitalizeWords(text: string): string {
  return text.replace(/\b\w/g, (char) => {
    return char.toUpperCase();
  });
}

/**
 * Format a list of items
 * @param items - Array of items
 * @param conjunction - Conjunction to use (default: 'and')
 * @returns Formatted list string
 */
export function formatList(
  items: string[],
  conjunction: string = 'and'
): string {
  if (items.length === 0) return '';
  if (items.length === 1) return items[0];
  if (items.length === 2) return items.join(` ${conjunction} `);

  return items.slice(0, -1).join(', ') + `, ${conjunction} ${items[items.length - 1]}`;
}

/**
 * Format a URL for display
 * @param url - URL to format
 * @returns Formatted URL
 */
export function formatUrl(url: string): string {
  // Add https:// if missing
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    return `https://${url}`;
  }

  return url;
}

/**
 * Format a name for display
 * @param firstName - First name
 * @param lastName - Last name
 * @returns Formatted name
 */
export function formatName(firstName?: string, lastName?: string): string {
  if (!firstName && !lastName) return '';
  if (!firstName) return lastName || '';
  if (!lastName) return firstName || '';

  return `${firstName} ${lastName}`;
}

/**
 * Format an address
 * @param address - Address object
 * @returns Formatted address string
 */
export function formatAddress(address: {
  street?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
}): string {
  const parts = [];

  if (address.street) parts.push(address.street);
  if (address.city) parts.push(address.city);
  if (address.state) parts.push(address.state);
  if (address.zip) parts.push(address.zip);
  if (address.country) parts.push(address.country);

  return parts.join(', ');
}

/**
 * Format a duration in milliseconds
 * @param ms - Duration in milliseconds
 * @returns Formatted duration string
 */
export function formatDuration(ms: number): string {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  if (hours > 0) {
    return `${hours}h ${minutes % 60}m`;
  } else if (minutes > 0) {
    return `${minutes}m`;
  } else {
    return `${ms}ms`;
  }
}

/**
 * Format a social media handle
 * @param platform - Social media platform
 * @param handle - User handle
 * @returns Formatted social media URL
 */
export function formatSocialHandle(
  platform: 'github' | 'twitter' | 'linkedin' | 'instagram',
  handle: string
): string {
  const baseUrl = {
    github: 'https://github.com',
    twitter: 'https://twitter.com',
    linkedin: 'https://linkedin.com/in',
    instagram: 'https://instagram.com',
  };

  return `${baseUrl[platform]}/${handle.replace(/^@/, '')}`;
}
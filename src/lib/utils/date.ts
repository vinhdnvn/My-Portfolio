import type { DateString } from '@/lib/types/common';

/**
 * Date utility functions
 */

/**
 * Add days to a date
 * @param date - Original date
 * @param days - Number of days to add
 * @returns New date
 */
export function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

/**
 * Subtract days from a date
 * @param date - Original date
 * @param days - Number of days to subtract
 * @returns New date
 */
export function subtractDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() - days);
  return result;
}

/**
 * Add months to a date
 * @param date - Original date
 * @param months - Number of months to add
 * @returns New date
 */
export function addMonths(date: Date, months: number): Date {
  const result = new Date(date);
  result.setMonth(result.getMonth() + months);
  return result;
}

/**
 * Add years to a date
 * @param date - Original date
 * @param years - Number of years to add
 * @returns New date
 */
export function addYears(date: Date, years: number): Date {
  const result = new Date(date);
  result.setFullYear(result.getFullYear() + years);
  return result;
}

/**
 * Get the start of day (midnight)
 * @param date - Date to process
 * @returns Start of day
 */
export function startOfDay(date: Date): Date {
  const result = new Date(date);
  result.setHours(0, 0, 0, 0);
  return result;
}

/**
 * Get the end of day (23:59:59)
 * @param date - Date to process
 * @returns End of day
 */
export function endOfDay(date: Date): Date {
  const result = new Date(date);
  result.setHours(23, 59, 59, 999);
  return result;
}

/**
 * Get the start of week (Sunday)
 * @param date - Date to process
 * @returns Start of week
 */
export function startOfWeek(date: Date): Date {
  const result = new Date(date);
  const day = result.getDay();
  const diff = result.getDate() - day;
  result.setDate(diff);
  return result;
}

/**
 * Get the end of week (Saturday)
 * @param date - Date to process
 * @returns End of week
 */
export function endOfWeek(date: Date): Date {
  const result = new Date(date);
  const day = result.getDay();
  const diff = 6 - day;
  result.setDate(diff);
  return result;
}

/**
 * Get the start of month
 * @param date - Date to process
 * @returns Start of month
 */
export function startOfMonth(date: Date): Date {
  const result = new Date(date);
  result.setDate(1);
  return result;
}

/**
 * Get the end of month
 * @param date - Date to process
 * @returns End of month
 */
export function endOfMonth(date: Date): Date {
  const result = new Date(date);
  result.setMonth(result.getMonth() + 1);
  result.setDate(0);
  return result;
}

/**
 * Get the start of year
 * @param date - Date to process
 * @returns Start of year
 */
export function startOfYear(date: Date): Date {
  const result = new Date(date);
  result.setMonth(0, 1);
  return result;
}

/**
 * Get the end of year
 * @param date - Date to process
 * @returns End of year
 */
export function endOfYear(date: Date): Date {
  const result = new Date(date);
  result.setMonth(11, 31);
  return result;
}

/**
 * Check if a date is today
 * @param date - Date to check
 * @returns True if date is today
 */
export function isToday(date: Date): boolean {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}

/**
 * Check if a date is in the past
 * @param date - Date to check
 * @returns True if date is in the past
 */
export function isPast(date: Date): boolean {
  return date < new Date();
}

/**
 * Check if a date is in the future
 * @param date - Date to check
 * @returns True if date is in the future
 */
export function isFuture(date: Date): boolean {
  return date > new Date();
}

/**
 * Check if a date is valid
 * @param date - Date to validate
 * @returns True if date is valid
 */
export function isValid(date: Date): boolean {
  return !isNaN(date.getTime());
}

/**
 * Get the difference in days between two dates
 * @param date1 - First date
 * @param date2 - Second date
 * @returns Number of days difference
 */
export function daysDifference(date1: Date, date2: Date): number {
  const oneDay = 24 * 60 * 60 * 1000;
  const diffTime = Math.abs(date2.getTime() - date1.getTime());
  return Math.floor(diffTime / oneDay);
}

/**
 * Get the difference in months between two dates
 * @param date1 - First date
 * @param date2 - Second date
 * @returns Number of months difference
 */
export function monthsDifference(date1: Date, date2: Date): number {
  const yearDiff = date2.getFullYear() - date1.getFullYear();
  const monthDiff = date2.getMonth() - date1.getMonth();
  return yearDiff * 12 + monthDiff;
}

/**
 * Get the difference in years between two dates
 * @param date1 - First date
 * @param date2 - Second date
 * @returns Number of years difference
 */
export function yearsDifference(date1: Date, date2: Date): number {
  return date2.getFullYear() - date1.getFullYear();
}

/**
 * Format a date to ISO string
 * @param date - Date to format
 * @returns ISO date string
 */
export function toISOString(date: Date): string {
  return date.toISOString();
}

/**
 * Format a date to local date string
 * @param date - Date to format
 * @returns Local date string
 */
export function toLocaleString(date: Date): string {
  return date.toLocaleDateString();
}

/**
 * Parse a date string
 * @param dateString - Date string to parse
 * @returns Parsed date or null
 */
export function parseDate(dateString: DateString): Date | null {
  const date = new Date(dateString);
  return isNaN(date.getTime()) ? null : date;
}

/**
 * Get age from birth date
 * @param birthDate - Birth date
 * @returns Age in years
 */
export function getAge(birthDate: Date): number {
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
}

/**
 * Check if a year is a leap year
 * @param year - Year to check
 * @returns True if leap year
 */
export function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

/**
 * Get days in month
 * @param year - Year
 * @param month - Month (0-11)
 * @returns Number of days in month
 */
export function daysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

/**
 * Get week number from date
 * @param date - Date to process
 * @returns Week number (1-52)
 */
export function getWeekNumber(date: Date): number {
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
  const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000;
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
}

/**
 * Get quarter from date
 * @param date - Date to process
 * @returns Quarter number (1-4)
 */
export function getQuarter(date: Date): number {
  return Math.floor((date.getMonth() + 3) / 3) + 1;
}

/**
 * Check if date is in range
 * @param date - Date to check
 * @param startDate - Range start date
 * @param endDate - Range end date
 * @returns True if date is in range
 */
export function isDateInRange(
  date: Date,
  startDate: Date,
  endDate: Date
): boolean {
  return date >= startDate && date <= endDate;
}

/**
 * Get human readable date range
 * @param startDate - Start date
 * @param endDate - End date
 * @returns Human readable date range
 */
export function getDateRange(startDate: Date, endDate: Date): string {
  const start = startDate.toLocaleDateString();
  const end = endDate.toLocaleDateString();
  
  if (startDate.getFullYear() === endDate.getFullYear()) {
    return `${start} - ${end}`;
  }
  
  return `${start} - ${end}`;
}
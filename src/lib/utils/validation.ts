import type {
  ProfileFormData,
  ProfileValidationErrors,
  ProjectFormData,
  ProjectValidationErrors,
  ExperienceFormData,
  ExperienceValidationErrors,
  PostFormData,
  PostValidationErrors,
  AchievementFormData,
  AchievementValidationErrors,
  SiteSettingsFormData,
  SiteSettingsValidationErrors,
} from '@/lib/db/models';
import { VALIDATION, REGEX, FILE_UPLOAD } from '@/lib/utils/constants';

// Profile validation
export function validateProfile(data: ProfileFormData): ProfileValidationErrors {
  const errors: ProfileValidationErrors = {};

  if (!data.fullName || data.fullName.trim().length === 0) {
    errors.fullName = 'Full name is required';
  } else if (data.fullName.length < VALIDATION.MIN_NAME_LENGTH) {
    errors.fullName = `Full name must be at least ${VALIDATION.MIN_NAME_LENGTH} characters`;
  } else if (data.fullName.length > VALIDATION.MAX_NAME_LENGTH) {
    errors.fullName = `Full name must be less than ${VALIDATION.MAX_NAME_LENGTH} characters`;
  }

  if (data.bio && data.bio.length > VALIDATION.MAX_BIO_LENGTH) {
    errors.bio = `Bio must be less than ${VALIDATION.MAX_BIO_LENGTH} characters`;
  }

  if (data.avatarUrl && !REGEX.URL.test(data.avatarUrl)) {
    errors.avatarUrl = 'Please enter a valid URL';
  }

  return errors;
}

// Project validation
export function validateProject(data: ProjectFormData): ProjectValidationErrors {
  const errors: ProjectValidationErrors = {};

  if (!data.title || data.title.trim().length === 0) {
    errors.title = 'Title is required';
  } else if (data.title.length < VALIDATION.MIN_NAME_LENGTH) {
    errors.title = `Title must be at least ${VALIDATION.MIN_NAME_LENGTH} characters`;
  } else if (data.title.length > VALIDATION.MAX_TITLE_LENGTH) {
    errors.title = `Title must be less than ${VALIDATION.MAX_TITLE_LENGTH} characters`;
  }

  if (data.description && data.description.length > VALIDATION.MAX_DESCRIPTION_LENGTH) {
    errors.description = `Description must be less than ${VALIDATION.MAX_DESCRIPTION_LENGTH} characters`;
  }

  if (data.githubUrl && !REGEX.URL.test(data.githubUrl)) {
    errors.githubUrl = 'Please enter a valid GitHub URL';
  }

  if (data.liveUrl && !REGEX.URL.test(data.liveUrl)) {
    errors.liveUrl = 'Please enter a valid live URL';
  }

  if (data.thumbnailUrl && !REGEX.URL.test(data.thumbnailUrl)) {
    errors.thumbnailUrl = 'Please enter a valid thumbnail URL';
  }

  if (data.techStack && data.techStack.length === 0) {
    errors.techStack = 'At least one technology must be selected';
  }

  return errors;
}

// Experience validation
export function validateExperience(data: ExperienceFormData): ExperienceValidationErrors {
  const errors: ExperienceValidationErrors = {};

  if (!data.company || data.company.trim().length === 0) {
    errors.company = 'Company is required';
  } else if (data.company.length < VALIDATION.MIN_NAME_LENGTH) {
    errors.company = `Company must be at least ${VALIDATION.MIN_NAME_LENGTH} characters`;
  } else if (data.company.length > VALIDATION.MAX_NAME_LENGTH) {
    errors.company = `Company must be less than ${VALIDATION.MAX_NAME_LENGTH} characters`;
  }

  if (!data.role || data.role.trim().length === 0) {
    errors.role = 'Role is required';
  } else if (data.role.length < VALIDATION.MIN_NAME_LENGTH) {
    errors.role = `Role must be at least ${VALIDATION.MIN_NAME_LENGTH} characters`;
  } else if (data.role.length > VALIDATION.MAX_NAME_LENGTH) {
    errors.role = `Role must be less than ${VALIDATION.MAX_NAME_LENGTH} characters`;
  }

  if (data.startDate && !isValidDate(data.startDate)) {
    errors.startDate = 'Please enter a valid start date';
  }

  if (data.endDate && !isValidDate(data.endDate)) {
    errors.endDate = 'Please enter a valid end date';
  }

  if (data.startDate && data.endDate && new Date(data.startDate) > new Date(data.endDate)) {
    errors.endDate = 'End date must be after start date';
  }

  if (data.description && data.description.length > VALIDATION.MAX_DESCRIPTION_LENGTH) {
    errors.description = `Description must be less than ${VALIDATION.MAX_DESCRIPTION_LENGTH} characters`;
  }

  return errors;
}

// Post validation
export function validatePost(data: PostFormData): PostValidationErrors {
  const errors: PostValidationErrors = {};

  if (!data.title || data.title.trim().length === 0) {
    errors.title = 'Title is required';
  } else if (data.title.length < VALIDATION.MIN_NAME_LENGTH) {
    errors.title = `Title must be at least ${VALIDATION.MIN_NAME_LENGTH} characters`;
  } else if (data.title.length > VALIDATION.MAX_TITLE_LENGTH) {
    errors.title = `Title must be less than ${VALIDATION.MAX_TITLE_LENGTH} characters`;
  }

  if (data.slug && !REGEX.SLUG.test(data.slug)) {
    errors.slug = 'Slug must contain only lowercase letters, numbers, and hyphens';
  }

  if (data.context && data.context.length > VALIDATION.MAX_DESCRIPTION_LENGTH) {
    errors.context = `Content must be less than ${VALIDATION.MAX_DESCRIPTION_LENGTH} characters`;
  }

  if (data.coverUrl && !REGEX.URL.test(data.coverUrl)) {
    errors.coverUrl = 'Please enter a valid cover URL';
  }

  if (data.attachments && data.attachments.length > 0) {
    const invalidUrls = data.attachments.filter(url => !REGEX.URL.test(url));
    if (invalidUrls.length > 0) {
      errors.attachments = 'All attachments must be valid URLs';
    }
  }

  return errors;
}

// Achievement validation
export function validateAchievement(data: AchievementFormData): AchievementValidationErrors {
  const errors: AchievementValidationErrors = {};

  if (!data.title || data.title.trim().length === 0) {
    errors.title = 'Title is required';
  } else if (data.title.length < VALIDATION.MIN_NAME_LENGTH) {
    errors.title = `Title must be at least ${VALIDATION.MIN_NAME_LENGTH} characters`;
  } else if (data.title.length > VALIDATION.MAX_TITLE_LENGTH) {
    errors.title = `Title must be less than ${VALIDATION.MAX_TITLE_LENGTH} characters`;
  }

  if (data.organization && data.organization.length > VALIDATION.MAX_NAME_LENGTH) {
    errors.organization = `Organization must be less than ${VALIDATION.MAX_NAME_LENGTH} characters`;
  }

  if (data.date && !isValidDate(data.date)) {
    errors.date = 'Please enter a valid date';
  }

  if (data.description && data.description.length > VALIDATION.MAX_DESCRIPTION_LENGTH) {
    errors.description = `Description must be less than ${VALIDATION.MAX_DESCRIPTION_LENGTH} characters`;
  }

  if (data.certificateUrl && !REGEX.URL.test(data.certificateUrl)) {
    errors.certificateUrl = 'Please enter a valid certificate URL';
  }

  if (data.attachmentUrl && !REGEX.URL.test(data.attachmentUrl)) {
    errors.attachmentUrl = 'Please enter a valid attachment URL';
  }

  return errors;
}

// Site settings validation
export function validateSiteSettings(data: SiteSettingsFormData): SiteSettingsValidationErrors {
  const errors: SiteSettingsValidationErrors = {};

  if (data.siteName && data.siteName.length > VALIDATION.MAX_NAME_LENGTH) {
    errors.siteName = `Site name must be less than ${VALIDATION.MAX_NAME_LENGTH} characters`;
  }

  if (data.tagline && data.tagline.length > VALIDATION.MAX_DESCRIPTION_LENGTH) {
    errors.tagline = `Tagline must be less than ${VALIDATION.MAX_DESCRIPTION_LENGTH} characters`;
  }

  if (data.about && data.about.length > VALIDATION.MAX_BIO_LENGTH) {
    errors.about = `About must be less than ${VALIDATION.MAX_BIO_LENGTH} characters`;
  }

  if (data.contactEmail && !REGEX.EMAIL.test(data.contactEmail)) {
    errors.contactEmail = 'Please enter a valid email address';
  }

  if (data.githubUrl && !REGEX.URL.test(data.githubUrl)) {
    errors.githubUrl = 'Please enter a valid GitHub URL';
  }

  if (data.linkedinUrl && !REGEX.URL.test(data.linkedinUrl)) {
    errors.linkedinUrl = 'Please enter a valid LinkedIn URL';
  }

  if (data.paperUrl && !REGEX.URL.test(data.paperUrl)) {
    errors.paperUrl = 'Please enter a valid paper URL';
  }

  return errors;
}

// Helper functions
function isValidDate(dateString: string): boolean {
  const date = new Date(dateString);
  return !isNaN(date.getTime());
}

// Generic validation helpers
export function isValidEmail(email: string): boolean {
  return REGEX.EMAIL.test(email);
}

export function isValidUrl(url: string): boolean {
  return REGEX.URL.test(url);
}

export function isValidPhone(phone: string): boolean {
  return REGEX.PHONE.test(phone);
}

export function isValidPassword(password: string): boolean {
  return REGEX.PASSWORD.test(password);
}

export function isValidSlug(slug: string): boolean {
  return REGEX.SLUG.test(slug);
}

// Form validation utilities
export function hasErrors<T extends Record<string, string | undefined>>(errors: T): boolean {
  return Object.values(errors).some(error => error !== undefined);
}

export function getFirstError<T extends Record<string, string | undefined>>(errors: T): string | undefined {
  return Object.values(errors).find(error => error !== undefined);
}

export function getFieldError<T extends Record<string, string | undefined>>(
  errors: T,
  field: keyof T
): string | undefined {
  return errors[field];
}

// Sanitization utilities
export function sanitizeHtml(html: string): string {
  const div = document.createElement('div');
  div.textContent = html;
  return div.innerHTML || '';
}

export function sanitizeInput(input: string): string {
  return input.trim().replace(/[<>]/g, '');
}

export function sanitizeSlug(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// File validation
export function validateFile(file: File): { isValid: boolean; error?: string } {
  // Check file size
  if (file.size > FILE_UPLOAD.MAX_SIZE) {
    return {
      isValid: false,
      error: `File size must be less than ${FILE_UPLOAD.MAX_SIZE / (1024 * 1024)}MB`,
    };
  }

  // Check file type
  if (!FILE_UPLOAD.ALLOWED_TYPES.includes(file.type as typeof FILE_UPLOAD.ALLOWED_TYPES[number])) {
    return {
      isValid: false,
      error: `File type ${file.type} is not allowed`,
    };
  }

  return { isValid: true };
}

// Array validation
export function validateArray<T>(
  array: T[],
  minLength: number = 0,
  maxLength?: number
): { isValid: boolean; error?: string } {
  if (array.length < minLength) {
    return {
      isValid: false,
      error: `Array must contain at least ${minLength} items`,
    };
  }

  if (maxLength && array.length > maxLength) {
    return {
      isValid: false,
      error: `Array must contain at most ${maxLength} items`,
    };
  }

  return { isValid: true };
}

// Number validation
export function validateNumber(
  value: number,
  min?: number,
  max?: number
): { isValid: boolean; error?: string } {
  if (min !== undefined && value < min) {
    return {
      isValid: false,
      error: `Value must be at least ${min}`,
    };
  }

  if (max !== undefined && value > max) {
    return {
      isValid: false,
      error: `Value must be at most ${max}`,
    };
  }

  return { isValid: true };
}
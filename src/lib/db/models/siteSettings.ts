// Re-export from the central types
export type {
  SiteSettings,
  NewSiteSettings,
  UpdateSiteSettings,
} from '@/lib/types/database';

// Additional site settings-specific types
export interface SiteSettingsFormData {
  siteName?: string;
  tagline?: string;
  about?: string;
  contactEmail?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  paperUrl?: string;
}

export interface SiteSettingsValidationErrors {
  siteName?: string;
  tagline?: string;
  about?: string;
  contactEmail?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  paperUrl?: string;
}

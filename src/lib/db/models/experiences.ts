// Re-export from the central types
export type {
  Experience,
  NewExperience,
  UpdateExperience,
} from '@/lib/types/database';

// Additional experience-specific types
export interface ExperienceFormData {
  company: string;
  role: string;
  startDate?: string;
  endDate?: string;
  description?: string;
}

export interface ExperienceValidationErrors {
  company?: string;
  role?: string;
  startDate?: string;
  endDate?: string;
  description?: string;
}

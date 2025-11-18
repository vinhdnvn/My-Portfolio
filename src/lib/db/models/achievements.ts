// Re-export from the central types
export type {
  Achievement,
  NewAchievement,
  UpdateAchievement,
} from '@/lib/types/database';

// Additional achievement-specific types
export interface AchievementFormData {
  title: string;
  organization?: string;
  date?: string;
  description?: string;
  certificateUrl?: string;
  attachmentUrl?: string;
}

export interface AchievementValidationErrors {
  title?: string;
  organization?: string;
  date?: string;
  description?: string;
  certificateUrl?: string;
  attachmentUrl?: string;
}

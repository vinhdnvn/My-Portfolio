// Re-export from the central types
export type {
  Profile,
  NewProfile,
  UpdateProfile,
  ProfileWithDetails,
} from '@/lib/types/database';

// Additional profile-specific types can be added here
export interface ProfileFormData {
  fullName: string;
  bio?: string;
  avatarUrl?: string;
}

export interface ProfileValidationErrors {
  fullName?: string;
  bio?: string;
  avatarUrl?: string;
}

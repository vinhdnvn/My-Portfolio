// Re-export from the central types
export type {
  Post,
  NewPost,
  UpdatePost,
  PostWithDetails,
} from '@/lib/types/database';

// Additional post-specific types
export interface PostFormData {
  title: string;
  slug?: string;
  context?: string;
  coverUrl?: string;
  attachments?: string[];
  published?: boolean;
}

export interface PostValidationErrors {
  title?: string;
  slug?: string;
  context?: string;
  coverUrl?: string;
  attachments?: string;
}

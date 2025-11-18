// Re-export from the central types
export type {
  Project,
  NewProject,
  UpdateProject,
  ProjectWithDetails,
} from '@/lib/types/database';

// Additional project-specific types
export interface ProjectFormData {
  title: string;
  description?: string;
  thumbnailUrl?: string;
  githubUrl?: string;
  liveUrl?: string;
  confidential?: boolean;
  techStack?: string[];
}

export interface ProjectValidationErrors {
  title?: string;
  description?: string;
  thumbnailUrl?: string;
  githubUrl?: string;
  liveUrl?: string;
  techStack?: string;
}

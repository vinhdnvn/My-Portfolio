import {
  profiles,
  projects,
  experiences,
  posts,
  achievements,
  siteSettings,
} from '@/lib/db/schema';
import type { InferSelectModel, InferInsertModel } from 'drizzle-orm';

// Database select types (what we get from the database)
export type Profile = InferSelectModel<typeof profiles>;
export type Project = InferSelectModel<typeof projects>;
export type Experience = InferSelectModel<typeof experiences>;
export type Post = InferSelectModel<typeof posts>;
export type Achievement = InferSelectModel<typeof achievements>;
export type SiteSettings = InferSelectModel<typeof siteSettings>;

// Database insert types (what we send to the database)
export type NewProfile = InferInsertModel<typeof profiles>;
export type NewProject = InferInsertModel<typeof projects>;
export type NewExperience = InferInsertModel<typeof experiences>;
export type NewPost = InferInsertModel<typeof posts>;
export type NewAchievement = InferInsertModel<typeof achievements>;
export type NewSiteSettings = InferInsertModel<typeof siteSettings>;

// Update types (partial fields for updates)
export type UpdateProfile = Partial<Omit<NewProfile, 'id' | 'createdAt'>>;
export type UpdateProject = Partial<Omit<NewProject, 'id' | 'createdAt'>>;
export type UpdateExperience = Partial<Omit<NewExperience, 'id' | 'createdAt'>>;
export type UpdatePost = Partial<Omit<NewPost, 'id' | 'createdAt'>>;
export type UpdateAchievement = Partial<Omit<NewAchievement, 'id' | 'createdAt'>>;
export type UpdateSiteSettings = Partial<Omit<NewSiteSettings, 'id' | 'createdAt'>>;

// Database relationships and extended types
export type ProfileWithDetails = Profile & {
  projects?: Project[];
  experiences?: Experience[];
  achievements?: Achievement[];
  posts?: Post[];
};

export type ProjectWithDetails = Project & {
  profile?: Profile;
};

export type PostWithDetails = Post & {
  profile?: Profile;
};

// Database query options
export type DatabaseQueryOptions = {
  limit?: number;
  offset?: number;
  orderBy?: string;
  orderDirection?: 'asc' | 'desc';
};

// Database response wrapper
export type DatabaseResponse<T> = {
  data: T | null;
  error: string | null;
  success: boolean;
};

// Paginated response
export type PaginatedResponse<T> = {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  error: string | null;
  success: boolean;
};
export interface Project {
  id: string;
  title: string;
  description: string | null;
  thumbnailUrl: string | null;
  githubUrl: string | null;
  liveUrl: string | null;
  confidential: boolean | null;
  techStack: string[] | null;
  createdAt: Date | null;
  updatedAt: Date | null;
}

export type NewProject = Omit<Project, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateProject = Partial<NewProject>;

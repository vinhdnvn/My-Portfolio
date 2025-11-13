export interface SiteSetting {
  id: string;
  siteName: string | null;
  tagline: string | null;
  about: string | null;
  contactEmail: string | null;
  githubUrl: string | null;
  linkedinUrl: string | null;
  paperUrl: string | null;
  createdAt: Date;
  updatedAt: Date | null;
}

export type NewSiteSetting = Omit<SiteSetting, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateSiteSetting = Partial<NewSiteSetting>;

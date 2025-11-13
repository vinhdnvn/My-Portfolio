export interface Experience {
  id: string;
  company: string;
  role: string;
  startDate: string | null;
  endDate: string | null;
  description: string | null;
  createdAt: Date;
}

export type NewExperience = Omit<Experience, 'id' | 'createdAt'>;
export type UpdateExperience = Partial<NewExperience>;

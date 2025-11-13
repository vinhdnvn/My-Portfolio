export interface Achievement {
  id: string;
  title: string;
  organization: string | null;
  date: string | null;
  description: string | null;
  certificateUrl: string | null;
  attachmentUrl: string | null;
  createdAt: Date;
}

export type NewAchievement = Omit<Achievement, 'id' | 'createdAt'>;
export type UpdateAchievement = Partial<NewAchievement>;

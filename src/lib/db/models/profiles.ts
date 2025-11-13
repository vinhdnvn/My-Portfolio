export interface Profile {
  id: string;
  fullName: string;
  bio: string | null;
  avatarUrl: string | null;
  createdAt: Date;
}

export type NewProfile = Omit<Profile, 'id' | 'createdAt'>;
export type UpdateProfile = Partial<NewProfile>;

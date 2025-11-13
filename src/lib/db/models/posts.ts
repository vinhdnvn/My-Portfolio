export interface Post {
  id: string;
  title: string;
  slug: string | null;
  context: string | null;
  coverUrl: string | null;
  attachments: string[] | null;
  published: boolean | null;
  createdAt: Date | null;
  updatedAt: Date | null;
}

export type NewPost = Omit<Post, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdatePost = Partial<NewPost>;

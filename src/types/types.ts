export type Post = {
  id?: string;
  title: string;
  content: string;
  createdAt: Date;
  code?: string;
  tags: string[];
};

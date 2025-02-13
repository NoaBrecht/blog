export type Post = {
  _id?: string;
  title: string;
  content: string;
  createdAt: Date;
  code?: string;
  tags: string[];
  imageUrl?: string;
};

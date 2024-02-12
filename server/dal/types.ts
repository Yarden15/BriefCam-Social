export type DBUser = {
  id: number;
  name: string;
  avatar?: string;
};

export type DBPost = {
  id: number;
  userId: number;
  date: string;
  content: string;
  imageUrl?: string;
  likes: number[];
};

interface UserType {
  user_id: string;
  username: string;
  admin: boolean;
}

interface PostType {
  id: string;
  category: string;
  title: string;
  body: string;
  thumbnail: string;
  tags: string[];
  created_at: Date;
  updated_at: Date;
}

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
  comments: CommentType[];
}

interface TocType {
  id: string;
  top: number;
}

interface CommentType {
  id: string;
  comment_username: string;
  comment_password: string;
  comment_body: string;
  deleted: boolean;
  created_at: Date;
  updated_at: Date;
  postId: string | null;
  replies: ReplyType[];
}

interface ReplyType {
  id: string;
  reply_body: string;
  deleted: boolean;
  created_at: Date;
  updated_at: Date;
  postId: string | null;
  commentId: string | null;
}

declare module 'quilljs-markdown';

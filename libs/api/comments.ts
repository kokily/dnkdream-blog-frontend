import client from './client';

// Add Comment API
export type AddCommentPayload = {
  postId: string;
  comment_username: string;
  comment_password: string;
  comment_body: string;
};

export async function addCommentAPI(payload: AddCommentPayload) {
  const response = await client.post<CommentType>('/comments', payload);
  return response.data;
}

// List Comments API
export async function listCommentsAPI(id: string) {
  const response = await client.get<CommentType[]>(`/comments/${id}`);
  return response.data;
}

// Confirm Password for comments API
export type ConfirmPayload = {
  id: string;
  password: string;
};

export async function confirmPasswordAPI(payload: ConfirmPayload) {
  const response = await client.post<boolean>(`/comments/confirm`, payload);
  return response.data;
}

// Remove Comment API
export type RemoveCommentPayload = {
  id: string;
  password: string;
};

export async function removeCommentAPI(payload: RemoveCommentPayload) {
  const { id, password } = payload;
  const response = await client.patch(`/comments/remove/${id}`, { password });
  return response.data;
}

// Update Comment API
export type UpdateCommentPayload = {
  id: string;
  comment_body: string;
};

export async function updateCommentAPI(payload: UpdateCommentPayload) {
  const { id, comment_body } = payload;
  const response = await client.patch(`/comments/update/${id}`, {
    comment_body,
  });
  return response.data;
}

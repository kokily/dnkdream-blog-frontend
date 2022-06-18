import client from './client';

// Add Reply API
export type AddReplyPayload = {
  reply_body: string;
  commentId: string;
  postId: string;
};

export async function addReplyAPI(payload: AddReplyPayload) {
  const response = await client.post<ReplyType>('/replies', payload);
  return response.data;
}

// Remove Reply API
export async function removeReplyAPI(id: string) {
  const response = await client.delete(`/replies/${id}`);
  return response.data;
}

// Update Reply API
export type UpdateReplyPayload = {
  id: string;
  reply_body: string;
};

export async function updateReplyAPI(payload: UpdateReplyPayload) {
  const { id, reply_body } = payload;
  const response = await client.patch(`/replies/update/${id}`, { reply_body });
  return response.data;
}

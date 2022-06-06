import qs from 'qs';
import client from './client';

// Add Post API
export type AddPostPayload = {
  category: string;
  title: string;
  body: string;
  thumbnail: string;
  tags: string[];
};

export async function addPostAPI(payload: AddPostPayload) {
  const response = await client.post<PostType>('/posts', payload);
  return response.data;
}

// List Categories API
export async function listCategoriesAPI() {
  const response = await client.get<string[]>('/posts/categories');
  return response.data;
}

// List Posts API
export type ListQuery = {
  category?: string;
  tag?: string;
  cursor?: string;
  title?: string;
};

export async function listPostsAPI(query: ListQuery) {
  const queryString = qs.stringify(query);
  const response = await client.get<PostType[]>(`/posts?${queryString}`);
  return response.data;
}

// Read Post API
export async function readPostAPI(id: string) {
  const response = await client.get<PostType>(`/posts/${id}`);
  return response.data;
}

// Near Posts API
export type NearPostsQuery = {
  category?: string;
  tag?: string;
};

export async function nearPostsAPI({
  id,
  query,
}: {
  id: string;
  query: NearPostsQuery;
}) {
  const queryString = qs.stringify(query);
  const response = await client.get(`/posts/near/${id}?${queryString}`);
  return response.data;
}

// Remove Post API
export async function removePostAPI(id: string) {
  const response = await client.delete(`/posts/${id}`);
  return response.data;
}

// Update Post API
export type UpdatePostPayload = {
  id: string;
} & AddPostPayload;

export async function updatePostAPI(payload: UpdatePostPayload) {
  const { id, category, title, body, thumbnail, tags } = payload;
  const response = await client.patch<PostType>(`/posts/${id}`, {
    category,
    title,
    body,
    thumbnail,
    tags,
  });
  return response.data;
}

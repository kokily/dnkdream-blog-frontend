import client from './client';

export async function listTagsAPI() {
  const response = await client.get<string[]>('/tags');
  return response.data;
}

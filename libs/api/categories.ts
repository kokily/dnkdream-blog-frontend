import client from './client';

// List Categories API
export async function listCategoriesAPI() {
  const response = await client.get<string[]>('/categories');
  return response.data;
}

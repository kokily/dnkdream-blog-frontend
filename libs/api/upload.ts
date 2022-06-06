import client from './client';

export type S3ReturnType = {
  key: string;
  url: string;
};

// Image Upload
export async function imageUpload(payload: FormData) {
  const response = await client.post<S3ReturnType>('/upload', payload);
  return response.data;
}

import client from './client';

export type AuthPayload = {
  username: string;
  password: string;
};

// Login API
export async function loginAPI(payload: AuthPayload) {
  const response = await client.post<UserType>('/auth/login', payload);
  return response.data;
}

// Logout API
export async function logoutAPI() {
  const response = await client.post('/auth/logout');
  return response.data;
}

// Check API
export async function checkAPI() {
  const response = await client.get<UserType>('/auth/check');
  return response.data;
}

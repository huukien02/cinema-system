import { api } from '@/lib/api';
import type { LoginFormValues, RegisterFormValues } from './schemas';

export interface LoginResponse {
  data: {
    accessToken: string;
    user: {
      id: string;
      email: string;
      fullName?: string;
    };
  };
}

export interface RegisterResponse {
  data: {
    id: string;
    fullName: string;
    email: string;
    phone?: string | null;
  };
}

export async function loginUser(dto: LoginFormValues): Promise<LoginResponse['data']> {
  const res = await api.post<LoginResponse>('/auth/login', dto);
  return res.data.data;
}

export async function registerUser(
  dto: Omit<RegisterFormValues, 'confirmPassword'>,
): Promise<RegisterResponse['data']> {
  const res = await api.post<RegisterResponse>('/auth/register', dto);
  return res.data.data;
}

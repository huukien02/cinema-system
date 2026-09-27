import { api } from '@/lib/api';
import type { LoginFormValues } from './schemas';

export interface LoginResponse {
  data: {
    accessToken: string;
    user: {
      id: string;
      email: string;
    };
  };
}

export async function loginUser(dto: LoginFormValues): Promise<LoginResponse['data']> {
  const res = await api.post<LoginResponse>('/auth/login', dto);
  return res.data.data;
}

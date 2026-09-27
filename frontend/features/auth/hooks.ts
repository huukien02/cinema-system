import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { loginUser } from './api';
import type { LoginFormValues } from './schemas';

export function useLogin() {
  const router = useRouter();

  return useMutation({
    mutationFn: (dto: LoginFormValues) => loginUser(dto),
    onSuccess: (data) => {
      sessionStorage.setItem('access_token', data.accessToken);
      toast.success('Đăng nhập thành công!', {
        description: `Chào mừng ${data.user.email}!`,
      });
      setTimeout(() => {
        router.push('/');
      }, 800);
    },
    onError: (error: unknown) => {
      const message =
        (error as { response?: { data?: { message?: string } } })?.response?.data?.message ||
        'Đăng nhập thất bại. Vui lòng thử lại.';
      toast.error('Đăng nhập thất bại', {
        description: message,
      });
    },
  });
}
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { loginUser, registerUser } from './api';
import type { LoginFormValues, RegisterFormValues } from './schemas';

export function useLogin() {
  const router = useRouter();

  return useMutation({
    mutationFn: (dto: LoginFormValues) => loginUser(dto),
    onSuccess: (data) => {
      sessionStorage.setItem('access_token', data.accessToken);
      toast.success('Đăng nhập thành công!', {
        description: `Chào mừng ${data.user.fullName || data.user.email}!`,
      });
      // setTimeout(() => {
      //   router.push('/');
      // }, 800);
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

export function useRegister() {
  const router = useRouter();

  return useMutation({
    mutationFn: (dto: RegisterFormValues) => {
      const { confirmPassword, ...payload } = dto;
      return registerUser(payload);
    },
    onSuccess: () => {
      toast.success('Đăng ký tài khoản thành công!', {
        description: 'Vui lòng đăng nhập với tài khoản mới.',
      });
      setTimeout(() => {
        router.push('/login');
      }, 1000);
    },
    onError: (error: unknown) => {
      const message =
        (error as { response?: { data?: { message?: string } } })?.response?.data?.message ||
        'Đăng ký thất bại. Vui lòng thử lại.';
      toast.error('Đăng ký thất bại', {
        description: message,
      });
    },
  });
}

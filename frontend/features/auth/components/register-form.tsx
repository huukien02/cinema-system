'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, Loader2, UserPlus } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { registerSchema, type RegisterFormValues } from '../schemas';
import { useRegister } from '../hooks';

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { mutate: register, isPending } = useRegister();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
    },
  });

  function onSubmit(values: RegisterFormValues) {
    register(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Full Name */}
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-300 text-sm font-medium">
                Họ và tên
              </FormLabel>
              <FormControl>
                <Input
                  id="register-fullname"
                  type="text"
                  placeholder="Nguyễn Văn A"
                  autoComplete="name"
                  disabled={isPending}
                  className="bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus-visible:ring-violet-500 h-11 transition-all duration-200"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-400 text-xs" />
            </FormItem>
          )}
        />

        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-300 text-sm font-medium">
                Email
              </FormLabel>
              <FormControl>
                <Input
                  id="register-email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  disabled={isPending}
                  className="bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus-visible:ring-violet-500 h-11 transition-all duration-200"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-400 text-xs" />
            </FormItem>
          )}
        />

        {/* Phone */}
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-between">
                <FormLabel className="text-slate-300 text-sm font-medium">
                  Số điện thoại
                </FormLabel>
                <span className="text-xs text-slate-500">Tùy chọn</span>
              </div>
              <FormControl>
                <Input
                  id="register-phone"
                  type="tel"
                  placeholder="0912345678"
                  autoComplete="tel"
                  disabled={isPending}
                  className="bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus-visible:ring-violet-500 h-11 transition-all duration-200"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-400 text-xs" />
            </FormItem>
          )}
        />

        {/* Password */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-300 text-sm font-medium">
                Mật khẩu
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    id="register-password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Tối thiểu 8 ký tự"
                    autoComplete="new-password"
                    disabled={isPending}
                    className="bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus-visible:ring-violet-500 h-11 pr-11 transition-all duration-200"
                    {...field}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    tabIndex={-1}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </FormControl>
              <FormMessage className="text-red-400 text-xs" />
            </FormItem>
          )}
        />

        {/* Confirm Password */}
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-300 text-sm font-medium">
                Xác nhận mật khẩu
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    id="register-confirm-password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Nhập lại mật khẩu"
                    autoComplete="new-password"
                    disabled={isPending}
                    className="bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus-visible:ring-violet-500 h-11 pr-11 transition-all duration-200"
                    {...field}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    tabIndex={-1}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </FormControl>
              <FormMessage className="text-red-400 text-xs" />
            </FormItem>
          )}
        />

        {/* Submit */}
        <Button
          id="register-submit"
          type="submit"
          disabled={isPending}
          className="w-full h-11 bg-violet-600 hover:bg-violet-500 text-white font-semibold rounded-lg shadow-lg shadow-violet-500/20 transition-all duration-200 mt-2"
        >
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Đang đăng ký...
            </>
          ) : (
            <>
              <UserPlus className="mr-2 h-4 w-4" />
              Tạo tài khoản
            </>
          )}
        </Button>

        {/* Login link */}
        <div className="text-center text-sm text-slate-400 pt-2">
          Đã có tài khoản?{' '}
          <Link
            href="/login"
            className="text-violet-400 hover:text-violet-300 font-medium transition-colors"
          >
            Đăng nhập ngay
          </Link>
        </div>
      </form>
    </Form>
  );
}

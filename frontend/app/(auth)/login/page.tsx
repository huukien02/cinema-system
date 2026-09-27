import type { Metadata } from 'next';
import { Film } from 'lucide-react';
import { LoginForm } from '@/features/auth/components/login-form';

export const metadata: Metadata = {
  title: 'Dang nhap - Cinema System',
  description: 'Dang nhap vao he thong quan ly rap chieu phim',
};

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#0a0a1a] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background gradient orbs */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-violet-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(139,92,246,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.03) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Card */}
      <div className="relative w-full max-w-md">
        {/* Glow border */}
        <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-violet-500/30 via-transparent to-indigo-500/30" />

        <div className="relative bg-[#0f0f1f]/90 backdrop-blur-xl rounded-2xl p-8 shadow-2xl">
          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-violet-600/20 border border-violet-500/30 mb-4 shadow-lg shadow-violet-500/10">
              <Film className="h-7 w-7 text-violet-400" />
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Cinema System
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              Dang nhap de quan ly he thong
            </p>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-7" />

          {/* Form */}
          <LoginForm />

          {/* Footer */}
          <p className="text-center text-xs text-slate-600 mt-7">
            &copy; {new Date().getFullYear()} Cinema System. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
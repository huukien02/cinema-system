'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="vi">
      <body className="flex min-h-screen items-center justify-center bg-black text-white p-4">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold">Đã có lỗi xảy ra!</h2>
          <p className="text-gray-400">{error.message || 'Lỗi hệ thống không mong muốn.'}</p>
          <button
            onClick={() => reset()}
            className="px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg transition"
          >
            Thử lại
          </button>
        </div>
      </body>
    </html>
  );
}

'use client';

import Link from 'next/link';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="text-6xl mb-6">⚠️</div>
      <h1 className="text-3xl font-extrabold text-white mb-2">Terjadi Kesalahan</h1>
      <p className="text-slate-400 mb-8 max-w-md text-sm">
        Waduh bre, sepertinya ada kendala teknis di sistem kami. Jangan panik, coba muat ulang halamannya.
      </p>
      <div className="flex gap-4">
        <button
          onClick={() => reset()}
          className="bg-amber-500 hover:bg-amber-400 text-black px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-amber-500/20"
        >
          Coba Lagi
        </button>
        <Link
          href="/"
          className="bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 px-6 py-3 rounded-xl font-bold transition-all"
        >
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
}
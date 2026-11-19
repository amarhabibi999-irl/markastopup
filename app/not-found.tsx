import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <h1 className="text-7xl font-extrabold text-amber-500 mb-4 drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]">404</h1>
      <h2 className="text-2xl font-bold text-white mb-3">Halaman Tidak Ditemukan</h2>
      <p className="text-slate-400 mb-8 max-w-md">Sepertinya halaman yang kamu cari sudah dipindahkan, dihapus, atau tidak pernah ada.</p>
      <Link href="/" className="bg-amber-500 text-black px-8 py-3.5 rounded-xl font-bold hover:bg-amber-400 transition-all shadow-lg shadow-amber-500/20">
        Kembali ke Beranda
      </Link>
    </div>
  );
}
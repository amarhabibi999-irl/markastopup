export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 border-4 border-slate-800 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-amber-500 rounded-full border-t-transparent animate-spin"></div>
      </div>
      <p className="mt-4 text-amber-500 font-bold text-sm animate-pulse tracking-widest uppercase">Memuat...</p>
    </div>
  );
}
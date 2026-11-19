import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';

export default async function ArtikelPage() {
  const supabase = createClient();
  const { data: articles } = await supabase.from('articles').select('*');
  
  return (
    <div className="space-y-8 pb-10">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Artikel & Berita</h1>
        <p className="text-slate-400">Update terbaru seputar dunia game dan tips top up.</p>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        {(articles || []).map((art: any) => (
          <Link href={`/artikel/${art.id}`} key={art.id}>
            <div className="bg-white/[0.02] rounded-2xl border border-white/10 overflow-hidden hover:border-amber-500/50 transition-all duration-300 group cursor-pointer shadow-lg hover:shadow-[0_0_20px_rgba(245,158,11,0.1)] h-full">
              <div className="h-40 bg-white/5 flex items-center justify-center"><span className="text-slate-600 text-4xl group-hover:scale-110 transition-transform">📰</span></div>
              <div className="p-5">
                <div className="flex justify-between items-center mb-3"><span className="bg-amber-500/10 text-amber-500 border border-amber-500/20 text-[10px] font-bold px-2 py-0.5 rounded-full">{art.category}</span><span className="text-xs text-slate-500">{art.date}</span></div>
                <h2 className="font-bold text-lg text-white mb-2 group-hover:text-amber-400 transition-colors leading-snug">{art.title}</h2>
                <p className="text-slate-400 text-sm line-clamp-2">Klik untuk membaca selengkapnya tentang berita dan panduan seputar game favoritmu di MARKAS TOPUP.</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
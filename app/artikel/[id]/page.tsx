import Link from 'next/link';
import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

export default async function ArtikelDetailPage({ params }: { params: { id: string } }) {
  const supabase = createClient();
  const { data: article } = await supabase.from('articles').select('*').eq('id', params.id).single();

  if (!article) notFound();

  return (
    <div className="max-w-3xl mx-auto pb-10">
      <Link href="/artikel" className="text-amber-500 hover:text-amber-400 font-medium text-sm mb-6 inline-block">← Kembali ke Daftar Artikel</Link>
      <div className="bg-[#111111] border border-slate-800 rounded-3xl p-8 md:p-12 shadow-lg">
        <div className="flex items-center gap-3 mb-4">
          <span className="bg-amber-500/10 text-amber-500 border border-amber-500/20 text-xs font-bold px-3 py-1 rounded-full">{article.category}</span>
          <span className="text-sm text-slate-500">{article.date}</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-8 leading-tight">{article.title}</h1>
        <div className="text-slate-300 leading-relaxed space-y-4 text-base md:text-lg">
          <p className="whitespace-pre-wrap">{article.content}</p>
          <p>MARKAS TOPUP selalu berkomitmen memberikan layanan top up tercepat dan termurah untuk semua gamer di Indonesia. Jangan lupa cek terus artikel kami untuk update promo menarik lainnya!</p>
        </div>
      </div>
    </div>
  );
}
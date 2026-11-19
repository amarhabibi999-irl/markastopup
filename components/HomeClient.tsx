'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import type { Game, Article } from '@/lib/types';

function GameCard({ game }: { game: any }) {
  return (
    <Link href={`/game/${game.id}`} className="group">
      <div className="bg-white/[0.03] backdrop-blur-md rounded-2xl border border-white/10 p-3 flex flex-col items-center hover:bg-white/[0.06] hover:border-amber-500/40 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-500/0 to-amber-500/0 group-hover:from-amber-500/5 group-hover:to-transparent transition-all"></div>
        <div className="w-full aspect-square mb-3 rounded-xl overflow-hidden bg-black/50 p-3 flex items-center justify-center relative">
          <img src={game.image} alt={game.name} referrerPolicy="no-referrer" onError={(e) => { const t = e.target as HTMLImageElement; t.onerror = null; t.src = `https://placehold.co/400x400/1a1a1a/fbbf24.png?text=${game.name.replace(/\s+/g, '+')}`; }} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" />
        </div>
        <div className="font-semibold text-sm text-center text-white/90 group-hover:text-amber-400 transition-colors">{game.name}</div>
        <div className="text-[10px] text-slate-500 mt-1 uppercase tracking-wider">{game.publisher}</div>
      </div>
    </Link>
  );
}

export default function HomeClient({ games, articles }: { games: Game[], articles: Article[] }) {
  const [search, setSearch] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    { id: 1, image: "/images/bannerml1.png", title: "Mobile Legends" }, 
    { id: 2, image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=2018&auto=format&fit=crop", title: "Free Fire" },
    { id: 3, image: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=2070&auto=format&fit=crop", title: "Valorant" },
  ];

  const nextSlide = () => setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  useEffect(() => {
    const timer = setInterval(() => nextSlide(), 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const filteredGames = games.filter(game => game.name.toLowerCase().includes(search.toLowerCase()));
  const trendingGames = games.filter(g => (g as any).tag === 'trending');
  const newGames = games.filter(g => (g as any).tag === 'baru');
  const otherGames = games.filter(g => (g as any).tag === 'lainnya');

  return (
    <div className="space-y-8 pb-10">
      <section className="bg-white/[0.02] border border-white/10 rounded-2xl p-2 backdrop-blur-md">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg className="w-5 h-5 text-slate-400 group-focus-within:text-amber-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </div>
          <input type="text" placeholder="Cari Game atau Voucher..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-12 pr-4 py-3 rounded-xl text-white bg-transparent focus:outline-none transition-all font-medium placeholder-slate-500 text-sm" />
        </div>
      </section>

      {search === '' && (
        <section className="relative overflow-hidden rounded-2xl h-[320px] md:h-[500px] border border-white/10 shadow-2xl group bg-slate-900">
          {slides.map((slide, index) => (
            <div key={slide.id} className={`absolute inset-0 transition-opacity duration-700 ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
              <img src={slide.image} alt={slide.title} className="w-full h-full object-cover object-center" onError={(e) => { const t = e.target as HTMLImageElement; t.onerror = null; t.src = "https://placehold.co/1200x500/1a1a1a/f59e0b?text=Gambar+Banner+Belum+Ada"; }} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
            </div>
          ))}
          <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-black/50 hover:bg-black/80 p-3 rounded-full text-white backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg></button>
          <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-black/50 hover:bg-black/80 p-3 rounded-full text-white backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg></button>
          <div className="absolute bottom-5 left-0 right-0 flex justify-center gap-2 z-30">
            {slides.map((_, i) => (<button key={i} onClick={() => setCurrentSlide(i)} className={`h-1.5 rounded-full transition-all duration-500 ${i === currentSlide ? 'bg-amber-500 w-8' : 'bg-white/40 w-2 hover:bg-white/80'}`} />))}
          </div>
        </section>
      )}

      {search === '' && (
        <section className="grid grid-cols-4 gap-3 md:gap-6">
          <Link href="/" className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 flex flex-col items-center gap-3 hover:bg-white/[0.05] hover:border-amber-500/30 transition-all group">
            <div className="text-slate-400 group-hover:text-amber-500 transition-colors"><svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></div>
            <span className="text-[10px] md:text-xs font-medium text-slate-300 group-hover:text-white transition-colors">Top Up</span>
          </Link>
          <Link href="/lacak" className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 flex flex-col items-center gap-3 hover:bg-white/[0.05] hover:border-amber-500/30 transition-all group">
            <div className="text-slate-400 group-hover:text-amber-500 transition-colors"><svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg></div>
            <span className="text-[10px] md:text-xs font-medium text-slate-300 group-hover:text-white transition-colors">Lacak</span>
          </Link>
          <Link href="/leaderboard" className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 flex flex-col items-center gap-3 hover:bg-white/[0.05] hover:border-amber-500/30 transition-all group">
            <div className="text-slate-400 group-hover:text-amber-500 transition-colors"><svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path></svg></div>
            <span className="text-[10px] md:text-xs font-medium text-slate-300 group-hover:text-white transition-colors">Ranking</span>
          </Link>
          <Link href="/bantuan" className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 flex flex-col items-center gap-3 hover:bg-white/[0.05] hover:border-amber-500/30 transition-all group">
            <div className="text-slate-400 group-hover:text-amber-500 transition-colors"><svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></div>
            <span className="text-[10px] md:text-xs font-medium text-slate-300 group-hover:text-white transition-colors">Bantuan</span>
          </Link>
        </section>
      )}

      {search ? (
        <section>
          <div className="flex items-center gap-3 mb-6"><div className="w-1 h-6 bg-amber-500 rounded-full"></div><h2 className="font-bold text-lg text-white">Hasil Pencarian "{search}"</h2></div>
          {filteredGames.length === 0 ? (<div className="text-center py-16 bg-white/[0.02] rounded-2xl border border-white/5"><p className="text-slate-500 text-sm">Game tidak ditemukan. Coba kata kunci lain.</p></div>) : (<div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-5">{filteredGames.map((game) => <GameCard key={game.id} game={game} />)}</div>)}
        </section>
      ) : (
        <div className="space-y-12">
          {trendingGames.length > 0 && (<section><div className="flex items-center gap-3 mb-6"><div className="w-1 h-6 bg-amber-500 rounded-full"></div><h2 className="font-bold text-lg text-white">Lagi Trending</h2></div><div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-5">{trendingGames.map((game) => <GameCard key={game.id} game={game} />)}</div></section>)}
          {newGames.length > 0 && (<section><div className="flex items-center gap-3 mb-6"><div className="w-1 h-6 bg-amber-500 rounded-full"></div><h2 className="font-bold text-lg text-white">Baru Rilis</h2></div><div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-5">{newGames.map((game) => <GameCard key={game.id} game={game} />)}</div></section>)}
          {otherGames.length > 0 && (<section><div className="flex items-center gap-3 mb-6"><div className="w-1 h-6 bg-amber-500 rounded-full"></div><h2 className="font-bold text-lg text-white">Game Lainnya</h2></div><div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-5">{otherGames.map((game) => <GameCard key={game.id} game={game} />)}</div></section>)}
        </div>
      )}

      {/* SECTION ARTIKEL TERBARU DI BERANDA */}
      {search === '' && articles.length > 0 && (
        <section className="mt-12 pt-8 border-t border-white/10">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2"><span className="text-2xl">📰</span><h2 className="font-bold text-xl text-white">Artikel Terbaru</h2></div>
            <Link href="/artikel" className="text-sm font-semibold text-amber-500 hover:text-amber-400 transition-colors">Lihat Semua</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {articles.map((art) => (
              <Link href={`/artikel/${art.id}`} key={art.id} className="group">
                <div className="bg-white/[0.02] rounded-2xl border border-white/10 overflow-hidden hover:border-amber-500/50 transition-all duration-300 shadow-lg hover:shadow-[0_0_20px_rgba(245,158,11,0.1)] h-full">
                  <div className="h-40 bg-white/5 flex items-center justify-center"><span className="text-slate-600 text-4xl group-hover:scale-110 transition-transform">📰</span></div>
                  <div className="p-5">
                    <div className="flex justify-between items-center mb-3"><span className="bg-amber-500/10 text-amber-500 border border-amber-500/20 text-[10px] font-bold px-2 py-0.5 rounded-full">{art.category}</span><span className="text-xs text-slate-500">{art.date}</span></div>
                    <h3 className="font-bold text-base text-white mb-2 group-hover:text-amber-400 transition-colors leading-snug">{art.title}</h3>
                    <p className="text-slate-400 text-xs line-clamp-2">Klik untuk membaca selengkapnya tentang berita dan panduan seputar game favoritmu.</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
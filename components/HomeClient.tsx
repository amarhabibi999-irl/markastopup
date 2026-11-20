'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import type { Game } from '@/lib/types';

// 1. KOMPONEN KARTU GAME (Bentuk Kotak Vertikal dengan Cover)
function GameGridCard({ game }: { game: any }) {
  return (
    <Link href={`/game/${game.id}`} className="group">
      <div className="bg-[#111] rounded-xl overflow-hidden border border-white/5 hover:border-amber-500/50 transition-all duration-300 hover:-translate-y-1 shadow-lg">
        <div className="w-full aspect-[3/4] relative overflow-hidden bg-[#1a1a1a]">
          <img 
            src={game.image} 
            alt={game.name} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
            onError={(e) => {
              const t = e.target as HTMLImageElement;
              t.onerror = null;
              t.src = `https://placehold.co/400x600/1a1a1a/f59e0b?text=${game.name.replace(/\s+/g, '+')}`;
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full p-3">
            <h3 className="text-white font-bold text-sm leading-tight drop-shadow-md">{game.name}</h3>
            <p className="text-[10px] text-amber-500 font-medium mt-1">{game.publisher}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}

// 2. KOMPONEN KARTU TRENDING (Bentuk Horizontal)
function TrendingCard({ game }: { game: any }) {
  return (
    <Link href={`/game/${game.id}`} className="group">
      <div className="bg-[#111] rounded-xl p-2 flex items-center gap-3 border border-white/5 hover:border-amber-500/50 transition-all duration-300">
        <div className="w-16 h-16 rounded-lg overflow-hidden bg-[#1a1a1a] shrink-0">
          <img src={game.image} alt={game.name} className="w-full h-full object-cover" />
        </div>
        <div className="flex flex-col justify-center">
          <h3 className="text-white font-bold text-sm leading-tight line-clamp-1 group-hover:text-amber-500 transition-colors">{game.name}</h3>
          <p className="text-[10px] text-slate-400 mt-1">{game.publisher}</p>
        </div>
      </div>
    </Link>
  );
}

export default function HomeClient({ games, articles }: { games: Game[], articles: any[] }) {
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('Top Up Game');
  
  // State buat Flash Sale Timer (Mentok 1 Hari dari sekarang)
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });

  useEffect(() => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 2); // 2 hari dari sekarang

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance < 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        mins: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        secs: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const filteredGames = games.filter(game => game.name.toLowerCase().includes(search.toLowerCase()));
  const trendingGames = games.filter(g => (g as any).tag === 'trending').slice(0, 6);

  // Mock Data Flash Sale (Bisa diganti nanti)
  const flashSaleItems = [
    { name: 'Diamond Pass', price: 28999, oldPrice: 45000, image: 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?q=80&w=200&auto=format&fit=crop', stock: 'Out of Stock' },
    { name: 'Weekly Pass', price: 30999, oldPrice: 35000, image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=200&auto=format&fit=crop', stock: 'Terbatas' },
    { name: 'Twilight Pass', price: 31999, oldPrice: 36000, image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=200&auto=format&fit=crop', stock: 'Terbatas' },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-16 px-4">
      
      {/* 1. SEARCH BAR (Atas) */}
      <div className="flex items-center gap-4 bg-[#111] border border-white/10 rounded-xl p-2 mt-4 shadow-lg">
        <div className="pl-3 text-slate-400">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </div>
        <input 
          type="text" 
          placeholder="Cari Game atau Voucher" 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-transparent text-white focus:outline-none placeholder-slate-500 text-sm"
        />
      </div>

      {/* 2. HERO SLIDER BANNER */}
      {search === '' && (
        <div className="relative w-full h-[200px] md:h-[300px] rounded-2xl overflow-hidden border border-white/10 bg-[#0a0a0a] flex items-center justify-center group">
           <img src="/images/bannerml1.png" alt="Banner" className="w-full h-full object-cover opacity-80" onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/1200x300/111/333?text=Banner+Promo';}} />
           <button className="absolute left-4 bg-black/50 p-2 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg></button>
           <button className="absolute right-4 bg-black/50 p-2 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg></button>
        </div>
      )}

      {/* 3. SECTION FLASH SALE */}
      {search === '' && (
        <section className="bg-[#111] rounded-2xl border border-white/5 p-5">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
            <div className="flex items-center gap-3">
              <span className="text-xl">⚡</span>
              <h2 className="text-lg font-bold text-white tracking-wide">FLASH SALE</h2>
              <div className="flex items-center gap-1 text-sm font-mono text-amber-500 bg-amber-500/10 px-3 py-1 rounded-md border border-amber-500/20">
                <span>{timeLeft.days}</span> : <span>{timeLeft.hours}</span> : <span>{timeLeft.mins}</span> : <span>{timeLeft.secs}</span>
              </div>
            </div>
            <p className="text-xs text-slate-400">Pesan sekarang! Persediaan terbatas.</p>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {flashSaleItems.map((item, idx) => (
              <div key={idx} className="min-w-[200px] bg-[#1a1a1a] rounded-xl border border-white/5 p-3 flex flex-col relative shrink-0">
                <div className="w-full h-24 rounded-lg overflow-hidden mb-3">
                   <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="text-white text-sm font-bold truncate">{item.name}</h3>
                <div className="mt-1 flex items-center gap-2">
                  <span className="text-amber-500 font-bold text-sm">Rp {item.price.toLocaleString('id-ID')}</span>
                  <span className="text-slate-500 text-[10px] line-through">Rp {item.oldPrice.toLocaleString('id-ID')}</span>
                </div>
                <button className="mt-3 w-full bg-amber-500/20 text-amber-500 border border-amber-500/30 text-xs font-bold py-1.5 rounded-md hover:bg-amber-500 hover:text-black transition-colors">{item.stock}</button>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 4. SECTION TRENDING */}
      {search === '' && (
        <section>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xl">🔥</span>
            <h2 className="text-lg font-bold text-white tracking-wide">TRENDING</h2>
          </div>
          <p className="text-xs text-slate-400 mb-4">Berikut adalah beberapa produk yang paling populer saat ini.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {trendingGames.map((game) => <TrendingCard key={game.id} game={game} />)}
          </div>
        </section>
      )}

      {/* 5. TAB MENU & GRID GAME */}
      <section>
        <div className="flex gap-2 overflow-x-auto pb-4 mb-2 scrollbar-hide">
          {['Top Up Game', 'Live Streaming', 'Voucher', 'Joki'].map((tab) => (
             <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all ${activeTab === tab ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20' : 'bg-[#111] text-slate-400 border border-white/10 hover:border-amber-500/50'}`}
             >
                {tab}
             </button>
          ))}
        </div>

        {search ? (
          <div className="mt-4">
            <h2 className="text-lg font-bold text-white mb-4">Hasil Pencarian "{search}"</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
              {filteredGames.map((game) => <GameGridCard key={game.id} game={game} />)}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {games.map((game) => <GameGridCard key={game.id} game={game} />)}
          </div>
        )}
      </section>

      {/* 6. ARTIKEL TERBARU */}
      {search === '' && articles.length > 0 && (
        <section className="pt-8 border-t border-white/10 mt-10">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-white">ARTIKEL TERBARU & BERITA GAME</h2>
            <p className="text-xs text-slate-400 mt-1">Dapatkan informasi terbaru seputar dunia game!</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {articles.map((art) => (
              <Link href={`/artikel/${art.id}`} key={art.id} className="group">
                <div className="bg-[#111] rounded-2xl border border-white/5 overflow-hidden hover:border-amber-500/50 transition-all duration-300 shadow-lg h-full">
                  <div className="h-40 bg-[#1a1a1a] flex items-center justify-center relative overflow-hidden">
                    <span className="text-slate-600 text-4xl group-hover:scale-110 transition-transform relative z-10">📰</span>
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
                  </div>
                  <div className="p-5">
                    <div className="flex justify-between items-center mb-3">
                      <span className="bg-amber-500/10 text-amber-500 text-[10px] font-bold px-2 py-0.5 rounded-full">{art.category}</span>
                      <span className="text-[10px] text-slate-500">{art.date}</span>
                    </div>
                    <h3 className="font-bold text-sm text-white mb-2 group-hover:text-amber-400 transition-colors leading-snug line-clamp-2">{art.title}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-6">
             <Link href="/artikel" className="bg-[#111] border border-white/10 text-white text-sm font-medium px-6 py-2 rounded-lg hover:border-amber-500 transition-colors inline-block">Lihat Semua Artikel</Link>
          </div>
        </section>
      )}

    </div>
  );
}
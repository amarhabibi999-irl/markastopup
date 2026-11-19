'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import type { Game, Product } from '@/lib/types';

export default function KalkulatorPage() {
  const [budget, setBudget] = useState<string>('');
  const [games, setGames] = useState<Game[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [hasil, setHasil] = useState<{ game: Game, product: Product }[]>([]);

  useEffect(() => {
    fetch('/api/data-kalkulator')
      .then(res => res.json())
      .then(data => {
        setGames(data.games);
        setProducts(data.products);
      });
  }, []);

  const handleHitung = (e: React.FormEvent) => {
    e.preventDefault();
    const budgetNum = parseInt(budget.replace(/\D/g, ''));
    if (!budgetNum) return;

    const cocok = products
      .filter(p => p.price <= budgetNum)
      .map(p => {
        const game = games.find(g => g.id === p.gameId);
        return { game: game!, product: p };
      })
      .filter(item => item.game)
      .sort((a, b) => b.product.price - a.product.price)
      .slice(0, 10);

    setHasil(cocok);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-10">
      <div className="text-center mt-4">
        <h1 className="text-3xl font-black text-white mb-2 tracking-tight">Kalkulator Top Up</h1>
        <p className="text-slate-400 text-sm max-w-lg mx-auto">Masukkan budget kamu, dan kami bakal kasih rekomendasi item terbaik yang bisa kamu beli.</p>
      </div>

      <div className="bg-white/[0.02] backdrop-blur-md p-6 rounded-3xl border border-white/10 shadow-2xl">
        <form onSubmit={handleHitung} className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-lg">Rp</span>
            <input 
              type="text" 
              value={budget}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, '');
                setBudget(val ? parseInt(val).toLocaleString('id-ID') : '');
              }}
              placeholder="Contoh: 50.000"
              className="w-full bg-black/50 border border-white/10 rounded-2xl pl-14 pr-4 py-4 text-white font-bold text-lg focus:ring-2 focus:ring-amber-500/50 outline-none transition-all placeholder-slate-600"
            />
          </div>
          <button type="submit" className="bg-amber-500 hover:bg-amber-400 text-black font-bold px-8 py-4 rounded-2xl transition-all shadow-lg shadow-amber-500/20 text-lg">
            Hitung
          </button>
        </form>
      </div>

      {hasil.length > 0 && (
        <div className="space-y-4 animate-in slide-in-from-bottom-4">
          <h2 className="font-bold text-lg text-white">Rekomendasi Untukmu:</h2>
          <div className="grid gap-3">
            {hasil.map((item, idx) => (
              <div key={idx} className="bg-white/[0.02] backdrop-blur-md border border-white/10 p-4 rounded-2xl flex items-center justify-between hover:border-amber-500/40 hover:bg-white/[0.05] transition-all group">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-black/50 rounded-xl flex items-center justify-center p-2 border border-white/5">
                    <img src={item.game.image} alt={item.game.name} className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-slate-500 mb-0.5">{item.game.name}</p>
                    <p className="font-bold text-white text-sm">{item.product.name}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-amber-500 text-lg">Rp {item.product.price.toLocaleString('id-ID')}</p>
                  <Link href={`/game/${item.game.id}`} className="text-[10px] text-slate-400 group-hover:text-amber-400 transition-colors underline">
                    Beli Sekarang
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
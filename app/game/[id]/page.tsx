import { getSupplier } from '@/lib/supplier';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import GameCheckoutClient from '@/components/GameCheckoutClient';

export default async function GamePage({ params }: { params: { id: string } }) {
  const supplier = getSupplier();
  const games = await (supplier as any).getGames();
  const products = await supplier.getProducts();

  const game = games.find((g: any) => g.id === params.id);
  const gameProducts = products.filter(p => p.gameId === params.id);

  if (!game) notFound();

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-10">
      
      {/* HERO BANNER GAME (Glassmorphism) */}
      <div className="relative overflow-hidden rounded-3xl bg-white/[0.02] border border-white/10 shadow-2xl p-6 md:p-8 flex items-center gap-6">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-[80px] pointer-events-none"></div>
        
        <Link href="/" className="relative z-10 bg-white/5 hover:bg-white/10 border border-white/10 text-amber-500 w-10 h-10 rounded-full flex items-center justify-center transition-all flex-shrink-0 backdrop-blur-md">
          ←
        </Link>
        
        <div className="relative z-10 w-24 h-24 md:w-28 md:h-28 bg-black/50 rounded-2xl p-2 border border-white/10 flex-shrink-0 shadow-lg">
           <img 
             src={game.image} 
             alt={game.name} 
             referrerPolicy="no-referrer"
             className="w-full h-full object-contain" 
           />
        </div>
        
        <div className="relative z-10">
          <h1 className="text-3xl md:text-4xl font-black text-white mb-2 tracking-tight">{game.name}</h1>
          <p className="text-amber-500 font-medium text-sm md:text-base">{game.publisher}</p>
          <div className="mt-3 inline-flex items-center gap-2 bg-green-500/10 text-green-400 text-xs font-bold px-3 py-1.5 rounded-full border border-green-500/20">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            Online 24 Jam
          </div>
        </div>
      </div>

      {/* CARA TOP UP (Panduan) */}
      <div className="bg-white/[0.02] backdrop-blur-md rounded-2xl border border-white/10 p-5 flex flex-wrap gap-4 justify-between shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center font-bold text-sm border border-amber-500/20">1</div>
          <p className="text-sm text-slate-300">Masukkan <strong className="text-white">ID</strong></p>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center font-bold text-sm border border-amber-500/20">2</div>
          <p className="text-sm text-slate-300">Pilih <strong className="text-white">Nominal</strong></p>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center font-bold text-sm border border-amber-500/20">3</div>
          <p className="text-sm text-slate-300"><strong className="text-white">Bayar</strong> via QRIS</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-green-500/10 text-green-400 flex items-center justify-center font-bold text-sm border border-green-500/20">✓</div>
          <p className="text-sm text-slate-300">Item <strong className="text-white">Masuk</strong></p>
        </div>
      </div>

      <GameCheckoutClient game={game} products={gameProducts} />

    </div>
  );
}
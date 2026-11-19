'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LacakPage() {
  const [orderId, setOrderId] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderId.trim()) {
      router.push(`/lacak/${orderId.trim().toUpperCase()}`);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white/[0.02] backdrop-blur-md p-8 rounded-3xl border border-white/10 shadow-2xl text-center">
      <div className="w-16 h-16 bg-amber-500/10 border border-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">🔍</div>
      <h1 className="text-2xl font-bold text-white mb-2">Lacak Pesanan</h1>
      <p className="text-slate-400 text-sm mb-6">Masukkan ID Pesanan (contoh: ORD-XXXXXX) untuk melihat status top-up kamu.</p>
      
      <form onSubmit={handleSearch} className="flex flex-col gap-4">
        <input 
          type="text" 
          placeholder="Ketik ID Pesanan di sini..." 
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          className="w-full border border-white/10 bg-black/50 rounded-xl px-4 py-3.5 text-center font-mono text-white focus:ring-2 focus:ring-amber-500/50 outline-none transition-all placeholder-slate-600"
        />
        <button type="submit" className="bg-amber-500 hover:bg-amber-400 text-black font-bold py-3.5 rounded-xl transition-colors shadow-lg shadow-amber-500/20">
          Cek Status
        </button>
      </form>
    </div>
  );
}
'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import type { Order } from '@/lib/types';

export default function ProfilPage() {
  const [user, setUser] = useState<{ name: string, email: string } | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const savedUser = localStorage.getItem('markas_user');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
      
      // Ambil riwayat transaksi berdasarkan email user
      fetch(`/api/user/orders?email=${encodeURIComponent(parsedUser.email)}`)
        .then(res => res.json())
        .then(data => {
          setOrders(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    } else {
      router.push('/login');
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('markas_user');
    router.push('/');
    router.refresh();
  };

  if (!user) return null; 

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-10">
      <h1 className="text-2xl font-bold text-white mb-6">Akun Saya</h1>
      
      <div className="grid md:grid-cols-3 gap-6">
        {/* Kartu Profil Kiri */}
        <div className="bg-[#111111] rounded-2xl border border-slate-800 p-6 flex flex-col items-center text-center shadow-lg h-fit">
          <div className="w-24 h-24 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center text-4xl text-black font-bold mb-4 shadow-[0_0_20px_rgba(245,158,11,0.3)]">
            {user.name.charAt(0)}
          </div>
          <h2 className="text-xl font-bold text-white">{user.name}</h2>
          <p className="text-sm text-slate-400 mb-6">{user.email}</p>
          
          <button onClick={handleLogout} className="w-full bg-slate-800 hover:bg-red-500/20 hover:text-red-500 hover:border-red-500/50 text-white font-medium py-2.5 rounded-xl border border-slate-700 transition-all text-sm mt-auto">
            Keluar Akun
          </button>
        </div>

        {/* Riwayat Transaksi Kanan */}
        <div className="md:col-span-2 bg-[#111111] rounded-2xl border border-slate-800 p-6 shadow-lg">
          <h3 className="font-bold text-white border-b border-slate-800 pb-3 mb-4">Riwayat Transaksi</h3>
          
          {loading ? (
            <p className="text-amber-500 animate-pulse text-sm">Memuat riwayat...</p>
          ) : orders.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-4xl mb-2">📭</div>
              <p className="text-slate-500 text-sm">Belum ada transaksi. <Link href="/" className="text-amber-500 hover:underline">Yuk Top Up!</Link></p>
            </div>
          ) : (
            <div className="space-y-3">
              {orders.map(o => (
                <Link href={`/lacak/${o.id}`} key={o.id} className="block p-4 bg-slate-900 rounded-xl border border-slate-800 hover:border-amber-500 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-mono text-xs text-amber-500">{o.id}</p>
                      <p className="font-bold text-white text-sm mt-1">{o.productName}</p>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                      o.status === 'COMPLETED' ? 'bg-green-500/10 text-green-500 border-green-500/20' :
                      o.status === 'PENDING' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' :
                      'bg-red-500/10 text-red-500 border-red-500/20'
                    }`}>{o.status}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs text-slate-500">
                    <span>{new Date(o.createdAt).toLocaleDateString('id-ID')}</span>
                    <span className="font-bold text-slate-300">Rp {o.amount.toLocaleString('id-ID')}</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
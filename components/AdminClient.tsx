'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import type { Order } from '@/lib/types';

export default function AdminClient({ initialOrders }: { initialOrders: Order[] }) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const router = useRouter();

  const filteredOrders = initialOrders.filter(o => {
    const matchSearch = o.id.toLowerCase().includes(search.toLowerCase()) || o.target.includes(search);
    const matchStatus = statusFilter === 'ALL' || o.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const totalRevenue = initialOrders.filter(o => o.status === 'COMPLETED').reduce((sum, o) => sum + o.amount, 0);
  const pendingOrders = initialOrders.filter(o => o.status === 'PENDING').length;
  const completedOrders = initialOrders.filter(o => o.status === 'COMPLETED').length;

  const last7Days = [...Array(7)].map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return d.toISOString().split('T')[0];
  });

  const chartData = last7Days.map(date => {
    const dayOrders = initialOrders.filter(o => o.status === 'COMPLETED' && o.createdAt.startsWith(date));
    const total = dayOrders.reduce((sum, o) => sum + o.amount, 0);
    return { date, total };
  });

  const maxChartValue = Math.max(...chartData.map(d => d.total), 100000); 

  async function handleAction(id: string, action: 'COMPLETED' | 'FAILED' | 'DELETE') {
    if (action === 'DELETE') {
      if (!confirm("Yakin mau hapus pesanan ini permanen?")) return;
    }

    setLoadingId(id);
    const method = action === 'DELETE' ? 'DELETE' : 'PATCH';
    const body = action === 'DELETE' ? null : JSON.stringify({ status: action });

    await fetch(`/api/admin/orders/${id}`, { method, headers: { 'Content-Type': 'application/json' }, body });
    setLoadingId(null);
    router.refresh(); 
    window.location.reload();
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-wide">Dashboard Admin</h1>
          <p className="text-slate-400 text-sm mt-1">Pantau pendapatan dan pesanan masuk MARKAS TOPUP.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link href="/admin/voucher" className="bg-purple-500 hover:bg-purple-400 text-white text-sm font-bold px-4 py-2.5 rounded-xl transition-colors shadow-lg shadow-purple-500/20">
            🎟️ Voucher
          </Link>
          <Link href="/admin/artikel" className="bg-emerald-500 hover:bg-emerald-400 text-white text-sm font-bold px-4 py-2.5 rounded-xl transition-colors shadow-lg shadow-emerald-500/20">
            📝 Artikel
          </Link>
          <Link href="/admin/pengaturan" className="bg-slate-500 hover:bg-slate-400 text-white text-sm font-bold px-4 py-2.5 rounded-xl transition-colors shadow-lg shadow-slate-500/20">
            ⚙️ Pengaturan
          </Link>
          <Link href="/admin/integrasi" className="bg-blue-500 hover:bg-blue-400 text-white text-sm font-bold px-4 py-2.5 rounded-xl transition-colors shadow-lg shadow-blue-500/20">
            ⚙️ Integrasi
          </Link>
          <Link href="/admin/produk" className="bg-amber-500 hover:bg-amber-400 text-black text-sm font-bold px-4 py-2.5 rounded-xl transition-colors shadow-lg shadow-amber-500/20">
            + Produk
          </Link>
          <Link href="/" className="bg-slate-800 hover:bg-slate-700 text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-colors border border-slate-700">
            Lihat Toko
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#111111] p-5 rounded-2xl border border-slate-800 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-2xl"></div>
          <p className="text-sm text-slate-400 mb-1">Total Pendapatan</p>
          <p className="text-2xl font-bold text-amber-500">Rp {totalRevenue.toLocaleString('id-ID')}</p>
        </div>
        <div className="bg-[#111111] p-5 rounded-2xl border border-slate-800 shadow-lg">
          <p className="text-sm text-slate-400 mb-1">Total Pesanan</p>
          <p className="text-2xl font-bold text-white">{initialOrders.length}</p>
        </div>
        <div className="bg-[#111111] p-5 rounded-2xl border border-slate-800 shadow-lg">
          <p className="text-sm text-slate-400 mb-1">Pesanan Sukses</p>
          <p className="text-2xl font-bold text-green-500">{completedOrders}</p>
        </div>
        <div className="bg-[#111111] p-5 rounded-2xl border border-slate-800 shadow-lg">
          <p className="text-sm text-slate-400 mb-1">Menunggu Pembayaran</p>
          <p className="text-2xl font-bold text-amber-500">{pendingOrders}</p>
        </div>
      </div>

      <div className="bg-[#111111] p-6 rounded-2xl border border-slate-800 shadow-lg">
        <h2 className="font-bold text-white mb-6">Pendapatan 7 Hari Terakhir</h2>
        <div className="flex items-end justify-between h-40 gap-2 md:gap-4">
          {chartData.map((data, idx) => {
            const heightPercent = (data.total / maxChartValue) * 100;
            return (
              <div key={idx} className="flex flex-col items-center flex-1 group">
                <div className="relative w-full h-full flex items-end justify-center">
                  <div className="absolute -top-8 bg-slate-800 text-amber-500 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                    Rp {data.total.toLocaleString('id-ID')}
                  </div>
                  <div className="w-full max-w-[40px] bg-gradient-to-t from-amber-600 to-amber-400 rounded-t-md hover:from-amber-500 hover:to-amber-300 transition-all duration-500" style={{ height: `${Math.max(heightPercent, 2)}%` }} ></div>
                </div>
                <span className="text-[10px] text-slate-500 mt-2 font-medium">{new Date(data.date).toLocaleDateString('id-ID', { weekday: 'short' })}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-3">
        <input type="text" placeholder="Cari ID Pesanan atau Tujuan..." value={search} onChange={(e) => setSearch(e.target.value)} className="flex-1 bg-[#111] border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:ring-2 focus:ring-amber-500 outline-none placeholder-slate-500" />
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="bg-[#111] border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:ring-2 focus:ring-amber-500 outline-none cursor-pointer">
          <option value="ALL">Semua Status</option>
          <option value="PENDING">PENDING</option>
          <option value="PAID">PAID</option>
          <option value="COMPLETED">COMPLETED</option>
          <option value="FAILED">FAILED</option>
        </select>
      </div>

      <div className="bg-[#111111] rounded-2xl border border-slate-800 overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-[#161616] text-slate-400 border-b border-slate-800">
              <tr><th className="p-4 font-medium">ID Pesanan</th><th className="p-4 font-medium">Tanggal</th><th className="p-4 font-medium">Produk</th><th className="p-4 font-medium">Tujuan</th><th className="p-4 font-medium">Total</th><th className="p-4 font-medium">Status</th><th className="p-4 font-medium text-right">Aksi</th></tr>
            </thead>
            <tbody>
              {filteredOrders.map(o => (
                <tr key={o.id} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                  <td className="p-4"><span className="font-mono text-xs text-amber-500 bg-amber-500/10 px-2 py-1 rounded-md border border-amber-500/20">{o.id}</span></td>
                  <td className="p-4 text-slate-400 text-xs">{new Date(o.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}</td>
                  <td className="p-4 font-medium text-white">{o.productName}</td>
                  <td className="p-4 text-slate-300">{o.target} {o.zoneId ? <span className="text-slate-500 text-xs">({o.zoneId})</span> : ''}</td>
                  <td className="p-4 font-semibold text-amber-500">Rp {o.amount.toLocaleString('id-ID')}</td>
                  <td className="p-4"><span className={`px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider border ${o.status === 'COMPLETED' ? 'bg-green-500/10 text-green-500 border-green-500/20' : o.status === 'PENDING' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' : o.status === 'PAID' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' : 'bg-red-500/10 text-red-500 border-red-500/20'}`}>{o.status}</span></td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2">
                      {o.status !== 'COMPLETED' && <button onClick={() => handleAction(o.id, 'COMPLETED')} disabled={loadingId === o.id} className="bg-green-500/10 hover:bg-green-500 text-green-500 hover:text-black px-2 py-1.5 rounded-lg transition-colors text-xs font-bold border border-green-500/20">✓</button>}
                      {o.status !== 'FAILED' && <button onClick={() => handleAction(o.id, 'FAILED')} disabled={loadingId === o.id} className="bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white px-2 py-1.5 rounded-lg transition-colors text-xs font-bold border border-red-500/20">✕</button>}
                      <button onClick={() => handleAction(o.id, 'DELETE')} disabled={loadingId === o.id} className="bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white px-2 py-1.5 rounded-lg transition-colors text-xs border border-slate-700">🗑️</button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredOrders.length === 0 && (<tr><td colSpan={7} className="p-10 text-center text-slate-500"><div className="text-4xl mb-3">📭</div>Tidak ada pesanan yang cocok.</td></tr>)}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
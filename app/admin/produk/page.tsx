'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import type { Game, Product } from '@/lib/types';

export default function AdminProdukPage() {
  const [games, setGames] = useState<Game[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Form Game
  const [gName, setGName] = useState('');
  const [gPublisher, setGPublisher] = useState('');
  const [gTag, setGTag] = useState('lainnya');

  // Form Produk
  const [pGameId, setPGameId] = useState('');
  const [pName, setPName] = useState('');
  const [pPrice, setPPrice] = useState('');
  const [pBadge, setPBadge] = useState('');

  const fetchData = async () => {
    const res = await fetch('/api/admin/products');
    const data = await res.json();
    setGames(data.games);
    setProducts(data.products);
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const handleAddGame = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/admin/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: gName, publisher: gPublisher, tag: gTag }),
    });
    window.dispatchEvent(new CustomEvent('show-toast', { detail: { message: 'Game Baru Ditambahkan!', type: 'success' } }));
    setGName(''); setGPublisher('');
    fetchData();
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pGameId) return window.dispatchEvent(new CustomEvent('show-toast', { detail: { message: 'Pilih Game Dulu!', type: 'error' } }));
    
    await fetch('/api/admin/products/item', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ gameId: pGameId, name: pName, price: pPrice, badge: pBadge }),
    });
    window.dispatchEvent(new CustomEvent('show-toast', { detail: { message: 'Nominal Ditambahkan!', type: 'success' } }));
    setPName(''); setPPrice(''); setPBadge('');
    fetchData();
  };

  const handleDelete = async (id: string, type: 'game' | 'product') => {
    if (!confirm(`Yakin mau hapus ${type} ini?`)) return;
    await fetch(`/api/admin/products/${id}?type=${type}`, { method: 'DELETE' });
    window.dispatchEvent(new CustomEvent('show-toast', { detail: { message: 'Data Dihapus!', type: 'info' } }));
    fetchData();
  };

  if (loading) return <div className="text-amber-500 text-center animate-pulse mt-20">Memuat Data...</div>;

  return (
    <div className="space-y-6 pb-10">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-wide">Manajemen Produk</h1>
          <p className="text-slate-400 text-sm mt-1">Tambah atau hapus game dan nominal langsung dari sini.</p>
        </div>
        <Link href="/admin" className="bg-slate-800 hover:bg-slate-700 text-white text-sm font-medium px-5 py-2.5 rounded-xl border border-slate-700 transition-colors">
          Kembali ke Dashboard
        </Link>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* FORM TAMBAH GAME */}
        <div className="bg-[#111111] p-6 rounded-2xl border border-slate-800 shadow-lg">
          <h2 className="font-bold text-white mb-4 border-b border-slate-800 pb-2">Tambah Game Baru</h2>
          <form onSubmit={handleAddGame} className="space-y-3">
            <input required placeholder="Nama Game (cth: Mobile Legends)" value={gName} onChange={e => setGName(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:border-amber-500 outline-none" />
            <input required placeholder="Publisher (cth: Moonton)" value={gPublisher} onChange={e => setGPublisher(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:border-amber-500 outline-none" />
            <select value={gTag} onChange={e => setGTag(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:border-amber-500 outline-none">
              <option value="trending">Trending</option>
              <option value="baru">Baru Rilis</option>
              <option value="lainnya">Lainnya</option>
            </select>
            <button type="submit" className="w-full bg-amber-500 hover:bg-amber-400 text-black font-bold py-2.5 rounded-xl text-sm mt-2">Tambah Game</button>
          </form>
        </div>

        {/* FORM TAMBAH PRODUK */}
        <div className="bg-[#111111] p-6 rounded-2xl border border-slate-800 shadow-lg">
          <h2 className="font-bold text-white mb-4 border-b border-slate-800 pb-2">Tambah Nominal</h2>
          <form onSubmit={handleAddProduct} className="space-y-3">
            <select required value={pGameId} onChange={e => setPGameId(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:border-amber-500 outline-none">
              <option value="">-- Pilih Game --</option>
              {games.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
            </select>
            <input required placeholder="Nama Produk (cth: 86 Diamonds)" value={pName} onChange={e => setPName(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:border-amber-500 outline-none" />
            <input required type="number" placeholder="Harga (cth: 20000)" value={pPrice} onChange={e => setPPrice(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:border-amber-500 outline-none" />
            <input placeholder="Badge (opsional, cth: Populer)" value={pBadge} onChange={e => setPBadge(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:border-amber-500 outline-none" />
            <button type="submit" className="w-full bg-amber-500 hover:bg-amber-400 text-black font-bold py-2.5 rounded-xl text-sm mt-2">Tambah Nominal</button>
          </form>
        </div>
      </div>

      {/* TABEL DAFTAR GAME */}
      <div className="bg-[#111111] rounded-2xl border border-slate-800 overflow-hidden shadow-lg mt-8">
        <div className="p-5 border-b border-slate-800">
          <h2 className="font-bold text-white">Daftar Game ({games.length})</h2>
        </div>
        <table className="w-full text-sm text-left">
          <thead className="bg-[#161616] text-slate-400">
            <tr>
              <th className="p-4">Game</th>
              <th className="p-4">Publisher</th>
              <th className="p-4">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {games.map(g => (
              <tr key={g.id} className="border-b border-slate-800/50 hover:bg-slate-800/30">
                <td className="p-4 font-bold text-white">{g.name}</td>
                <td className="p-4 text-slate-400">{g.publisher}</td>
                <td className="p-4">
                  <button onClick={() => handleDelete(g.id, 'game')} className="text-red-500 bg-red-500/10 hover:bg-red-500 hover:text-white px-3 py-1 rounded-lg text-xs font-bold transition-colors">Hapus</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
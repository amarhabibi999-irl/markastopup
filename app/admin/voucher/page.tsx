'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AdminVoucherPage() {
  const [vouchers, setVouchers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [code, setCode] = useState('');
  const [discount, setDiscount] = useState('');
  const [type, setType] = useState('percent');

  const fetchVouchers = async () => {
    const res = await fetch('/api/vouchers');
    const data = await res.json();
    setVouchers(data);
    setLoading(false);
  };

  useEffect(() => { fetchVouchers(); }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/admin/vouchers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, discount, type }),
    });
    
    const data = await res.json();
    if (data.error) {
      window.dispatchEvent(new CustomEvent('show-toast', { detail: { message: data.error, type: 'error' } }));
    } else {
      window.dispatchEvent(new CustomEvent('show-toast', { detail: { message: 'Voucher Ditambahkan!', type: 'success' } }));
      setCode(''); setDiscount('');
      fetchVouchers();
    }
  };

  const handleDelete = async (vCode: string) => {
    if (!confirm('Yakin hapus voucher ini?')) return;
    await fetch(`/api/admin/vouchers/${vCode}`, { method: 'DELETE' });
    fetchVouchers();
  };

  if (loading) return <div className="text-amber-500 text-center animate-pulse mt-20">Memuat Data...</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-10">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-wide">Manajemen Voucher</h1>
          <p className="text-slate-400 text-sm mt-1">Buat kode promo untuk menarik pembeli.</p>
        </div>
        <Link href="/admin" className="bg-slate-800 hover:bg-slate-700 text-white text-sm font-medium px-5 py-2.5 rounded-xl border border-slate-700 transition-colors">
          Kembali
        </Link>
      </div>

      <div className="bg-[#111111] p-6 rounded-2xl border border-slate-800 shadow-lg">
        <h2 className="font-bold text-white mb-4 border-b border-slate-800 pb-2">Buat Voucher Baru</h2>
        <form onSubmit={handleAdd} className="grid md:grid-cols-4 gap-4 items-end">
          <div>
            <label className="text-sm font-medium text-slate-300 block mb-1">Kode Voucher</label>
            <input type="text" value={code} onChange={e => setCode(e.target.value)} required placeholder="MARKA10" className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:border-amber-500 outline-none uppercase" />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-300 block mb-1">Tipe</label>
            <select value={type} onChange={e => setType(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:border-amber-500 outline-none">
              <option value="percent">Persentase (%)</option>
              <option value="nominal">Nominal (Rp)</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-slate-300 block mb-1">Potongan</label>
            <input type="number" value={discount} onChange={e => setDiscount(e.target.value)} required placeholder="10" className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:border-amber-500 outline-none" />
          </div>
          <button type="submit" className="bg-amber-500 hover:bg-amber-400 text-black font-bold py-3 px-6 rounded-xl transition-all shadow-lg shadow-amber-500/20">Tambah Voucher</button>
        </form>
      </div>

      <div className="bg-[#111111] rounded-2xl border border-slate-800 overflow-hidden shadow-lg mt-8">
        <table className="w-full text-sm text-left">
          <thead className="bg-[#161616] text-slate-400 border-b border-slate-800">
            <tr>
              <th className="p-4 font-medium">Kode</th>
              <th className="p-4 font-medium">Potongan</th>
              <th className="p-4 font-medium">Status</th>
              <th className="p-4 font-medium text-right">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {vouchers.map(v => (
              <tr key={v.code} className="border-b border-slate-800/50 hover:bg-slate-800/30">
                <td className="p-4 font-mono font-bold text-amber-500">{v.code}</td>
                <td className="p-4 text-white font-bold">{v.type === 'percent' ? `${v.discount}%` : `Rp ${v.discount.toLocaleString('id-ID')}`}</td>
                <td className="p-4 text-green-500 font-bold text-xs uppercase">{v.active ? 'Aktif' : 'Nonaktif'}</td>
                <td className="p-4 text-right">
                  <button onClick={() => handleDelete(v.code)} className="text-red-500 bg-red-500/10 hover:bg-red-500 hover:text-white px-3 py-1 rounded-lg text-xs font-bold transition-colors">Hapus</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
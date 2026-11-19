'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function IntegrasiPage() {
  const [apiKey, setApiKey] = useState('');
  const [markupType, setMarkupType] = useState('percent'); // 'percent' atau 'nominal'
  const [markupValue, setMarkupValue] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSync = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!apiKey) return window.dispatchEvent(new CustomEvent('show-toast', { detail: { message: 'API Key wajib diisi!', type: 'error' } }));
    
    setLoading(true);
    const res = await fetch('/api/admin/sync', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ apiKey, markupType, markupValue: parseFloat(markupValue) || 0 }),
    });

    const data = await res.json();
    setLoading(false);

    if (data.error) {
      window.dispatchEvent(new CustomEvent('show-toast', { detail: { message: data.error, type: 'error' } }));
    } else {
      window.dispatchEvent(new CustomEvent('show-toast', { detail: { message: `Sinkronisasi Berhasil! ${data.totalSynced} produk diupdate.`, type: 'success' } }));
      setApiKey('');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-10">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-wide">Integrasi Supplier</h1>
          <p className="text-slate-400 text-sm mt-1">Hubungkan website dengan API Supplier (Digiflazz, VIP, dll).</p>
        </div>
        <Link href="/admin" className="bg-slate-800 hover:bg-slate-700 text-white text-sm font-medium px-5 py-2.5 rounded-xl border border-slate-700 transition-colors">
          Kembali ke Dashboard
        </Link>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* KOLOM KIRI: FORM */}
        <div className="bg-[#111111] p-6 rounded-2xl border border-slate-800 shadow-lg">
          <h2 className="font-bold text-white mb-4 border-b border-slate-800 pb-2">Pengaturan API & Harga</h2>
          
          <form onSubmit={handleSync} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-slate-300 block mb-1">API Key Supplier</label>
              <input 
                type="text" 
                placeholder="Masukkan API Key rahasia lo..." 
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:border-amber-500 outline-none" 
              />
            </div>

            <div>
              <label className="text-sm font-medium text-slate-300 block mb-1">Tipe Markup (Keuntungan)</label>
              <select 
                value={markupType}
                onChange={(e) => setMarkupType(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:border-amber-500 outline-none"
              >
                <option value="percent">Persentase (%)</option>
                <option value="nominal">Nominal (Rp)</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-slate-300 block mb-1">
                {markupType === 'percent' ? 'Markup (%)' : 'Markup (Rp)'}
              </label>
              <input 
                type="number" 
                placeholder={markupType === 'percent' ? 'Contoh: 10' : 'Contoh: 2000'}
                value={markupValue}
                onChange={(e) => setMarkupValue(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:border-amber-500 outline-none" 
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-amber-500 hover:bg-amber-400 text-black font-bold py-3 rounded-xl transition-colors mt-4 shadow-lg shadow-amber-500/20 disabled:opacity-50"
            >
              {loading ? 'Menarik Data Supplier...' : 'Sinkronisasi Produk Sekarang'}
            </button>
          </form>
        </div>

        {/* KOLOM KANAN: INFO & SIMULASI HARGA */}
        <div className="bg-[#111111] p-6 rounded-2xl border border-slate-800 shadow-lg">
          <h2 className="font-bold text-white mb-4 border-b border-slate-800 pb-2">Informasi Integrasi</h2>
          
          <div className="space-y-4 text-sm text-slate-400">
            <p>Fitur ini akan otomatis menarik data dari supplier, membaca <strong>Harga Beli</strong> (Base Price), lalu menambahkan <strong>Markup</strong> yang lo tentuin.</p>
            
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4">
              <h3 className="text-white font-bold mb-2">Contoh Hitungan:</h3>
              <ul className="space-y-2">
                <li className="flex justify-between"><span>Harga Supplier (86 Diamond)</span> <span className="text-white">Rp 18.000</span></li>
                <li className="flex justify-between"><span>Markup Lo (10%)</span> <span className="text-amber-500">+ Rp 1.800</span></li>
                <li className="flex justify-between border-t border-slate-800 pt-2 mt-2 font-bold"><span>Harga Jual di Web</span> <span className="text-green-500">Rp 19.800</span></li>
              </ul>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/20 p-3 rounded-xl text-blue-400 text-xs mt-4">
              <p><strong>Catatan:</strong> Karena kita belum punya API asli, ini masih menggunakan <em>Mock Data</em> (Simulasi). Kalau udah deal supplier beneran, kita tinggal ganti isi fungsi <code>syncProducts</code> di file <code>mock.ts</code>.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
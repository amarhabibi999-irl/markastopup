'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function PengaturanPage() {
  const [siteName, setSiteName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [runningText, setRunningText] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/settings')
      .then(res => res.json())
      .then(data => {
        setSiteName(data.siteName || '');
        setWhatsapp(data.whatsapp || '');
        setRunningText(data.runningText || '');
        setLoading(false);
      });
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await fetch('/api/admin/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ siteName, whatsapp, runningText }),
    });
    setLoading(false);
    window.dispatchEvent(new CustomEvent('show-toast', { detail: { message: 'Pengaturan Disimpan!', type: 'success' } }));
    window.location.reload(); // Refresh biar langsung kerasa perubahannya
  };

  if (loading) return <div className="text-amber-500 text-center animate-pulse mt-20">Memuat...</div>;

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-10">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-wide">Pengaturan Website</h1>
          <p className="text-slate-400 text-sm mt-1">Ubah nama toko, kontak CS, dan promo.</p>
        </div>
        <Link href="/admin" className="bg-slate-800 hover:bg-slate-700 text-white text-sm font-medium px-5 py-2.5 rounded-xl border border-slate-700 transition-colors">
          Kembali
        </Link>
      </div>

      <div className="bg-[#111111] p-6 rounded-2xl border border-slate-800 shadow-lg">
        <form onSubmit={handleSave} className="space-y-5">
          <div>
            <label className="text-sm font-medium text-slate-300 block mb-1">Nama Website</label>
            <input type="text" value={siteName} onChange={e => setSiteName(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:border-amber-500 outline-none" required />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-300 block mb-1">Nomor WhatsApp CS (Awali 62)</label>
            <input type="text" value={whatsapp} onChange={e => setWhatsapp(e.target.value)} placeholder="Contoh: 6281234567890" className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:border-amber-500 outline-none" required />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-300 block mb-1">Teks Berjalan (Running Text)</label>
            <textarea value={runningText} onChange={e => setRunningText(e.target.value)} rows={3} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:border-amber-500 outline-none resize-none" />
          </div>

          <button type="submit" className="w-full bg-amber-500 hover:bg-amber-400 text-black font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-amber-500/20 mt-4">
            Simpan Pengaturan
          </button>
        </form>
      </div>
    </div>
  );
}
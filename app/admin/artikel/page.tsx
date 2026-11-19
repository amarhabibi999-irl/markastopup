'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import type { Article } from '@/lib/types';

export default function AdminArtikelPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Tips & Trik');
  const [content, setContent] = useState('');

  const fetchArticles = async () => {
    const res = await fetch('/api/articles');
    const data = await res.json();
    setArticles(data);
    setLoading(false);
  };

  useEffect(() => { fetchArticles(); }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/admin/articles', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, category, content }),
    });
    window.dispatchEvent(new CustomEvent('show-toast', { detail: { message: 'Artikel Ditambahkan!', type: 'success' } }));
    setTitle(''); setContent('');
    fetchArticles();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Yakin hapus artikel ini?')) return;
    await fetch(`/api/admin/articles/${id}`, { method: 'DELETE' });
    fetchArticles();
  };

  if (loading) return <div className="text-amber-500 text-center animate-pulse mt-20">Memuat Data...</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-10">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-wide">Manajemen Artikel</h1>
          <p className="text-slate-400 text-sm mt-1">Tulis berita atau promo terbaru.</p>
        </div>
        <Link href="/admin" className="bg-slate-800 hover:bg-slate-700 text-white text-sm font-medium px-5 py-2.5 rounded-xl border border-slate-700 transition-colors">
          Kembali
        </Link>
      </div>

      <div className="bg-[#111111] p-6 rounded-2xl border border-slate-800 shadow-lg">
        <h2 className="font-bold text-white mb-4 border-b border-slate-800 pb-2">Tulis Artikel Baru</h2>
        <form onSubmit={handleAdd} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-slate-300 block mb-1">Judul Artikel</label>
            <input type="text" value={title} onChange={e => setTitle(e.target.value)} required placeholder="Contoh: Promo Diskon 50%" className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:border-amber-500 outline-none" />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-300 block mb-1">Kategori</label>
            <select value={category} onChange={e => setCategory(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:border-amber-500 outline-none">
              <option value="Tips & Trik">Tips & Trik</option>
              <option value="Tutorial">Tutorial</option>
              <option value="Berita Game">Berita Game</option>
              <option value="Promo">Promo</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-slate-300 block mb-1">Isi Artikel</label>
            <textarea value={content} onChange={e => setContent(e.target.value)} rows={4} required placeholder="Tulis isi berita di sini..." className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:border-amber-500 outline-none resize-none" />
          </div>
          <button type="submit" className="bg-amber-500 hover:bg-amber-400 text-black font-bold py-3 px-6 rounded-xl transition-all shadow-lg shadow-amber-500/20">Publish Artikel</button>
        </form>
      </div>

      <div className="bg-[#111111] rounded-2xl border border-slate-800 overflow-hidden shadow-lg mt-8">
        <table className="w-full text-sm text-left">
          <thead className="bg-[#161616] text-slate-400 border-b border-slate-800">
            <tr>
              <th className="p-4 font-medium">Judul</th>
              <th className="p-4 font-medium">Kategori</th>
              <th className="p-4 font-medium">Tanggal</th>
              <th className="p-4 font-medium text-right">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {articles.map(a => (
              <tr key={a.id} className="border-b border-slate-800/50 hover:bg-slate-800/30">
                <td className="p-4 font-bold text-white">{a.title}</td>
                <td className="p-4 text-amber-500 text-xs">{a.category}</td>
                <td className="p-4 text-slate-400 text-xs">{a.date}</td>
                <td className="p-4 text-right">
                  <button onClick={() => handleDelete(a.id)} className="text-red-500 bg-red-500/10 hover:bg-red-500 hover:text-white px-3 py-1 rounded-lg text-xs font-bold transition-colors">Hapus</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
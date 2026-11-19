'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Product } from '@/lib/types';

export default function BuyModal({ product }: { product: Product }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ customerName: '', customerContact: '', target: '', zoneId: '' });
  const router = useRouter();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const res = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId: product.id, ...form }),
    });
    const data = await res.json();
    if (data.orderId) router.push('/checkout/' + data.orderId);
    else { alert('Gagal membuat order'); setLoading(false); }
  }

  if (!open) {
    return (
      <button onClick={() => setOpen(true)}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium py-2 rounded-lg">
        Beli
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
      <form onSubmit={submit} className="bg-white rounded-2xl p-5 w-full max-w-sm space-y-3">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold">{product.name}</h3>
          <button type="button" onClick={() => setOpen(false)} className="text-slate-400">Tutup</button>
        </div>
        <p className="text-sm text-indigo-600 font-bold">Rp {product.price.toLocaleString('id-ID')}</p>
        <input required placeholder="Nama kamu" value={form.customerName} onChange={e => setForm({ ...form, customerName: e.target.value })} className="w-full border rounded-lg px-3 py-2 text-sm" />
        <input required placeholder="No. WhatsApp / Email" value={form.customerContact} onChange={e => setForm({ ...form, customerContact: e.target.value })} className="w-full border rounded-lg px-3 py-2 text-sm" />
        <input required placeholder={product.targetLabel} value={form.target} onChange={e => setForm({ ...form, target: e.target.value })} className="w-full border rounded-lg px-3 py-2 text-sm" />
        {product.requiresZoneId && (
          <input required placeholder="Zone ID" value={form.zoneId} onChange={e => setForm({ ...form, zoneId: e.target.value })} className="w-full border rounded-lg px-3 py-2 text-sm" />
        )}
        <button disabled={loading} className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white py-2 rounded-lg font-medium">
          {loading ? 'Memproses...' : 'Lanjut ke Pembayaran'}
        </button>
      </form>
    </div>
  );
}
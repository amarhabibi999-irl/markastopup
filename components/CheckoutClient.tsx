'use client';
import { useEffect, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import Link from 'next/link';
import type { Order } from '@/lib/types';

export default function CheckoutClient({ initialOrder }: { initialOrder: Order }) {
  const [order, setOrder] = useState<Order>(initialOrder);
  const [simulating, setSimulating] = useState(false);
  const [timeLeft, setTimeLeft] = useState<string>('15:00');
  const [method, setMethod] = useState<'QRIS' | 'GoPay' | 'OVO' | 'DANA' | 'BCA'>('QRIS');

  const [voucherCode, setVoucherCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [isVoucherApplied, setIsVoucherApplied] = useState(false);

  const finalAmount = order.amount - discount;

  useEffect(() => {
    if (!order.paymentExpiresAt) return;
    const interval = setInterval(() => {
      const distance = new Date(order.paymentExpiresAt!).getTime() - new Date().getTime();
      if (distance < 0) { clearInterval(interval); setTimeLeft('Kedaluwarsa'); return; }
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      setTimeLeft(`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
    }, 1000);
    return () => clearInterval(interval);
  }, [order.paymentExpiresAt]);

  useEffect(() => {
    if (order.status === 'COMPLETED' || order.status === 'FAILED') return;
    const t = setInterval(async () => {
      const res = await fetch('/api/orders/' + order.id);
      const data = await res.json();
      setOrder(data);
    }, 3000);
    return () => clearInterval(t);
  }, [order.id, order.status]);

  const handleApplyVoucher = async () => {
    const res = await fetch('/api/vouchers');
    const vouchers = await res.json();
    const found = vouchers.find((v: any) => v.code === voucherCode.toUpperCase() && v.active);
    
    if (found) {
      let potongan = 0;
      if (found.type === 'percent') potongan = order.amount * (found.discount / 100);
      else potongan = found.discount;

      setDiscount(potongan);
      setIsVoucherApplied(true);
      window.dispatchEvent(new CustomEvent('show-toast', { detail: { message: 'Voucher Berhasil Dipakai!', type: 'success' } }));
    } else {
      window.dispatchEvent(new CustomEvent('show-toast', { detail: { message: 'Kode Voucher Tidak Valid!', type: 'error' } }));
    }
  };

  const handleCancel = async () => {
    if (!confirm('Yakin ingin membatalkan pesanan ini?')) return;
    await fetch('/api/webhook/payment', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ orderId: order.id, status: 'failed' }) });
  };

  async function simulatePay() {
    setSimulating(true);
    await fetch('/api/webhook/payment', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ orderId: order.id, status: 'paid' }) });
  }

  if (order.status === 'COMPLETED') {
    return (
      <div className="bg-white/[0.02] backdrop-blur-md rounded-3xl border border-white/10 p-8 flex flex-col items-center justify-center text-center shadow-2xl">
        <div className="w-20 h-20 bg-green-500/10 border border-green-500/30 rounded-full flex items-center justify-center mb-4">
          <span className="text-4xl text-green-500 font-bold">✓</span>
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">Pembayaran Berhasil!</h3>
        <p className="text-slate-400 mb-6 leading-relaxed max-w-md">Pesanan <strong className="text-white">{order.productName}</strong> untuk ID <strong className="text-white">{order.target}</strong> sedang diproses.</p>
        <div className="flex flex-col w-full max-w-xs gap-3">
          <Link href={`/struk/${order.id}`} className="bg-white/10 text-white hover:bg-white/20 border border-white/10 px-8 py-3.5 rounded-xl font-bold transition-all w-full text-center">Lihat Struk</Link>
          <Link href="/" className="bg-amber-500 hover:bg-amber-400 text-black px-8 py-3.5 rounded-xl font-bold transition-all w-full shadow-lg shadow-amber-500/20 text-center">Kembali ke Beranda</Link>
        </div>
      </div>
    );
  }

  if (order.status === 'FAILED') {
    return (
      <div className="bg-white/[0.02] backdrop-blur-md rounded-3xl border border-white/10 p-8 flex flex-col items-center justify-center text-center shadow-2xl">
        <div className="text-5xl text-red-500 font-bold mb-4">X</div>
        <h3 className="font-bold text-red-500 text-2xl mb-2">Pesanan Dibatalkan</h3>
        <p className="text-slate-400 mb-6">Waktu pembayaran habis atau dibatalkan.</p>
        <Link href="/" className="bg-white/5 border border-white/10 text-white px-8 py-3.5 rounded-xl font-medium hover:bg-white/10 transition-colors w-full max-w-xs">Coba Lagi</Link>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-6">
        <div className="bg-white/[0.02] backdrop-blur-md rounded-3xl border border-white/10 p-6 shadow-2xl">
          <h2 className="font-bold text-white border-b border-white/10 pb-3 mb-4">Rincian Pesanan</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between"><span className="text-slate-400">Produk</span><span className="font-medium text-white">{order.productName}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Tujuan</span><span className="font-medium text-white">{order.target} {order.zoneId ? `(${order.zoneId})` : ''}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Nama</span><span className="font-medium text-white">{order.customerName}</span></div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/10">
            <label className="text-xs font-medium text-slate-400 mb-2 block">Kode Promo</label>
            <div className="flex gap-2">
              <input type="text" placeholder="Masukkan kode" value={voucherCode} onChange={(e) => setVoucherCode(e.target.value)} disabled={isVoucherApplied} className="flex-1 bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:border-amber-500 outline-none uppercase" />
              <button onClick={handleApplyVoucher} disabled={isVoucherApplied || !voucherCode} className="bg-white/10 hover:bg-white/20 disabled:opacity-50 text-white border border-white/10 px-5 py-2.5 rounded-xl text-sm font-bold transition-colors">Pakai</button>
            </div>
          </div>

          <div className="mt-4 border-t border-white/10 pt-4 flex justify-between items-center">
            <span className="font-bold text-white">Total Bayar</span>
            <div className="text-right">
              {discount > 0 && <div className="text-sm text-slate-500 line-through">Rp {order.amount.toLocaleString('id-ID')}</div>}
              <span className="text-2xl font-black text-amber-500">Rp {finalAmount.toLocaleString('id-ID')}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white/[0.02] backdrop-blur-md rounded-3xl border border-white/10 p-6 flex flex-col items-center shadow-2xl h-fit">
        <div className="flex justify-between items-center w-full border-b border-white/10 pb-4 mb-4">
          <h2 className="font-bold text-white text-lg">Pembayaran</h2>
          <div className="bg-red-500/10 text-red-500 px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1.5 border border-red-500/20"><span>⏱</span> {timeLeft}</div>
        </div>

        <div className="w-full mb-6">
          <p className="text-[10px] uppercase tracking-wider text-slate-400 mb-2">Pilih Metode:</p>
          <div className="grid grid-cols-3 gap-2">
            <button onClick={() => setMethod('QRIS')} className={`p-2 rounded-xl border text-xs font-bold transition-all ${method === 'QRIS' ? 'bg-amber-500/20 border-amber-500 text-amber-500' : 'bg-black/50 border-white/10 text-slate-400 hover:border-white/30'}`}>QRIS</button>
            <button onClick={() => setMethod('GoPay')} className={`p-2 rounded-xl border text-xs font-bold transition-all ${method === 'GoPay' ? 'bg-green-500/20 border-green-500 text-green-500' : 'bg-black/50 border-white/10 text-slate-400 hover:border-white/30'}`}>GoPay</button>
            <button onClick={() => setMethod('OVO')} className={`p-2 rounded-xl border text-xs font-bold transition-all ${method === 'OVO' ? 'bg-purple-500/20 border-purple-500 text-purple-500' : 'bg-black/50 border-white/10 text-slate-400 hover:border-white/30'}`}>OVO</button>
            <button onClick={() => setMethod('DANA')} className={`p-2 rounded-xl border text-xs font-bold transition-all ${method === 'DANA' ? 'bg-blue-500/20 border-blue-500 text-blue-500' : 'bg-black/50 border-white/10 text-slate-400 hover:border-white/30'}`}>DANA</button>
            <button onClick={() => setMethod('BCA')} className={`p-2 rounded-xl border text-xs font-bold transition-all col-span-2 ${method === 'BCA' ? 'bg-slate-200 text-black border-white' : 'bg-black/50 border-white/10 text-slate-400 hover:border-white/30'}`}>VA BCA</button>
          </div>
        </div>

        <div className="w-full flex flex-col items-center min-h-[200px] justify-center mb-4">
          {method === 'QRIS' && (
            <div className="bg-white p-3 rounded-2xl shadow-lg shadow-amber-500/10">
              <QRCodeSVG value={order.qrString ?? 'MOCK'} size={160} />
            </div>
          )}
          {method === 'GoPay' && <div className="text-center space-y-3"><div className="text-5xl opacity-80">📱</div><p className="text-sm text-slate-400">Buka aplikasi Gojek.</p></div>}
          {method === 'OVO' && <div className="text-center space-y-3"><div className="text-5xl opacity-80">💜</div><p className="text-sm text-slate-400">Buka aplikasi OVO.</p></div>}
          {method === 'DANA' && <div className="text-center space-y-3"><div className="text-5xl opacity-80">💙</div><p className="text-sm text-slate-400">Buka aplikasi DANA.</p></div>}
          {method === 'BCA' && <div className="text-center space-y-3"><div className="text-5xl opacity-80">🏦</div><div className="bg-black/50 border border-white/10 p-2 rounded-lg text-white font-mono font-bold tracking-widest">3901 0812 3456</div></div>}
        </div>
        
        <div className="w-full space-y-3 mt-auto">
          <button onClick={simulatePay} disabled={simulating} className="w-full text-black bg-amber-500 hover:bg-amber-400 py-3 rounded-xl transition-colors font-bold shadow-lg shadow-amber-500/20 text-sm">
            [Demo] Simulasikan Lunas
          </button>
          <button onClick={handleCancel} className="w-full text-red-500 bg-red-500/10 hover:bg-red-500 hover:text-white border border-red-500/20 py-2.5 rounded-xl transition-colors font-medium text-xs">
            Batalkan Pesanan
          </button>
        </div>
      </div>
    </div>
  );
}
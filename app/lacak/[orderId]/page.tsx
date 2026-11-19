import { getOrder } from '@/lib/store';
import Link from 'next/link';

export default async function LacakDetailPage({ params }: { params: { orderId: string } }) {
  const order = await getOrder(params.orderId);

  if (!order) {
    return (
      <div className="max-w-md mx-auto mt-10 text-center bg-white/[0.02] backdrop-blur-md p-8 rounded-3xl border border-white/10 shadow-2xl">
        <div className="text-4xl mb-4 opacity-50">❌</div>
        <h1 className="text-xl font-bold text-red-500 mb-2">Pesanan Tidak Ditemukan</h1>
        <Link href="/lacak" className="text-amber-500 font-medium hover:underline text-sm">← Kembali</Link>
      </div>
    );
  }

  const statusColor = 
    order.status === 'COMPLETED' ? 'bg-green-500/10 text-green-500 border-green-500/20' :
    order.status === 'PENDING' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' :
    order.status === 'PAID' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' :
    'bg-red-500/10 text-red-500 border-red-500/20';

  let currentStep = 0;
  if (order.status === 'PENDING') currentStep = 1;
  if (order.status === 'PAID') currentStep = 2;
  if (order.status === 'COMPLETED') currentStep = 3;
  if (order.status === 'FAILED') currentStep = -1;

  return (
    <div className="max-w-md mx-auto mt-6 space-y-4 pb-10">
      <Link href="/lacak" className="text-slate-400 text-sm hover:text-amber-500 transition-colors">← Kembali ke Pencarian</Link>
      
      <div className="bg-white/[0.02] backdrop-blur-md p-6 rounded-3xl border border-white/10 shadow-2xl">
        <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
          <div>
            <div className="text-[10px] uppercase tracking-wider text-slate-500 mb-1">ID Pesanan</div>
            <div className="font-mono font-bold text-white text-lg">{order.id}</div>
          </div>
          <span className={`px-3 py-1 rounded-full text-[10px] font-bold border ${statusColor}`}>{order.status}</span>
        </div>

        {/* TIMELINE VISUAL */}
        {order.status !== 'FAILED' ? (
          <div className="mb-8 mt-2 relative">
            <div className="absolute left-[15px] top-4 bottom-4 w-0.5 bg-white/10 z-0"></div>
            
            <div className="flex gap-4 relative z-10 mb-6">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-xs ${currentStep >= 1 ? 'bg-amber-500 text-black shadow-[0_0_10px_rgba(245,158,11,0.3)]' : 'bg-slate-800 text-slate-500'}`}>✓</div>
              <div>
                <p className={`text-sm font-bold ${currentStep >= 1 ? 'text-white' : 'text-slate-500'}`}>Pesanan Dibuat</p>
                <p className="text-xs text-slate-500 mt-0.5">{new Date(order.createdAt).toLocaleTimeString('id-ID')} WIB</p>
              </div>
            </div>

            <div className="flex gap-4 relative z-10 mb-6">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-xs ${currentStep >= 2 ? 'bg-amber-500 text-black shadow-[0_0_10px_rgba(245,158,11,0.3)]' : 'bg-slate-800 text-slate-500 border border-white/10'}`}>{currentStep >= 2 ? '✓' : '2'}</div>
              <div>
                <p className={`text-sm font-bold ${currentStep >= 2 ? 'text-white' : 'text-slate-500'}`}>Pembayaran Diterima</p>
                <p className="text-xs text-slate-500 mt-0.5">{order.paidAt ? new Date(order.paidAt).toLocaleTimeString('id-ID') : 'Menunggu...'}</p>
              </div>
            </div>

            <div className="flex gap-4 relative z-10 mb-6">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-xs ${currentStep >= 3 ? 'bg-amber-500 text-black shadow-[0_0_10px_rgba(245,158,11,0.3)]' : 'bg-slate-800 text-slate-500 border border-white/10'}`}>{currentStep >= 3 ? '✓' : '3'}</div>
              <div>
                <p className={`text-sm font-bold ${currentStep >= 3 ? 'text-white' : 'text-slate-500'}`}>Pesanan Diproses Sistem</p>
                <p className="text-xs text-slate-500 mt-0.5">{currentStep >= 3 ? 'Sedang dikirim ke akun kamu' : 'Menunggu...'}</p>
              </div>
            </div>

            <div className="flex gap-4 relative z-10">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-xs ${currentStep >= 3 ? 'bg-green-500 text-black shadow-[0_0_10px_rgba(34,197,94,0.3)]' : 'bg-slate-800 text-slate-500 border border-white/10'}`}>{currentStep >= 3 ? '✓' : '4'}</div>
              <div>
                <p className={`text-sm font-bold ${currentStep >= 3 ? 'text-green-500' : 'text-slate-500'}`}>Selesai</p>
                <p className="text-xs text-slate-500 mt-0.5">{order.fulfilledAt ? new Date(order.fulfilledAt).toLocaleTimeString('id-ID') : 'Menunggu...'}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="mb-6 text-sm text-red-500 bg-red-500/10 border border-red-500/20 p-3 rounded-xl text-center font-medium">Pesanan Gagal atau Dibatalkan.</div>
        )}

        <div className="space-y-3 text-sm mb-6 pt-4 border-t border-white/10">
          <div className="flex justify-between"><span className="text-slate-400">Produk</span><span className="font-medium text-white">{order.productName}</span></div>
          <div className="flex justify-between"><span className="text-slate-400">Tujuan</span><span className="font-medium text-white">{order.target} {order.zoneId ? `(${order.zoneId})` : ''}</span></div>
          <div className="flex justify-between items-center pt-2">
            <span className="font-bold text-white">Total</span>
            <span className="font-bold text-amber-500 text-xl">Rp {order.amount.toLocaleString('id-ID')}</span>
          </div>
        </div>

        <div className="flex gap-2">
          {order.status === 'COMPLETED' && (
            <Link href={`/struk/${order.id}`} className="flex-1 bg-white text-black text-sm text-center font-bold py-3 rounded-xl hover:bg-slate-200 transition-colors">Struk</Link>
          )}
          <a href={`https://wa.me/6281234567890?text=Halo%20Admin,%20saya%20mau%20tanya%20pesanan%20ID%20*${order.id}*`} target="_blank" rel="noopener noreferrer" className="flex-1 bg-green-500 hover:bg-green-600 text-white text-sm text-center font-bold py-3 rounded-xl transition-colors shadow-lg shadow-green-500/20">CS</a>
        </div>
      </div>
    </div>
  );
}
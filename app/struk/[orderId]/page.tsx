import { notFound } from 'next/navigation';
import { getOrder } from '@/lib/store';
import Link from 'next/link';
import PrintButton from '@/components/PrintButton'; // <-- Panggil komponen baru

export default async function StrukPage({ params }: { params: { orderId: string } }) {
  const order = await getOrder(params.orderId);
  if (!order) notFound();

  return (
    <div className="max-w-md mx-auto mt-10 print:mt-0">
      
      {/* Kotak Struk Putih */}
      <div className="bg-white text-slate-800 p-8 rounded-2xl shadow-2xl print:shadow-none print:p-0">
        
        {/* Header Struk */}
        <div className="text-center border-b-2 border-dashed border-slate-300 pb-6 mb-6">
          <h1 className="text-2xl font-extrabold tracking-tighter mb-1">
            MARKA<span className="text-slate-600">STOPUP</span>
          </h1>
          <p className="text-xs text-slate-500">Bukti Pembayaran Resmi</p>
        </div>

        {/* Status Sukses */}
        <div className="text-center mb-6">
          <span className="inline-block bg-green-100 text-green-700 font-bold px-4 py-1.5 rounded-full text-sm border border-green-200">
            ✓ LUNAS / BERHASIL
          </span>
        </div>

        {/* Detail Transaksi */}
        <div className="space-y-3 text-sm mb-6">
          <div className="flex justify-between">
            <span className="text-slate-500">No. Transaksi</span>
            <span className="font-mono font-semibold">{order.id}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Tanggal</span>
            <span className="font-semibold">{new Date(order.createdAt).toLocaleString('id-ID')}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Nama Pembeli</span>
            <span className="font-semibold">{order.customerName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Kontak</span>
            <span className="font-semibold">{order.customerContact}</span>
          </div>
        </div>

        <div className="border-t-2 border-dashed border-slate-300 my-4"></div>

        {/* Detail Produk */}
        <div className="space-y-3 text-sm mb-6">
          <div className="flex justify-between">
            <span className="text-slate-500">Produk</span>
            <span className="font-bold text-right">{order.productName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Tujuan Akun</span>
            <span className="font-bold">{order.target} {order.zoneId ? `(${order.zoneId})` : ''}</span>
          </div>
        </div>

        <div className="border-t-2 border-dashed border-slate-300 my-4"></div>

        {/* Total */}
        <div className="flex justify-between items-center mb-8">
          <span className="text-sm font-bold text-slate-500">TOTAL BAYAR</span>
          <span className="text-xl font-extrabold">Rp {order.amount.toLocaleString('id-ID')}</span>
        </div>

        {/* Footer Struk */}
        <div className="text-center text-[10px] text-slate-500 leading-relaxed border-t border-slate-200 pt-4">
          <p>Terima kasih telah berbelanja di MARKASTOPUP.</p>
          <p>Struk ini adalah bukti pembayaran yang sah.</p>
          <p>Jika ada kendala, hubungi CS kami dengan menyertakan No. Transaksi.</p>
        </div>
      </div>

      {/* Tombol Aksi (Hilang pas di-print karena ada print:hidden) */}
      <div className="mt-6 flex flex-col sm:flex-row gap-3 print:hidden">
        <Link href="/" className="flex-1 bg-slate-800 hover:bg-slate-700 text-center text-white font-bold py-3.5 rounded-xl transition-colors border border-slate-700">
          Kembali ke Beranda
        </Link>
        
        {/* Panggil komponen tombol cetak di sini */}
        <PrintButton />
      </div>

    </div>
  );
}
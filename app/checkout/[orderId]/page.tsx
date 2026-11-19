import { notFound } from 'next/navigation';
import { getOrder } from '@/lib/store';
import CheckoutClient from '@/components/CheckoutClient';

export default async function CheckoutPage({ params }: { params: { orderId: string } }) {
  const order = await getOrder(params.orderId);
  if (!order) notFound();

  return (
    <div className="max-w-4xl mx-auto pb-10">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Selesaikan Pembayaran</h1>
        <p className="text-slate-400 text-sm mt-1">Pesanan ID: <span className="font-mono text-amber-500 font-semibold">{order.id}</span></p>
      </div>

      <CheckoutClient initialOrder={order} />
    </div>
  );
}
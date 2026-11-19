import { getOrder, updateOrder } from '@/lib/store';

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const order = await getOrder(params.id);
  if (!order) return Response.json({ error: 'Not found' }, { status: 404 });

  // LOGIKA AUTO-EXPIRED: Jika status PENDING dan waktu habis, ubah jadi FAILED
  if (order.status === 'PENDING' && order.paymentExpiresAt) {
    if (new Date() > new Date(order.paymentExpiresAt)) {
       const updated = await updateOrder(order.id, { status: 'FAILED' });
       return Response.json(updated);
    }
  }

  return Response.json(order);
}
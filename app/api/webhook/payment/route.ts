import { NextRequest } from 'next/server';
import { getOrder, updateOrder } from '@/lib/store';
import { getPaymentGateway } from '@/lib/payment';
import { getSupplier } from '@/lib/supplier';

export async function POST(req: NextRequest) {
  const raw = await req.json();
  const event = await getPaymentGateway().parseWebhook(raw);
  const order = await getOrder(event.orderId);
  if (!order) return Response.json({ error: 'Order not found' }, { status: 404 });

  if (order.status === 'COMPLETED' || order.status === 'FAILED') return Response.json({ ok: true, skipped: true });

  if (event.status === 'paid') {
    await updateOrder(order.id, { status: 'PAID', paidAt: new Date().toISOString() });
    const result = await getSupplier().fulfill(order);
    await updateOrder(order.id, { status: result.success ? 'COMPLETED' : 'FAILED', fulfilledAt: new Date().toISOString() });
  } else if (event.status === 'expired' || event.status === 'failed') {
    await updateOrder(order.id, { status: 'FAILED' });
  }

  return Response.json({ ok: true });
}
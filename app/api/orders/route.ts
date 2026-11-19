import { NextRequest } from 'next/server';
import { nanoid } from 'nanoid';
import { createOrder } from '@/lib/store';
import { getSupplier } from '@/lib/supplier';
import { getPaymentGateway } from '@/lib/payment';
import type { Order } from '@/lib/types';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { productId, customerName, customerContact, target, zoneId } = body;

  const products = await getSupplier().getProducts();
  const product = products.find(p => p.id === productId);
  if (!product) return Response.json({ error: 'Produk tidak ditemukan' }, { status: 404 });

  const orderId = `ORD-${nanoid(10).toUpperCase()}`;
  const payment = await getPaymentGateway().createPayment({
    orderId, amount: product.price, description: `${product.name} untuk ${target}`,
  });

  const order: Order = {
    id: orderId,
    productId: product.id,
    productName: product.name,
    amount: product.price,
    customerName: customerName || '-',
    customerContact,
    target,
    zoneId,
    status: 'PENDING',
    paymentId: payment.paymentId,
    qrString: payment.qrString,
    paymentExpiresAt: payment.expiresAt,
    createdAt: new Date().toISOString(),
  };

  try {
    await createOrder(order);
    return Response.json({ orderId });
  } catch (err: any) {
    console.error(err);
    return Response.json({ error: 'Gagal membuat order' }, { status: 500 });
  }
}
import { NextRequest } from 'next/server';
import { listOrders } from '@/lib/store';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get('email');

  if (!email) return Response.json([]);

  const orders = await listOrders();
  // Filter berdasarkan email/kontak pembeli
  const userOrders = orders.filter(o => o.customerContact === email);
  
  return Response.json(userOrders);
}
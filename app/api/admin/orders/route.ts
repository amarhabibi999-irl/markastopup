import { listOrders } from '@/lib/store';

export async function GET() {
  const orders = await listOrders();
  return Response.json(orders);
}
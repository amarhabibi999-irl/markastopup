import { NextRequest } from 'next/server';
import { updateOrder, deleteOrder } from '@/lib/store';

// FUNGSI UNTUK GANTI STATUS (Sukses / Gagal Manual)
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const body = await req.json();
  const updated = await updateOrder(params.id, { status: body.status });
  if (!updated) return Response.json({ error: 'Order not found' }, { status: 404 });
  return Response.json({ ok: true, order: updated });
}

// FUNGSI UNTUK HAPUS ORDER
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  await deleteOrder(params.id);
  return Response.json({ ok: true });
}
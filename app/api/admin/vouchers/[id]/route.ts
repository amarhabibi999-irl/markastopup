import { NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const supabase = createClient();
  await supabase.from('vouchers').delete().eq('code', params.id);
  return Response.json({ ok: true });
}
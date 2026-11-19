import { NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get('type');
  const supabase = createClient();

  if (type === 'game') {
    // Hapus produk dulu (karena foreign key), baru hapus game
    await supabase.from('products').delete().eq('gameId', params.id);
    await supabase.from('games').delete().eq('id', params.id);
  } else {
    await supabase.from('products').delete().eq('id', params.id);
  }

  return Response.json({ ok: true });
}
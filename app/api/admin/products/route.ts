import { NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET() {
  const supabase = createClient();
  const { data: games } = await supabase.from('games').select('*');
  const { data: products } = await supabase.from('products').select('*');
  return Response.json({ games: games || [], products: products || [] });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const supabase = createClient();
  
  const newGame = {
    id: body.name.toLowerCase().replace(/\s+/g, '-'),
    name: body.name,
    publisher: body.publisher,
    image: `https://ui-avatars.com/api/?name=${body.name.replace(/\s+/g, '+')}&background=random&color=fff&size=200&bold=true`,
    tag: body.tag || 'lainnya'
  };
  
  await supabase.from('games').insert(newGame);
  return Response.json({ ok: true, game: newGame });
}
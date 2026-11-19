import { NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const supabase = createClient();
  
  const newProduct = {
    id: `${body.gameId}-${Date.now()}`,
    gameId: body.gameId,
    name: body.name,
    basePrice: 0,
    price: parseInt(body.price),
    supplierSku: 'SKU-' + Math.floor(Math.random() * 1000),
    badge: body.badge || ''
  };
  
  await supabase.from('products').insert(newProduct);
  return Response.json({ ok: true, product: newProduct });
}
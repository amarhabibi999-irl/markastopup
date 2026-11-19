import { NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const supabase = createClient();
  const code = body.code.toUpperCase().replace(/\s+/g, '');

  const { data: existing } = await supabase.from('vouchers').select('code').eq('code', code).single();
  if (existing) return Response.json({ error: 'Kode voucher sudah ada!' }, { status: 400 });

  await supabase.from('vouchers').insert({ code, discount: parseInt(body.discount), type: body.type, active: true });
  return Response.json({ ok: true });
}
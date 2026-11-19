import { NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET() {
  const supabase = createClient();
  const { data } = await supabase.from('settings').select('*').eq('id', 1).single();
  return Response.json(data || { siteName: 'MARKAS TOPUP', whatsapp: '6281234567890', runningText: '' });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const supabase = createClient();
  await supabase.from('settings').update({
    siteName: body.siteName,
    whatsapp: body.whatsapp,
    runningText: body.runningText
  }).eq('id', 1);
  
  return Response.json({ ok: true });
}
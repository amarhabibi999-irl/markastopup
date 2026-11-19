import { createClient } from '@/lib/supabase/server';
export async function GET() {
  const supabase = createClient();
  const { data } = await supabase.from('vouchers').select('*');
  return Response.json(data || []);
}
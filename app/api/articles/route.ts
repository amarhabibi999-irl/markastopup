import { createClient } from '@/lib/supabase/server';
export async function GET() {
  const supabase = createClient();
  const { data } = await supabase.from('articles').select('*').order('date', { ascending: false });
  return Response.json(data || []);
}
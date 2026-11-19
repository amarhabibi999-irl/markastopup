import { getSupplier } from '@/lib/supplier';
import HomeClient from '@/components/HomeClient';
import { createClient } from '@/lib/supabase/server';

export default async function Home() {
  const supplier = getSupplier();
  const games = await (supplier as any).getGames();
  const supabase = createClient();
  const { data: articles } = await supabase.from('articles').select('*').limit(3);

  return <HomeClient games={games} articles={articles || []} />;
}
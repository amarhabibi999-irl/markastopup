import { NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { getSupplier } from '@/lib/supplier';

export async function POST(req: NextRequest) {
  const { apiKey, markupType, markupValue } = await req.json();
  const supplier = getSupplier();
  const syncResult: any = await supplier.syncProducts(apiKey);

  if (!syncResult.success) {
    return Response.json({ error: syncResult.message }, { status: 400 });
  }

  const supabase = createClient();
  const newProducts = syncResult.data;

  for (const item of newProducts) {
    let sellPrice = item.basePrice;
    if (markupType === 'percent') {
      sellPrice = item.basePrice + (item.basePrice * (markupValue / 100));
    } else {
      sellPrice = item.basePrice + markupValue;
    }
    sellPrice = Math.round(sellPrice);

    // Cek apakah produk udah ada (berdasarkan SKU)
    const { data: existing } = await supabase.from('products').select('id').eq('supplierSku', item.sku).single();

    if (existing) {
      await supabase.from('products').update({ basePrice: item.basePrice, price: sellPrice }).eq('id', existing.id);
    } else {
      await supabase.from('products').insert({
        id: `sync-${Date.now()}-${Math.floor(Math.random() * 100)}`,
        gameId: item.gameId,
        name: item.name,
        basePrice: item.basePrice,
        price: sellPrice,
        supplierSku: item.sku,
        badge: ''
      });
    }
  }

  return Response.json({ ok: true, totalSynced: newProducts.length });
}
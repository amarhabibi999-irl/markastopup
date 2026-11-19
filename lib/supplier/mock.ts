import { createClient } from '../supabase/server';
import type { Supplier, FulfillResult } from './types';
import type { Order, Product } from '../types';

export class MockSupplier implements Supplier {
  // 1. Ambil Produk
  async getProducts(): Promise<Product[]> { 
    const supabase = createClient();
    const { data } = await supabase.from('products').select('*');
    return data || [];
  }
  
  // 2. Ambil Game
  async getGames(): Promise<any[]> {
    const supabase = createClient();
    const { data } = await supabase.from('games').select('*');
    return data || [];
  }

  // 3. Simulasi Pemenuhan Pesanan
  async fulfill(order: Order): Promise<FulfillResult> {
    await new Promise(r => setTimeout(r, 2000));
    return { success: true, message: 'Mock OK: ' + order.productName + ' -> ' + order.target };
  }

  // 4. Sinkronisasi Harga (Supplier)
  async syncProducts(apiKey: string): Promise<{ success: boolean, message: string, totalSynced?: number }> {
    if (!apiKey || apiKey.length < 5) {
      return { success: false, message: 'API Key tidak valid!' };
    }

    await new Promise(r => setTimeout(r, 2000));

    // Data simulasi (di realitanya ini ditarik dari API Digiflazz/VIP)
    const mockSupplierData = [
      { sku: 'ML-86', gameId: 'mobile-legends', name: '86 Diamonds', basePrice: 18000 },
      { sku: 'ML-172', gameId: 'mobile-legends', name: '172 Diamonds', basePrice: 36000 },
      { sku: 'FF-70', gameId: 'free-fire', name: '70 Diamonds', basePrice: 9000 },
      { sku: 'VAL-420', gameId: 'valorant', name: '420 Points', basePrice: 31000 },
      { sku: 'GI-60', gameId: 'genshin-impact', name: '60 Crystals', basePrice: 14000 },
    ];

    return { 
      success: true, 
      message: 'Sinkronisasi Berhasil!', 
      data: mockSupplierData 
    } as any;
  }
}
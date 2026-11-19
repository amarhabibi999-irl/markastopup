import type { Order, Product } from '../types';

export interface FulfillResult {
  success: boolean;
  message: string;
}

export interface Supplier {
  getProducts(): Promise<Product[]>;
  fulfill(order: Order): Promise<FulfillResult>;
  
  // FUNGSI BARU UNTUK INTEGRASI API KEY
  syncProducts(apiKey: string): Promise<{ success: boolean, message: string, totalSynced?: number }>;
}
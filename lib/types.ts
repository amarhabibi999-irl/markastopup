export type OrderStatus = 'PENDING' | 'PAID' | 'COMPLETED' | 'FAILED';

export interface Game {
  id: string;
  name: string;
  publisher: string;
  image: string;
  tag?: string;
}

export interface Product {
  id: string;
  gameId: string;
  name: string;
  basePrice?: number;
  price: number;
  supplierSku: string;
  badge?: string;
}

export interface Order {
  id: string;
  productId: string;
  productName: string;
  amount: number;
  customerName: string;
  customerContact: string;
  target: string;
  zoneId?: string;
  status: OrderStatus;
  paymentId?: string;
  qrString?: string;
  paymentExpiresAt?: string;
  paidAt?: string;
  fulfilledAt?: string;
  createdAt: string;
}

export interface Article {
  id: string;
  title: string;
  category: string;
  date: string;
  content: string;
}
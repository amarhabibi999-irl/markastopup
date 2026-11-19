import { createClient } from './supabase/server';
import type { Order } from './types';

export async function listOrders(): Promise<Order[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .order('createdAt', { ascending: false });

  if (error) {
    console.error('Error listOrders:', error);
    return [];
  }
  return data || [];
}

export async function getOrder(id: string): Promise<Order | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('id', id)
    .single();

  if (error) return null;
  return data;
}

export async function createOrder(order: Order) {
  const supabase = createClient();
  const { error } = await supabase
    .from('orders')
    .insert(order);

  if (error) throw new Error('Gagal membuat order: ' + error.message);
  return order;
}

export async function updateOrder(id: string, patch: Partial<Order>) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('orders')
    .update(patch)
    .eq('id', id)
    .select()
    .single();

  if (error) return null;
  return data;
}

export async function deleteOrder(id: string) {
  const supabase = createClient();
  const { error } = await supabase
    .from('orders')
    .delete()
    .eq('id', id);

  if (error) return false;
  return true;
}
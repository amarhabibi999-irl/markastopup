import { MockSupplier } from './mock';
import type { Supplier } from './types';

// SLOT 2 - GANTI DENGAN SUPPLIER ASLI NANTI
export function getSupplier(): Supplier {
  return new MockSupplier();
}
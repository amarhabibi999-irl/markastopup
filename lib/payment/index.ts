import { MockPaymentGateway } from './mock';
import type { PaymentGateway } from './types';

// SLOT 1 - GANTI DENGAN VENDOR ASLI NANTI
export function getPaymentGateway(): PaymentGateway {
  return new MockPaymentGateway();
}
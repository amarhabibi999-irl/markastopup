import type { PaymentGateway, CreatePaymentInput, CreatePaymentResult, WebhookEvent } from './types';
export class MockPaymentGateway implements PaymentGateway {
  async createPayment(input: CreatePaymentInput): Promise<CreatePaymentResult> {
    const qrString = ('00020101021226MOCK-' + input.orderId).padEnd(60, '0') + ('5204000053033605802ID5910MARKASTOPUP6007JAKARTA5405' + input.amount + '6304ABCD');
    return { paymentId: ('MOCK-' + input.orderId), qrString, expiresAt: new Date(Date.now() + 15 * 60 * 1000).toISOString() };
  }
  async parseWebhook(payload: unknown): Promise<WebhookEvent> {
    const p = payload as { orderId: string; status: 'paid' | 'expired' | 'failed' };
    return { orderId: p.orderId, status: p.status, rawPayload: payload };
  }
}
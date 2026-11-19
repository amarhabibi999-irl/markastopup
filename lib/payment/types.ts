export interface CreatePaymentInput { orderId: string; amount: number; description: string; }
export interface CreatePaymentResult { paymentId: string; qrString: string; expiresAt: string; }
export interface WebhookEvent { orderId: string; status: 'paid' | 'expired' | 'failed'; rawPayload: unknown; }
export interface PaymentGateway {
  createPayment(input: CreatePaymentInput): Promise<CreatePaymentResult>;
  parseWebhook(payload: unknown): Promise<WebhookEvent>;
}
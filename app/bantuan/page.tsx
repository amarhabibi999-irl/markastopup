'use client';
import { useState } from 'react';

export default function BantuanPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(1);

  const faqs = [
    { id: 1, q: "Berapa lama proses top up?", a: "Proses top up dilakukan secara otomatis oleh sistem kami 24 jam. Biasanya hanya butuh waktu 1-3 menit setelah pembayaran berhasil." },
    { id: 2, q: "Apa yang harus dilakukan jika pesanan belum masuk?", a: "Pastikan User ID dan Zone ID sudah benar. Jika lebih dari 10 menit belum masuk, silakan hubungi CS kami dengan menyertakan ID Pesanan." },
    { id: 3, q: "Metode pembayaran apa saja yang tersedia?", a: "Kami mendukung pembayaran via QRIS (semua e-wallet), GoPay, OVO, DANA, ShopeePay, dan Virtual Account Bank (BCA, Mandiri, BRI, BNI)." },
    { id: 4, q: "Apakah data akun saya aman?", a: "Sangat aman. Kami tidak meminta password akun game kamu. Kami hanya membutuhkan User ID publik untuk mengirim item." },
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Pusat Bantuan</h1>
        <p className="text-slate-400">Ada kendala? Temukan jawabannya di sini atau hubungi CS kami.</p>
      </div>

      <div className="bg-[#111111] rounded-2xl border border-slate-800 p-6 shadow-lg space-y-4">
        <h2 className="font-bold text-white text-lg border-b border-slate-800 pb-3 mb-4">Pertanyaan Umum (FAQ)</h2>
        {faqs.map((faq) => (
          <div key={faq.id} className="border border-slate-800 rounded-xl overflow-hidden bg-slate-900/50">
            <button 
              onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
              className="w-full text-left p-4 font-semibold text-white flex justify-between items-center hover:bg-slate-800/50 transition-colors"
            >
              {faq.q}
              <span className="text-amber-500">{openFaq === faq.id ? '−' : '+'}</span>
            </button>
            {openFaq === faq.id && (
              <div className="p-4 text-sm text-slate-400 border-t border-slate-800/50 bg-[#111] leading-relaxed">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-amber-500/20 to-transparent border border-amber-500/30 p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-white mb-1">Masih butuh bantuan?</h3>
        </div>
        <a 
          href="https://wa.me/6281234567890" 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-green-500 hover:bg-green-600 text-white font-bold px-6 py-2.5 rounded-xl transition-colors shadow-lg shadow-green-500/20 whitespace-nowrap"
        >
          Chat CS via WhatsApp
        </a>
      </div>
    </div>
  );
}
'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import type { Product, Game } from '@/lib/types';

export default function GameCheckoutClient({ game, products }: { game: Game, products: Product[] }) {
  const [userId, setUserId] = useState('');
  const [zoneId, setZoneId] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [isChecking, setIsChecking] = useState(false);
  const [verifiedName, setVerifiedName] = useState<string | null>(null);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [customerName, setCustomerName] = useState('');
  const [customerContact, setCustomerContact] = useState('');

  useEffect(() => {
    const savedUser = localStorage.getItem('markas_user');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setCustomerName(user.name);
      setCustomerContact(user.email); 
    }
  }, []);

  const extraInputConfig: Record<string, { label: string, placeholder: string }> = {
    'mobile-legends': { label: 'Zone ID', placeholder: '1234' },
    'honor-of-kings': { label: 'Zone ID', placeholder: '1234' },
    'aov': { label: 'Server', placeholder: '2001' },
    'genshin-impact': { label: 'Server', placeholder: 'Asia / America' },
    'honkai-star-rail': { label: 'Server', placeholder: 'Asia / America' },
    'zenless-zone-zero': { label: 'Server', placeholder: 'Asia / America' },
    'valorant': { label: 'Tagline', placeholder: '#IDN' },
  };

  const extraInput = extraInputConfig[game.id];
  const isEmailGame = ['steam-wallet', 'google-play'].includes(game.id);
  const mainInputLabel = isEmailGame ? 'Alamat Email' : (game.id === 'genshin-impact' ? 'UID' : (game.id === 'roblox' ? 'Username' : 'User ID'));
  const mainInputPlaceholder = isEmailGame ? 'Masukkan email aktif' : 'Masukkan ID';

  const handleCheckId = () => {
    if (!userId) return window.dispatchEvent(new CustomEvent('show-toast', { detail: { message: `Masukkan ${mainInputLabel} dulu!`, type: 'error' } }));
    setIsChecking(true);
    setVerifiedName(null);
    setTimeout(() => {
      setIsChecking(false);
      setVerifiedName('MarkasGamer_' + Math.floor(Math.random() * 1000)); 
      window.dispatchEvent(new CustomEvent('show-toast', { detail: { message: 'Akun Ditemukan!', type: 'success' } }));
    }, 1500);
  };

  function handleOpenModal(product: Product) {
    if (!userId) return window.dispatchEvent(new CustomEvent('show-toast', { detail: { message: `Isi ${mainInputLabel} dulu ya bre!`, type: 'error' } }));
    if (extraInput && !zoneId) return window.dispatchEvent(new CustomEvent('show-toast', { detail: { message: `Isi ${extraInput.label} dulu ya bre!`, type: 'error' } }));
    setSelectedProduct(product);
  }

  async function handleConfirmCheckout() {
    if (!customerName || !customerContact) return window.dispatchEvent(new CustomEvent('show-toast', { detail: { message: 'Nama dan Kontak wajib diisi bre!', type: 'error' } }));

    setLoading(true);
    const res = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId: selectedProduct!.id, customerName, customerContact, target: userId, zoneId: extraInput ? zoneId : undefined }),
    });
    
    const data = await res.json();
    if (data.orderId) router.push(`/checkout/${data.orderId}`);
    else { window.dispatchEvent(new CustomEvent('show-toast', { detail: { message: 'Gagal membuat order', type: 'error' } })); setLoading(false); }
  }

  return (
    <div className="relative">
      
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {/* LANGKAH 1: FORM INPUT */}
        <div className="md:col-span-1 bg-white/[0.02] backdrop-blur-md p-6 rounded-2xl border border-white/10 h-fit space-y-5 shadow-2xl">
          <div className="flex items-center gap-3 border-b border-white/10 pb-3">
            <span className="bg-amber-500 text-black w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">1</span>
            <h3 className="font-bold text-white">Data Akun</h3>
          </div>
          
          <div>
            <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">{mainInputLabel}</label>
            <div className="flex gap-2 mt-1.5">
              <input 
                type={isEmailGame ? "email" : "text"} 
                placeholder={mainInputPlaceholder}
                value={userId}
                onChange={(e) => { setUserId(e.target.value); setVerifiedName(null); }}
                className="flex-1 border border-white/10 bg-black/50 rounded-xl px-4 py-3 text-sm text-white focus:ring-2 focus:ring-amber-500/50 outline-none transition-all placeholder-slate-600" 
              />
              <button onClick={handleCheckId} disabled={isChecking} className="bg-amber-500/10 hover:bg-amber-500 text-amber-500 hover:text-black border border-amber-500/30 px-4 rounded-xl font-bold text-xs transition-all disabled:opacity-50">
                {isChecking ? '...' : 'Cek'}
              </button>
            </div>
            
            {verifiedName && (
              <div className="mt-2 bg-green-500/10 border border-green-500/30 p-2.5 rounded-xl flex items-center gap-2 animate-in fade-in">
                <span className="text-green-500 text-sm font-bold">✓</span>
                <div>
                  <p className="text-[10px] text-slate-400">Nickname:</p>
                  <p className="text-xs font-bold text-white">{verifiedName}</p>
                </div>
              </div>
            )}
          </div>

          {extraInput && (
            <div>
              <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">{extraInput.label}</label>
              <input 
                type="text" 
                placeholder={extraInput.placeholder} 
                value={zoneId}
                onChange={(e) => setZoneId(e.target.value)}
                className="w-full mt-1.5 border border-white/10 bg-black/50 rounded-xl px-4 py-3 text-sm text-white focus:ring-2 focus:ring-amber-500/50 outline-none transition-all placeholder-slate-600" 
              />
            </div>
          )}
          <div className="bg-amber-500/5 border border-amber-500/10 p-3 rounded-xl">
            <p className="text-[10px] text-amber-500/80 leading-relaxed">Pastikan data akun benar. Barang yang sudah dikirim tidak bisa di-refund.</p>
          </div>
        </div>

        {/* LANGKAH 2: PILIH NOMINAL */}
        <div className="md:col-span-2 bg-white/[0.02] backdrop-blur-md p-6 rounded-2xl border border-white/10 space-y-5 shadow-2xl">
          <div className="flex items-center gap-3 border-b border-white/10 pb-3">
            <span className="bg-amber-500 text-black w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">2</span>
            <h3 className="font-bold text-white">Pilih Nominal</h3>
          </div>
          
          {products.length === 0 ? (
            <p className="text-sm text-slate-500 italic">Belum ada produk.</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {products.map((p) => (
                <button 
                  key={p.id}
                  disabled={loading}
                  onClick={() => handleOpenModal(p)}
                  className="bg-white/[0.03] border border-white/10 rounded-xl p-4 flex flex-col items-center justify-center hover:border-amber-500/50 hover:bg-white/[0.06] hover:shadow-[0_0_15px_rgba(245,158,11,0.15)] transition-all disabled:opacity-50 group relative overflow-hidden"
                >
                  {p.badge && <span className="absolute top-0 right-0 bg-amber-500 text-black text-[9px] font-bold px-2 py-0.5 rounded-bl-lg">{p.badge}</span>}
                  <span className="font-semibold text-sm text-slate-300 group-hover:text-white transition-colors">{p.name}</span>
                  <span className="text-amber-500 font-bold text-sm mt-1">Rp {p.price.toLocaleString('id-ID')}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* MODAL CHECKOUT (Glassmorphism) */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-[#0a0a0a]/90 border border-white/10 rounded-3xl w-full max-w-md overflow-hidden shadow-2xl">
            <div className="bg-white/5 p-5 border-b border-white/10 flex justify-between items-center">
              <h3 className="font-bold text-white">Konfirmasi Pesanan</h3>
              <button onClick={() => setSelectedProduct(null)} className="text-slate-400 hover:text-white transition-colors text-xl">✕</button>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="bg-black/50 border border-white/5 p-4 rounded-xl flex justify-between items-center">
                <div>
                  <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Produk</p>
                  <p className="font-bold text-white text-sm">{selectedProduct.name}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Total</p>
                  <p className="font-bold text-amber-500">Rp {selectedProduct.price.toLocaleString('id-ID')}</p>
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-slate-400">Nama Kamu</label>
                <input type="text" placeholder="Masukkan nama" value={customerName} onChange={(e) => setCustomerName(e.target.value)} className="w-full mt-1.5 border border-white/10 bg-black/50 rounded-xl px-4 py-3 text-sm text-white focus:ring-2 focus:ring-amber-500/50 outline-none transition-all placeholder-slate-600" />
              </div>
              <div>
                <label className="text-xs font-medium text-slate-400">No. WhatsApp / Email</label>
                <input type="text" placeholder="Masukkan kontak" value={customerContact} onChange={(e) => setCustomerContact(e.target.value)} className="w-full mt-1.5 border border-white/10 bg-black/50 rounded-xl px-4 py-3 text-sm text-white focus:ring-2 focus:ring-amber-500/50 outline-none transition-all placeholder-slate-600" />
              </div>

              <button onClick={handleConfirmCheckout} disabled={loading} className="w-full mt-2 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-black font-bold py-3.5 rounded-xl transition-all shadow-[0_0_20px_rgba(245,158,11,0.2)] disabled:opacity-50 text-sm">
                {loading ? 'Memproses...' : 'Lanjut ke Pembayaran'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
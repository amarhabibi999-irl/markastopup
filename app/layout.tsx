import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import ToastContainer from '@/components/Toast';
import { UserNav } from '@/components/UserNav';
import { createClient } from '@/lib/supabase/server';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'MARKAS TOPUP - Top Up Game Termurah & Tercepat',
  description: 'Platform top up game & voucher terlaris, murah, aman, legal 100%. Proses otomatis 24 jam.',
};

export const viewport: Viewport = {
  themeColor: '#000000',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const supabase = createClient();
  let settings = { siteName: 'MARKAS TOPUP', whatsapp: '6281234567890', runningText: '' };

  try {
    const { data } = await supabase.from('settings').select('*').eq('id', 1).single();
    if (data) settings = data;
  } catch {}

  return (
    <html lang="id">
      <body className={`${inter.className} flex flex-col min-h-screen text-slate-200 bg-[#050505] pb-16 md:pb-0`}>
        
        <ToastContainer />

        <div className="bg-[#111] border-b border-amber-500/20 text-amber-500 text-[10px] md:text-xs font-medium py-2 overflow-hidden print:hidden">
          <div className="animate-marquee">
            <span className="mx-4">{settings.runningText}</span>
            <span className="mx-4">{settings.runningText}</span>
          </div>
        </div>

        <header className="border-b border-white/5 bg-black/50 backdrop-blur-xl sticky top-0 z-50 print:hidden">
          <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
            <Link href="/">
              <img src="/images/logo.png" alt="Logo" className="h-10 md:h-12 w-auto object-contain" />
            </Link>
            <UserNav />
          </div>
        </header>
        
        <main className="max-w-6xl mx-auto px-4 py-8 flex-grow w-full">
          {children}
        </main>
        
        <footer className="border-t border-white/5 bg-[#0a0a0a] mt-auto hidden md:block print:hidden">
          <div className="max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-4 gap-8 text-sm text-slate-400">
            <div className="md:col-span-2">
              <div className="mb-6">
                <img src="/images/logo.png" alt="Logo" className="h-10 w-auto object-contain" />
              </div>
              <p className="mb-6 leading-relaxed max-w-sm">Platform top up game & voucher termurah, cepat, dan aman. Proses otomatis 24 jam tanpa libur. Dipercaya ribuan gamer di Indonesia.</p>
              <p className="text-xs text-slate-600">© {new Date().getFullYear()} {settings.siteName}. All rights reserved.</p>
            </div>
            
            <div>
              <h4 className="font-bold text-white mb-4 text-base">Bantuan</h4>
              <ul className="space-y-3">
                <li><Link href="/syarat-ketentuan" className="hover:text-amber-500 transition-colors">Syarat & Ketentuan</Link></li>
                <li><Link href="/kebijakan-privasi" className="hover:text-amber-500 transition-colors">Kebijakan Privasi</Link></li>
                <li><Link href="/artikel" className="hover:text-amber-500 transition-colors">Artikel & Berita</Link></li>
                <li><Link href="/bantuan" className="hover:text-amber-500 transition-colors">Pusat Bantuan</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-white mb-4 text-base">Pembayaran</h4>
              <div className="flex flex-wrap gap-2">
                <span className="bg-white/5 border border-white/10 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg">QRIS</span>
                <span className="bg-white/5 border border-white/10 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg">GoPay</span>
                <span className="bg-white/5 border border-white/10 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg">OVO</span>
                <span className="bg-white/5 border border-white/10 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg">DANA</span>
                <span className="bg-white/5 border border-white/10 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg">BCA</span>
              </div>
            </div>
          </div>
        </footer>

        <nav className="md:hidden fixed bottom-0 w-full bg-[#0a0a0a]/90 backdrop-blur-xl border-t border-white/10 z-50 flex justify-around items-center h-16 pb-safe print:hidden">
          <Link href="/" className="flex flex-col items-center gap-1 text-[10px] font-medium text-slate-400 hover:text-amber-500">
            <span className="text-xl">🏠</span> Beranda
          </Link>
          <Link href="/artikel" className="flex flex-col items-center gap-1 text-[10px] font-medium text-slate-400 hover:text-amber-500">
            <span className="text-xl">📰</span> Artikel
          </Link>
          <Link href="/leaderboard" className="flex flex-col items-center gap-1 text-[10px] font-medium text-slate-400 hover:text-amber-500">
            <span className="text-xl">🏆</span> Rank
          </Link>
          <Link href="/bantuan" className="flex flex-col items-center gap-1 text-[10px] font-medium text-slate-400 hover:text-amber-500">
            <span className="text-xl">💬</span> Bantuan
          </Link>
        </nav>

        <a href={`https://wa.me/${settings.whatsapp}`} target="_blank" rel="noopener noreferrer" className="fixed bottom-20 md:bottom-8 right-4 md:right-8 bg-green-500 hover:bg-green-600 text-white p-3.5 rounded-full shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:scale-110 transition-all z-40 flex items-center justify-center print:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
        </a>

      </body>
    </html>
  );
}
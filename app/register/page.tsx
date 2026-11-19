'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) return alert('Isi semua data!');
    
    // Simulasi Daftar Sukses
    localStorage.setItem('markas_user', JSON.stringify({ name, email }));
    alert('Pendaftaran Berhasil!');
    router.push('/profil');
  };

  return (
    <div className="max-w-md mx-auto mt-16 bg-[#111111] p-8 rounded-3xl border border-slate-800 shadow-[0_0_30px_rgba(245,158,11,0.05)]">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-white mb-2">Buat Akun Baru</h1>
        <p className="text-slate-400 text-sm">Gabung dan nikmati kemudahan top up.</p>
      </div>

      <form onSubmit={handleRegister} className="space-y-4">
        <div>
          <label className="text-sm font-medium text-slate-300">Nama Lengkap</label>
          <input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full mt-1.5 border border-slate-700 bg-slate-900 rounded-xl px-4 py-3 text-sm text-white focus:ring-2 focus:ring-amber-500 outline-none" placeholder="Nama Kamu" />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-300">Alamat Email</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full mt-1.5 border border-slate-700 bg-slate-900 rounded-xl px-4 py-3 text-sm text-white focus:ring-2 focus:ring-amber-500 outline-none" placeholder="email@contoh.com" />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-300">Password</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full mt-1.5 border border-slate-700 bg-slate-900 rounded-xl px-4 py-3 text-sm text-white focus:ring-2 focus:ring-amber-500 outline-none" placeholder="••••••••" />
        </div>
        <button type="submit" className="w-full bg-amber-500 hover:bg-amber-400 text-black font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-amber-500/20 mt-2">
          Daftar Akun
        </button>
      </form>

      <p className="text-center text-sm text-slate-400 mt-6">
        Sudah punya akun? <Link href="/login" className="text-amber-500 hover:underline">Masuk di sini</Link>
      </p>
    </div>
  );
}
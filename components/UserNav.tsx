'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export function UserNav() {
  const [user, setUser] = useState<{ name: string } | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const savedUser = localStorage.getItem('markas_user');
    if (savedUser) setUser(JSON.parse(savedUser));
    else setUser(null);
  }, [pathname]);

  return (
    <nav className="hidden md:flex gap-4 lg:gap-6 text-sm font-medium text-slate-300 items-center">
      <Link href="/" className={`hover:text-amber-400 transition-colors ${pathname === '/' ? 'text-amber-500' : ''}`}>Beranda</Link>
      <Link href="/kalkulator" className={`hover:text-amber-400 transition-colors ${pathname.includes('/kalkulator') ? 'text-amber-500' : ''}`}>Kalkulator</Link>
      <Link href="/leaderboard" className={`hover:text-amber-400 transition-colors ${pathname.includes('/leaderboard') ? 'text-amber-500' : ''}`}>Leaderboard</Link>
      <Link href="/artikel" className={`hover:text-amber-400 transition-colors ${pathname.includes('/artikel') ? 'text-amber-500' : ''}`}>Artikel</Link>
      <Link href="/lacak" className={`hover:text-amber-400 transition-colors ${pathname.includes('/lacak') ? 'text-amber-500' : ''}`}>Lacak</Link>
      <Link href="/admin" className="text-red-500 font-bold hover:text-red-400 transition-colors border border-red-500/30 px-3 py-1 rounded-full ml-2">Admin</Link>
      
      {user ? (
        <Link href="/profil" className="bg-amber-500/10 text-amber-500 border border-amber-500/30 px-4 py-1.5 rounded-full font-bold hover:bg-amber-500 hover:text-black transition-all ml-2">
          Halo, {user.name.split(' ')[0]}
        </Link>
      ) : (
        <Link href="/login" className="bg-amber-500 text-black px-4 py-1.5 rounded-full font-bold hover:bg-amber-400 transition-all shadow-lg shadow-amber-500/20 ml-2">
          Masuk
        </Link>
      )}
    </nav>
  );
}
'use client';
import { useState, useEffect } from 'react';
import AdminClient from '@/components/AdminClient';
import type { Order } from '@/lib/types';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const isAdmin = localStorage.getItem('markas_admin');
    if (isAdmin === 'true') {
      setIsAuthenticated(true);
      fetchOrders();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/admin/orders');
      if (!res.ok) throw new Error('Gagal mengambil data dari server');
      
      const data = await res.json();
      if (Array.isArray(data)) {
        setOrders(data);
      } else {
        setOrders([]);
      }
    } catch (error) {
      window.dispatchEvent(new CustomEvent('show-toast', { detail: { message: 'Terjadi kesalahan mengambil data.', type: 'error' } }));
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'markas123') { 
      localStorage.setItem('markas_admin', 'true');
      setIsAuthenticated(true);
      setLoading(true);
      fetchOrders();
      window.dispatchEvent(new CustomEvent('show-toast', { detail: { message: 'Akses Diterima!', type: 'success' } }));
    } else {
      window.dispatchEvent(new CustomEvent('show-toast', { detail: { message: 'Password Salah Bre!', type: 'error' } }));
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('markas_admin');
    setIsAuthenticated(false);
    setPassword('');
    window.dispatchEvent(new CustomEvent('show-toast', { detail: { message: 'Berhasil Keluar.', type: 'info' } }));
  };

  if (loading) return <div className="text-center mt-20 text-amber-500 font-bold text-xl animate-pulse">Memuat Data...</div>;

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto mt-20 bg-[#111] p-8 rounded-3xl border border-slate-800 text-center shadow-[0_0_30px_rgba(245,158,11,0.05)]">
        <div className="text-5xl mb-4">🔒</div>
        <h1 className="text-2xl font-bold text-white mb-2">Area Terbatas</h1>
        <p className="text-slate-400 text-sm mb-6">Masukkan password admin untuk melihat data pendapatan.</p>
        <form onSubmit={handleLogin} className="flex flex-col gap-3">
          <input 
            type="password" 
            placeholder="Password Admin" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-slate-700 bg-slate-900 rounded-xl px-4 py-3 text-center text-white focus:ring-2 focus:ring-amber-500 outline-none" 
          />
          <button type="submit" className="bg-amber-500 hover:bg-amber-400 text-black font-bold py-3 rounded-xl transition-colors shadow-lg shadow-amber-500/20">
            Buka Gembok
          </button>
        </form>
        <p className="text-xs text-slate-600 mt-6">(Demo Password: markas123)</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-end mb-4">
        <button onClick={handleLogout} className="text-sm text-red-500 bg-red-500/10 border border-red-500/20 px-4 py-2 rounded-lg hover:bg-red-500 hover:text-white transition-colors font-bold">
          Keluar Admin
        </button>
      </div>
      <AdminClient initialOrders={orders} />
    </div>
  );
}
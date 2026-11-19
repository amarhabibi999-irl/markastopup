'use client';
import { useEffect, useState } from 'react';

export default function ToastContainer() {
  const [toasts, setToasts] = useState<{ id: number, message: string, type: 'success' | 'error' | 'info' }[]>([]);

  useEffect(() => {
    const handleToast = (e: any) => {
      const { message, type } = e.detail;
      const id = Date.now();
      setToasts((prev) => [...prev, { id, message, type }]);
      
      setTimeout(() => {
        setToasts((prev) => prev.filter(t => t.id !== id));
      }, 3000);
    };

    window.addEventListener('show-toast', handleToast);
    return () => window.removeEventListener('show-toast', handleToast);
  }, []);

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] flex flex-col gap-2 w-full max-w-sm px-4">
      {toasts.map((toast) => (
        <div 
          key={toast.id} 
          className={`p-4 rounded-xl border shadow-2xl flex items-center gap-3 animate-in slide-in-from-top-5 fade-in duration-300 backdrop-blur-md ${
            toast.type === 'success' ? 'bg-green-500/10 border-green-500/30 text-green-500' :
            toast.type === 'error' ? 'bg-red-500/10 border-red-500/30 text-red-500' :
            'bg-amber-500/10 border-amber-500/30 text-amber-500'
          }`}
        >
          <span className="text-xl">{toast.type === 'success' ? '✅' : toast.type === 'error' ? '❌' : 'ℹ️'}</span>
          <p className="text-sm font-bold text-white">{toast.message}</p>
        </div>
      ))}
    </div>
  );
}
'use client';

export default function PrintButton() {
  return (
    <button 
      onClick={() => window.print()}
      className="flex-1 bg-amber-500 hover:bg-amber-400 text-center text-black font-bold py-3.5 rounded-xl transition-colors shadow-lg shadow-amber-500/20"
    >
      Cetak / Simpan PDF
    </button>
  );
}
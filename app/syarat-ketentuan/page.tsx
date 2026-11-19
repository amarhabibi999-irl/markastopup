export default function SyaratKetentuanPage() {
  return (
    <div className="max-w-3xl mx-auto bg-[#111111] border border-slate-800 p-8 rounded-3xl shadow-lg space-y-6">
      <h1 className="text-3xl font-bold text-white border-b border-slate-800 pb-4">Syarat & Ketentuan</h1>
      
      <div className="space-y-4 text-slate-300 text-sm leading-relaxed">
        <p>Selamat datang di MARKASTOPUP. Dengan menggunakan layanan kami, Anda dianggap telah membaca, memahami, dan menyetujui seluruh syarat dan ketentuan yang berlaku.</p>
        
        <h2 className="text-lg font-bold text-amber-500 pt-2">1. Ketentuan Layanan</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>Pembeli wajib memasukkan data (User ID, Zone ID, Server, dll) dengan benar dan teliti.</li>
          <li>Kesalahan pengisian data yang menyebabkan item masuk ke akun orang lain adalah tanggung jawab pembeli sepenuhnya.</li>
          <li>Item yang sudah berhasil dikirim ke akun game tidak dapat dikembalikan (Refund) dengan alasan apapun.</li>
        </ul>

        <h2 className="text-lg font-bold text-amber-500 pt-2">2. Pembayaran & Refund</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>Pembayaran dilakukan melalui metode yang tersedia (QRIS, E-Wallet, Virtual Account).</li>
          <li>Jika pesanan gagal karena stok kosong atau gangguan sistem dari pihak supplier, dana akan dikembalikan 100% ke saldo dompet atau rekening pembeli.</li>
        </ul>

        <h2 className="text-lg font-bold text-amber-500 pt-2">3. Waktu Operasional</h2>
        <p>Sistem kami beroperasi secara otomatis 24 jam sehari, 7 hari seminggu. Namun, jika terjadi gangguan pada server game atau supplier, pesanan mungkin akan diproses secara manual oleh CS kami pada jam kerja.</p>
      </div>
    </div>
  );
}
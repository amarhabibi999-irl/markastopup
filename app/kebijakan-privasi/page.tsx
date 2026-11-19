export default function KebijakanPrivasiPage() {
  return (
    <div className="max-w-3xl mx-auto bg-[#111111] border border-slate-800 p-8 rounded-3xl shadow-lg space-y-6">
      <h1 className="text-3xl font-bold text-white border-b border-slate-800 pb-4">Kebijakan Privasi</h1>
      
      <div className="space-y-4 text-slate-300 text-sm leading-relaxed">
        <p>MARKASTOPUP sangat menghargai privasi Anda. Halaman ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi data Anda.</p>
        
        <h2 className="text-lg font-bold text-amber-500 pt-2">1. Data yang Kami Kumpulkan</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Data Transaksi:</strong> User ID game, Server, Nama, dan Kontak (Email/WA) untuk keperluan pengiriman pesanan dan bukti pembayaran.</li>
          <li><strong>Data Pembayaran:</strong> Transaksi diproses melalui Payment Gateway resmi pihak ketiga. Kami <strong>tidak</strong> menyimpan data kartu kredit, PIN, atau password m-banking Anda.</li>
        </ul>

        <h2 className="text-lg font-bold text-amber-500 pt-2">2. Penggunaan Data</h2>
        <p>Data yang Anda berikan hanya digunakan untuk:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Memproses dan mengirimkan pesanan top-up Anda.</li>
          <li>Menghubungi Anda jika terjadi masalah pada pesanan.</li>
          <li>Mencegah tindakan penipuan (fraud).</li>
        </ul>

        <h2 className="text-lg font-bold text-amber-500 pt-2">3. Keamanan Data</h2>
        <p>Kami menggunakan enkripsi SSL dan standar keamanan industri untuk melindungi data Anda. Kami tidak akan pernah menjual atau menyebarkan data Anda ke pihak ketiga tanpa izin.</p>
      </div>
    </div>
  );
}
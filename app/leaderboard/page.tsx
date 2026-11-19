import Link from 'next/link';
import fs from 'fs/promises';
import path from 'path';

export default async function LeaderboardPage() {
  // Baca data orderan dari database JSON
  let orders = [];
  try {
    const data = await fs.readFile(path.join(process.cwd(), 'data', 'orders.json'), 'utf8');
    orders = JSON.parse(data);
  } catch {}

  // 1. Filter order yang sukses (COMPLETED) aja
  const completedOrders = orders.filter((o: any) => o.status === 'COMPLETED');

  // 2. Hitung total belanja per orang (pakai nama sebagai identitas)
  const spenders: Record<string, { name: string, total: number }> = {};
  
  completedOrders.forEach((o: any) => {
    const name = o.customerName || 'Anonim';
    if (!spenders[name]) {
      spenders[name] = { name, total: 0 };
    }
    spenders[name].total += o.amount;
  });

  // 3. Ubah ke array, urutkan dari yang terbesar, ambil 10 teratas
  const topSpenders = Object.values(spenders)
    .sort((a, b) => b.total - a.total)
    .slice(0, 10);

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-10">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-black text-white mb-2 tracking-tight flex items-center justify-center gap-2">
          <span>🏆</span> Leaderboard Top Spender
        </h1>
        <p className="text-slate-400 text-sm">Daftar Sultan yang paling banyak top up di MARKAS TOPUP.</p>
      </div>

      <div className="bg-white/[0.02] backdrop-blur-md rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
        <table className="w-full text-left text-sm">
          <thead className="bg-[#111] text-slate-400 border-b border-white/10">
            <tr>
              <th className="p-5 font-medium text-center w-20">Rank</th>
              <th className="p-5 font-medium">Nama Sultan</th>
              <th className="p-5 font-medium text-right">Total Belanja</th>
            </tr>
          </thead>
          <tbody>
            {topSpenders.map((user, index) => {
              // Logika Warna & Medali
              let medal = '';
              let bgClass = 'bg-white/[0.02]';
              let textClass = 'text-slate-400';
              
              if (index === 0) { medal = '👑'; bgClass = 'bg-amber-500/10'; textClass = 'text-amber-500 font-bold'; }
              else if (index === 1) { medal = '🥈'; bgClass = 'bg-slate-300/10'; textClass = 'text-slate-300 font-bold'; }
              else if (index === 2) { medal = '🥉'; bgClass = 'bg-orange-500/10'; textClass = 'text-orange-400 font-bold'; }

              return (
                <tr key={index} className={`border-b border-white/5 hover:bg-white/[0.05] transition-colors ${bgClass}`}>
                  <td className="p-5 text-center font-bold text-lg">
                    {medal ? <span className="text-2xl">{medal}</span> : <span className="text-slate-500">{index + 1}</span>}
                  </td>
                  <td className={`p-5 ${index === 0 ? 'text-white' : 'text-slate-300'}`}>
                    {user.name}
                  </td>
                  <td className={`p-5 text-right font-bold ${textClass}`}>
                    Rp {user.total.toLocaleString('id-ID')}
                  </td>
                </tr>
              );
            })}
            
            {topSpenders.length === 0 && (
              <tr>
                <td colSpan={3} className="p-12 text-center text-slate-500">
                  <div className="text-5xl mb-4 opacity-50">📭</div>
                  Belum ada transaksi sukses. Jadi Sultan Pertama sekarang!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      <div className="text-center mt-6">
        <p className="text-xs text-slate-500">Papan peringkat diperbarui secara otomatis setiap ada transaksi sukses.</p>
      </div>
    </div>
  );
}
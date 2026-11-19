const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'public', 'images');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

// Pake logo perusahaan/game dari Clearbit, 100% anti blokir
const images = {
  'ml.png': 'https://logo.clearbit.com/mobilelegends.com',
  'ff.png': 'https://logo.clearbit.com/garena.com',
  'pubg.png': 'https://logo.clearbit.com/pubgmobile.com',
  'valorant.png': 'https://logo.clearbit.com/playvalorant.com',
  'genshin.png': 'https://logo.clearbit.com/hoyoverse.com',
  'codm.png': 'https://logo.clearbit.com/activision.com',
  'hok.png': 'https://logo.clearbit.com/levelinfinite.com',
  'aov.png': 'https://logo.clearbit.com/aov.garena.com',
  'roblox.png': 'https://logo.clearbit.com/roblox.com',
  'hsr.png': 'https://logo.clearbit.com/hoyoverse.com',
  'zzz.png': 'https://logo.clearbit.com/hoyoverse.com',
  'pb.png': 'https://logo.clearbit.com/zepetto.com',
  'steam.png': 'https://logo.clearbit.com/steampowered.com',
  'gplay.png': 'https://logo.clearbit.com/play.google.com',
  'higgs.png': 'https://logo.clearbit.com/higgsgames.com'
};

async function downloadImage(filename, url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    
    const arrayBuffer = await response.arrayBuffer();
    fs.writeFileSync(path.join(dir, filename), Buffer.from(arrayBuffer));
    console.log(`✅ [OK] ${filename}`);
  } catch (error) {
    console.log(`❌ [GAGAL] ${filename} - ${error.message}`);
  }
}

async function start() {
  console.log('⏳ Sedang mengunduh gambar game (Via Clearbit)...');
  for (const [filename, url] of Object.entries(images)) {
    await downloadImage(filename, url);
  }
  console.log('\n🎉 PROSES SELESAI!');
}

start();
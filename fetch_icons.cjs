const https = require('https');
const fs = require('fs');

const items = [
  'pistol.semiauto', 'crossbow', 'ammo.pistol', 'arrow.wooden', 'grenade.f1',
  'attire.hide.vest', 'wood', 'stones', 'metal.fragments', 'syringe.medical',
  'smg.thompson', 'shotgun.double', 'ammo.rifle', 'explosive.satchel', 'metal.facemask',
  'metal.plate.torso', 'rifle.semiauto', 'rocket.launcher', 'ammo.rifle.hv',
  'ammo.rocket.basic', 'explosive.timed', 'metal.refined'
];

fs.mkdirSync('./public/items', { recursive: true });

const download = (url, dest) => {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' }}, (res) => {
      if (res.statusCode === 200) {
        const file = fs.createWriteStream(dest);
        res.pipe(file);
        file.on('finish', () => { file.close(); resolve(true); });
      } else {
        // Try fallback without _512
        if (url.includes('_512')) {
          download(url.replace('_512', ''), dest).then(resolve).catch(reject);
        } else {
           // Try rustlabs as last resort inside node
           const rlUrl = `https://rustlabs.com/img/items150/${url.split('/').pop()}`;
           https.get(rlUrl, { headers: { 'User-Agent': 'Mozilla/5.0', 'Referer': 'https://rustlabs.com/' }}, (resRl) => {
             if (resRl.statusCode === 200) {
                const fileRl = fs.createWriteStream(dest);
                resRl.pipe(fileRl);
                fileRl.on('finish', () => { fileRl.close(); resolve(true); });
             } else {
                console.log('FAIL:', url.split('/').pop().replace('_512', '').replace('.png', ''), res.statusCode);
                resolve(false);
             }
           });
        }
      }
    }).on('error', reject);
  });
};

(async () => {
  for (const item of items) {
    await download(`https://files.facepunch.com/rust/item/${item}_512.png`, `./public/items/${item}.png`);
    console.log(`Grabbed ${item}`);
  }
})();

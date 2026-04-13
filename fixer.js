const fs = require('fs');

let js = fs.readFileSync('src/lib/judomanager-standings.ts', 'utf-8');
js = js.replace(/familyName: res\.person\.familyName,/g, "familyName: (res.person.familyName || '').toLowerCase().split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),");
js = js.replace(/givenName: res\.person\.givenName,/g, "givenName: (res.person.givenName || '').toLowerCase().split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),");
js = js.replace(/x\.club\?\.name\?\.toLowerCase\(\)[\s\S]*?'[^\n]*'/g, "x.club?.name?.toLowerCase()?.includes('ljezn')");
fs.writeFileSync('src/lib/judomanager-standings.ts', js);

let ml = fs.readFileSync('src/components/MedalsList.tsx', 'utf-8');
ml = ml.replace(/ðŸ¥‡/g, '🥇').replace(/ðŸ¥ˆ/g, '🥈').replace(/ðŸ¥‰/g, '🥉');
fs.writeFileSync('src/components/MedalsList.tsx', ml);
console.log('Fixed files');
const fs = require('fs');
let b = fs.readFileSync('src/lib/competition-sync.ts', 'utf8');

b = b.replace(
    `const clubStandings = standings.find((x: any) =>
            x.club?.idClub === 11443 ||
            x.club?.name?.toLowerCase() === 'Å¾eljezniÄar' ||
            x.club?.intName?.toLowerCase() === 'zeljeznicar'
        );`,
    `const clubStandingsList = standings.filter((x: any) =>
            x.club?.idClub === 11443 ||
            (x.club?.name?.toLowerCase()?.includes('ljezn') && x.club?.name?.toLowerCase()?.includes('sarajevo')) ||
            x.club?.intName?.toLowerCase() === 'zeljeznicar sarajevo'
        );`
);

b = b.replace(
    `const medalIcon = res.place === 1 ? 'ðŸ¥‡' : res.place === 2 ? 'ðŸ¥ˆ' : 'ðŸ¥‰';`,
    `const medalIcon = res.place === 1 ? '🥇' : res.place === 2 ? '🥈' : '🥉';`
);

fs.writeFileSync('src/lib/competition-sync.ts', b, 'utf8');
console.log('Done strings');
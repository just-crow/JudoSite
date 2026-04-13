const fs = require('fs');
let b = fs.readFileSync('src/lib/competition-sync.ts', 'utf8');

// Replace find with filter
b = b.replace(
    /const clubStandings = standings\.find[\s\S]*?==='zeljeznicar'\s*\n\s*\);/m,
    `const clubStandingsList = standings.filter((x: any) =>
            x.club?.idClub === 11443 ||
            (x.club?.name?.toLowerCase()?.includes('ljezn') && x.club?.name?.toLowerCase()?.includes('sarajevo')) ||
            x.club?.intName?.toLowerCase() === 'zeljeznicar sarajevo'
        );`
);

// Replace the null check
b = b.replace(
    /if \(!clubStandings\) return;/g,
    `if (!clubStandingsList || clubStandingsList.length === 0) return;`
);

// Replace emojis
b = b.replace(/const medalIcon.*?ðŸ¥‰';/g, "const medalIcon = res.place === 1 ? '🥇' : res.place === 2 ? '🥈' : '🥉';");

// Replace the end calls
b = b.replace(
    /await syncResults\(clubStandings\.resultsMen\);\s*await syncResults\(clubStandings\.resultsWomen\);/m,
    `for (const clubStandings of clubStandingsList) {
            await syncResults(clubStandings.resultsMen);
            await syncResults(clubStandings.resultsWomen);
        }`
);

fs.writeFileSync('src/lib/competition-sync.ts', b, 'utf8');
console.log("Done");
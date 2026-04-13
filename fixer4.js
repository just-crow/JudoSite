const fs = require('fs');
const newFn = `
async function syncCompetitorMedals(comp: JudoManagerCompetition) {
    if (!comp.idCompetition) return;

    try {
        const url = \`https://datav2.judomanager.com/api/Competition/GetCompetitionStandings?idCompetition=\${comp.idCompetition}\`;
        const standingsRes = await fetch(url, { headers: { 'Content-Type': 'application/json' } });
        if (!standingsRes.ok) return;

        const standings = await standingsRes.json();
        if (!Array.isArray(standings)) return;

        const clubStandingsList = standings.filter((x: any) =>
            x.club?.idClub === 11443 ||
            (x.club?.name?.toLowerCase()?.includes('ljezn') && x.club?.name?.toLowerCase()?.includes('sarajevo')) ||
            x.club?.intName?.toLowerCase() === 'zeljeznicar sarajevo'
        );

        if (!clubStandingsList || clubStandingsList.length === 0) return;

        const { data: dbCompetitors } = await supabase.from('competitors').select('id, first_name, last_name, results');
        if (!dbCompetitors) return;

        const syncResults = async (results: any[]) => {
            if (!Array.isArray(results)) return;
            const normalizeStr = (s: string) => s.toLowerCase().normalize("NFD").replace(/[\\u0300-\\u036f]/g, "").trim();
            for (const res of results) {
                if (res.place && res.place <= 3 && res.person) {
                    const resFirst = normalizeStr(res.person.givenName || res.person.intGivenName || '');
                    const resLast = normalizeStr(res.person.familyName || res.person.intFamilyName || '');

                    const matched = dbCompetitors.find(c =>
                        normalizeStr(c.last_name) === resLast &&
                        normalizeStr(c.first_name) === resFirst
                    );
                    if (!matched) continue;

                    const medalIcon = res.place === 1 ? '🥇' : res.place === 2 ? '🥈' : '🥉';
                    const category = res.weightCategory?.name || res.weightCategory?.officialName || '';
                    const medalStr = \`\${medalIcon} \${res.place}. mjesto - \${category} - \${comp.name.trim()}\`;

                    if (!matched.results) matched.results = '';

                    const existingResults = matched.results.split('\\n').map((l: string) => l.trim());

                    // Check if already contains this exact medal
                    if (!existingResults.includes(medalStr)) {
                        matched.results = existingResults.filter((l: string) => l.length > 0).concat(medalStr).join('\\n');
                        await supabase.from('competitors').update({ results: matched.results }).eq('id', matched.id);
                    }
                }
            }
        };

        for (const clubStandings of clubStandingsList) {
            await syncResults(clubStandings.resultsMen);
            await syncResults(clubStandings.resultsWomen);
        }
    } catch (e) {
        console.error(\`Failed to sync medals for \${comp.name}:\`, e);
    }
}
\`;

fs.appendFileSync('src/lib/competition-sync.ts', newFn);
(async () => {
    try {
        const dateStr = '2026-02-14';
        const externalId = 'federalno_prvenstvo_lukavac_2026';

        const listRes = await fetch('https://datav2.judomanager.com/api/Competition/GetCompetitions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ dateFrom: dateStr, dateTo: dateStr, limit: 100, countryIds: [47] })
        });
        const listData = await listRes.json();
        
        const comp = listData?.list?.find(c => c.externalId === externalId);
        if (!comp) {
            console.log('Competition not found based on exactly dateStr');
            return;
        }

        console.log('Comp ID:', comp.idCompetition);

        const standingsRes = await fetch(`https://datav2.judomanager.com/api/Competition/GetCompetitionStandings?idCompetition=${comp.idCompetition}`);
        const standings = await standingsRes.json();
        console.log(standings.map(x => x.club?.name).filter(n => n && n.toLowerCase().includes('elj')));
        
        const clubStandings = standings.filter(x => 
            x.club?.idClub === 11443 || 
            (x.club?.name?.toLowerCase()?.includes('ljezn') && x.club?.name?.toLowerCase()?.includes('sarajevo')) ||
            x.club?.intName?.toLowerCase() === 'zeljeznicar sarajevo'
        );

        console.log('Club Standings Length:', clubStandings.length);
        if (clubStandings.length > 0) {
            console.log('Results Men:', clubStandings[0].resultsMen?.length);
            console.log('Results Women:', clubStandings[0].resultsWomen?.length);
        }
    } catch(e) {
        console.error(e);
    }
})();

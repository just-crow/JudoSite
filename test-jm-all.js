(async () => {
    try {
        const comps = [
          'federalno_prvenstvo_lukavac_2026',
          'laktasi_open_2026',
          'trofej_zvornika_2026',
          'xxiii_me_unarodni_dzudo_kup_trebinje_2026_xvi_memorijal_milos_mrdic2026',
          'prvenstvo_republike_srpske_za_kadete_i_mla_e_pionire2026',
          'prvenstvo_judo_saveza_herceg_bosne_bih2026'
        ];

        for (const externalId of comps) {
            const listRes = await fetch('https://datav2.judomanager.com/api/Competition/GetCompetitions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ dateFrom: '2025-01-01', dateTo: '2026-12-31', limit: 1000 })
            });
            const listData = await listRes.json();
            const comp = listData?.list?.find(c => c.externalId === externalId);
            if (!comp) {
                console.log(externalId, 'NOT FOUND');
                continue;
            }

            const standingsRes = await fetch(`https://datav2.judomanager.com/api/Competition/GetCompetitionStandings?idCompetition=${comp.idCompetition}`);
            const standings = await standingsRes.json();

            const club = standings.find(x => 
                x.club?.idClub === 11443 || 
                (x.club?.name && x.club.name.toLowerCase().includes('ljezn') && x.club.name.toLowerCase().includes('sarajevo'))
            );

            console.log(externalId, club ? 'FOUND' : 'NO MEDALS');
        }
    } catch(e) {
        console.error(e);
    }
})();

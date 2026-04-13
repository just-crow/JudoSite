import { unstable_cache } from 'next/cache';

export interface Medalist {
    id: number;
    familyName: string;
    givenName: string;
    place: number;
    category: string;
}

export const getZeljeznicarMedals = unstable_cache(
    async (externalId: string | null, dateStr: string): Promise<Medalist[]> => {
        if (!externalId) return [];

        try {
            const listRes = await fetch('https://datav2.judomanager.com/api/Competition/GetCompetitions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ dateFrom: dateStr, dateTo: dateStr, limit: 100, countryIds: [47] })
            });
            if (!listRes.ok) return [];
            
            const listData = await listRes.json();
            const comp = listData?.list?.find((c: any) => c.externalId === externalId);
            if (!comp?.idCompetition) return [];

            const standingsRes = await fetch(`https://datav2.judomanager.com/api/Competition/GetCompetitionStandings?idCompetition=${comp.idCompetition}`);
            if (!standingsRes.ok) return [];
            
            const standings = await standingsRes.json();
            
            const clubStandings = standings.find((x: any) => 
                x.club?.idClub === 11443 || 
                x.club?.name?.toLowerCase() === 'željezničar' || 
                x.club?.intName?.toLowerCase() === 'zeljeznicar'
            );

            if (!clubStandings) return [];

            const medalists: Medalist[] = [];

            const processResults = (results: any[]) => {
                if (!Array.isArray(results)) return;
                for (const res of results) {
                    if (res.place && res.place <= 3 && res.person) {
                        medalists.push({
                            id: res.person.idPerson || Math.random(),
                            familyName: res.person.familyName,
                            givenName: res.person.givenName,
                            place: res.place,
                            category: res.weightCategory?.name || res.weightCategory?.officialName || ''
                        });
                    }
                }
            };

            processResults(clubStandings.resultsMen);
            processResults(clubStandings.resultsWomen);

            return medalists.sort((a, b) => a.place - b.place);

        } catch (e) {
            console.error('Error fetching JM medals', e);
            return [];
        }
    },
    ['zeljeznicar-medals'],
    { revalidate: 3600 * 24 }
);
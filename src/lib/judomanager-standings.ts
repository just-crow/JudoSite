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
            // Expand the date range slightly to catch multi-day events or time zone differences
            const d = new Date(dateStr);
            const dFrom = new Date(d); dFrom.setDate(d.getDate() - 3);
            const dTo = new Date(d); dTo.setDate(d.getDate() + 3);
            
            const dateFromStr = dFrom.toISOString().split('T')[0];
            const dateToStr = dTo.toISOString().split('T')[0];

            const listRes = await fetch('https://datav2.judomanager.com/api/Competition/GetCompetitions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ dateFrom: dateFromStr, dateTo: dateToStr, limit: 100, countryIds: [47] })
            });

            if (!listRes.ok) return [];
            
            const listData = await listRes.json();
            const comp = listData?.list?.find((c: any) => c.externalId === externalId);
            if (!comp?.idCompetition) return [];

            const standingsRes = await fetch(`https://datav2.judomanager.com/api/Competition/GetCompetitionStandings?idCompetition=${comp.idCompetition}`);
            if (!standingsRes.ok) return [];
            
            const standings = await standingsRes.json();
            
            const clubStandings = standings.filter((x: any) => 
                x.club?.idClub === 11443 || 
                (x.club?.name?.toLowerCase()?.includes('ljezn') && x.club?.name?.toLowerCase()?.includes('sarajevo')) || 
                x.club?.intName?.toLowerCase() === 'zeljeznicar sarajevo'
            );

            if (!clubStandings || clubStandings.length === 0) return [];

            const medalists: Medalist[] = [];

            const processResults = (results: any[]) => {
                if (!Array.isArray(results)) return;
                for (const res of results) {
                    if (res.place && res.place <= 3 && res.person) {
                        medalists.push({
                            id: res.person.idPerson || Math.random(),
                            familyName: (res.person.familyName || '').toLowerCase().split(' ').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
                            givenName: (res.person.givenName || '').toLowerCase().split(' ').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
                            place: res.place,
                            category: res.weightCategory?.name || res.weightCategory?.officialName || ''
                        });
                    }
                }
            };

            for (const club of clubStandings) {
                processResults(club.resultsMen);
                processResults(club.resultsWomen);
            }

            return medalists.sort((a, b) => a.place - b.place);

        } catch (e) {
            console.error('Error fetching JM medals', e);
            return [];
        }
    },
    ['zeljeznicar-medals-v2'],
    { revalidate: 3600, tags: ['jm-medals'] }
);
@
const externalId='federalno_prvenstvo_lukavac_2026';
const dateStr='2026-02-14';
fetch('https://datav2.judomanager.com/api/Competition/GetCompetitions', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ dateFrom: dateStr, dateTo: dateStr, limit: 100, countryIds: [47] }) })
.then(r=>r.json()).then(async listData => {
  const comp=listData.list.find(c=>c.externalId===externalId);
  const standingsRes=await fetch('https://datav2.judomanager.com/api/Competition/GetCompetitionStandings?idCompetition=' + comp.idCompetition);
  const standings=await standingsRes.json();
  const clubStandings=standings.filter(x=>x.club?.idClub===11443||(x.club?.name?.toLowerCase()?.includes('ljezn')&&x.club?.name?.toLowerCase()?.includes('sarajevo'))||x.club?.intName?.toLowerCase()==='zeljeznicar sarajevo');
  console.dir(clubStandings, {depth: null});
});
@

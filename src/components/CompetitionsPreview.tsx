import { getCompetitions } from "@/actions/competitions";

export default async function CompetitionsPreview() {
    const competitions = await getCompetitions();
    const upcoming = competitions
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        .filter(c => new Date(c.date) >= new Date())
        .slice(0, 4);

    if (upcoming.length === 0) return <p className="text-[var(--text-secondary)]">Nema najavljenih takmičenja.</p>;

    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {upcoming.map((comp) => (
                <div key={comp.id} className="bg-[var(--background-alt)] p-6 rounded-xl border border-transparent hover:border-[var(--primary)] transition-all group">
                    <div className="text-xs font-bold text-[var(--accent)] mb-2 uppercase tracking-wider">
                        {new Date(comp.date).toLocaleDateString("bs-BA", { day: 'numeric', month: 'long' })}
                    </div>
                    <h3 className="font-bold text-[var(--text-primary)] mb-3 group-hover:text-[var(--primary)] transition-colors">
                        {comp.title}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                        {comp.location}
                    </div>
                </div>
            ))}
        </div>
    )
}

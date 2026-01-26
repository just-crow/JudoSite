import Link from 'next/link';
import { getCompetitions } from '@/actions/competitions';
import { getSponsors } from '@/actions/sponsors';

export default async function Sidebar() {
    const competitions = await getCompetitions();
    const sponsors = await getSponsors();

    // Sort competitions by date and take next 3
    const upcomingCompetitions = competitions
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        .filter(c => new Date(c.date) >= new Date()) // Only future events? Or just all? Let's show all sorted for now or filtered.
        .slice(0, 3);

    return (
        <div className="space-y-10">
            {/* Events Widget */}
            <div className="card p-8 lg:p-10 rounded-3xl">
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 rounded-xl bg-[var(--primary)] flex items-center justify-center text-white shadow-lg">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-bold text-[var(--text-primary)]">
                        Nadolazeća takmičenja
                    </h3>
                </div>

                <div className="space-y-4">
                    {upcomingCompetitions.length > 0 ? (
                        upcomingCompetitions.map((event) => (
                            <div key={event.id} className="group p-5 rounded-2xl bg-[var(--background-alt)] hover:bg-white border border-transparent hover:border-[var(--border)] transition-all duration-300 hover:shadow-md cursor-pointer">
                                <div className="text-[10px] font-bold text-[var(--primary)] mb-2 tracking-wider">
                                    {new Date(event.date).toLocaleDateString('bs-BA', { day: 'numeric', month: 'long', year: 'numeric' }).toUpperCase()}
                                </div>
                                <div className="font-bold text-[var(--text-primary)] mb-2 group-hover:text-[var(--primary)] transition-colors line-clamp-2">{event.title}</div>
                                <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    {event.location}
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-[var(--text-secondary)] text-sm">Nema najavljenih takmičenja.</p>
                    )}
                </div>

                <Link href="/kalendar" className="mt-8 flex items-center justify-center gap-2 text-sm font-bold text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors group">
                    VIDI SVA TAKMIČENJA
                    <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </Link>
            </div>

            {/* Sponsors Widget */}
            <div className="card p-8 lg:p-10 rounded-3xl bg-white/50">
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 rounded-xl bg-[var(--accent)] flex items-center justify-center text-white shadow-lg">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-bold text-[var(--text-primary)]">
                        Sponzori
                    </h3>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    {sponsors.length > 0 ? (
                        sponsors.map((sponsor) => (
                            <a
                                key={sponsor.id}
                                href={sponsor.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="aspect-square rounded-2xl bg-[var(--background-alt)] flex items-center justify-center group hover:shadow-md transition-all p-4"
                                title={sponsor.name}
                            >
                                {sponsor.logo ? (
                                    <img src={sponsor.logo} alt={sponsor.name} className="max-w-full max-h-full object-contain transition-all group-hover:scale-110" />
                                ) : (
                                    <span className="text-xs font-bold text-[var(--text-muted)] group-hover:text-[var(--primary)] transition-colors text-center">{sponsor.name}</span>
                                )}
                            </a>
                        ))
                    ) : (
                        <p className="col-span-2 text-[var(--text-secondary)] text-sm text-center">Postanite naš sponzor.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

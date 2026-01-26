
import { getCompetitions } from "@/actions/competitions";
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Kalendar Takmičenja | Judo Klub Željezničar",
    description: "Raspored nadolazećih judo takmičenja i turnira.",
};

export default async function CalendarPage() {
    const competitions = await getCompetitions();

    // Sort competitions by date (ascending for upcoming, descending for past)
    const sortedCompetitions = [...competitions].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    const now = new Date();
    // Normalize now to start of day for accurate comparison
    now.setHours(0, 0, 0, 0);

    const upcoming = sortedCompetitions.filter(c => new Date(c.date) >= now);
    const past = sortedCompetitions.filter(c => new Date(c.date) < now).reverse(); // Show most recent past first

    return (
        <div className="min-h-screen bg-[var(--background)]">
            <section className="bg-[var(--primary)] text-white py-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10" />
                <div className="container relative z-10 text-center">
                    <span className="tag mb-4 bg-white/20 backdrop-blur-md">Raspored</span>
                    <h1 className="text-4xl lg:text-5xl font-bold mb-6">Kalendar Takmičenja</h1>
                    <p className="text-xl opacity-90 max-w-2xl mx-auto">
                        Pregled svih planiranih turnira i takmičenja za takmičare Judo Kluba Željezničar.
                    </p>
                </div>
            </section>

            <div className="container py-12 lg:py-16">
                <div className="max-w-4xl mx-auto space-y-16">

                    {/* Upcoming Events */}
                    <div>
                        <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-8 flex items-center gap-3">
                            <span className="w-1.5 h-8 bg-[var(--accent)] rounded-full"></span>
                            Nadolazeća Takmičenja
                        </h2>

                        {upcoming.length > 0 ? (
                            <div className="space-y-6">
                                {upcoming.map((comp) => (
                                    <div key={comp.id} className="card p-6 md:p-8 flex flex-col md:flex-row gap-6 md:items-center hover:border-[var(--primary)] transition-colors group animate-fade-in-up">
                                        {/* Date Box */}
                                        <div className="flex-shrink-0 flex flex-row md:flex-col items-center justify-center md:w-24 md:h-24 bg-[var(--background-alt)] rounded-2xl border border-[var(--border)] p-4 md:p-0 gap-3 md:gap-0">
                                            <span className="text-3xl font-bold text-[var(--primary)]">
                                                {new Date(comp.date).getDate()}
                                            </span>
                                            <span className="text-sm font-bold text-[var(--text-secondary)] uppercase tracking-wider">
                                                {new Date(comp.date).toLocaleDateString('bs-BA', { month: 'short' })}
                                            </span>
                                            <span className="md:hidden text-sm font-bold text-[var(--text-muted)]">
                                                {new Date(comp.date).getFullYear()}
                                            </span>
                                        </div>

                                        {/* Content */}
                                        <div className="flex-grow">
                                            <div className="flex flex-wrap items-center gap-3 mb-2">
                                                <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700">
                                                    Nadolazeće
                                                </span>
                                                <span className="flex items-center gap-1 text-sm text-[var(--text-secondary)] font-medium">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    </svg>
                                                    {comp.location}
                                                </span>
                                            </div>
                                            <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2 group-hover:text-[var(--primary)] transition-colors">
                                                {comp.title}
                                            </h3>
                                            <p className="text-[var(--text-secondary)] mb-4 md:mb-0">
                                                {comp.description}
                                            </p>
                                        </div>

                                        {/* Action */}
                                        {comp.registrationLink && (
                                            <div className="flex-shrink-0">
                                                <a
                                                    href={comp.registrationLink}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="btn-primary w-full md:w-auto text-sm"
                                                >
                                                    Prijava
                                                </a>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="p-12 text-center bg-[var(--surface)] border-2 border-dashed border-[var(--border)] rounded-2xl">
                                <span className="text-4xl mb-4 block">📅</span>
                                <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">Nema zakazanih takmičenja</h3>
                                <p className="text-[var(--text-secondary)]">Trenutno nemamo informacija o nadolazećim turnirima. Provjerite uskoro ponovo.</p>
                            </div>
                        )}
                    </div>

                    {/* Past Events */}
                    {past.length > 0 && (
                        <div>
                            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-8 flex items-center gap-3 opacity-60">
                                <span className="w-1.5 h-8 bg-[var(--text-muted)] rounded-full"></span>
                                Prošla Takmičenja
                            </h2>

                            <div className="space-y-6 opacity-70 hover:opacity-100 transition-opacity duration-300">
                                {past.map((comp) => (
                                    <div key={comp.id} className="card p-6 flex flex-col md:flex-row gap-6 md:items-center bg-[var(--background-alt)]">
                                        <div className="flex-shrink-0 w-16 text-center md:text-left">
                                            <div className="text-sm font-bold text-[var(--text-muted)]">
                                                {new Date(comp.date).toLocaleDateString('bs-BA', { day: 'numeric', month: 'short' })}
                                            </div>
                                            <div className="text-xs text-[var(--text-muted)]">
                                                {new Date(comp.date).getFullYear()}
                                            </div>
                                        </div>

                                        <div className="flex-grow">
                                            <h3 className="text-lg font-bold text-[var(--text-secondary)] mb-1">
                                                {comp.title}
                                            </h3>
                                            <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
                                                <span>{comp.location}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}

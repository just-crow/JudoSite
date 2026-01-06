import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Uspjesi i Medalje | Judo Klub Željezničar",
    description: "Pregled najznačajnijih rezultata i medalja naših takmičara.",
};

export default function UspjesiPage() {
    const years = [2025, 2024, 2023, 2022];

    return (
        <div className="section">
            <div className="container">
                <div className="text-center mb-16 animate-fade-in-up">
                    <h1 className="text-4xl font-bold text-white mb-4">Uspjesi i Medalje</h1>
                    <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
                        Kontinuitet vrhunskih rezultata na domaćoj i međunarodnoj sceni dokaz je našeg kvalitetnog rada.
                    </p>
                </div>

                {/* Latest Achievements Highlight */}
                <div className="grid md:grid-cols-3 gap-6 mb-16 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                    <div className="card p-8 bg-gradient-to-br from-[#FFD700]/10 to-transparent border-[#FFD700]/20">
                        <div className="text-4xl font-bold text-[#FFD700] mb-2">150+</div>
                        <h3 className="text-white font-bold mb-1">Zlatnih Medalja</h3>
                        <p className="text-[var(--text-secondary)] text-sm">U protekloj sezoni</p>
                    </div>
                    <div className="card p-8 bg-gradient-to-br from-[#C0C0C0]/10 to-transparent border-[#C0C0C0]/20">
                        <div className="text-4xl font-bold text-[#C0C0C0] mb-2">85+</div>
                        <h3 className="text-white font-bold mb-1">Državnih Prvaka</h3>
                        <p className="text-[var(--text-secondary)] text-sm">Svih uzrasnih kategorija</p>
                    </div>
                    <div className="card p-8 bg-gradient-to-br from-[#CD7F32]/10 to-transparent border-[#CD7F32]/20">
                        <div className="text-4xl font-bold text-[#CD7F32] mb-2">12</div>
                        <h3 className="text-white font-bold mb-1">Balkanskih Medalja</h3>
                        <p className="text-[var(--text-secondary)] text-sm">Međunarodni uspjesi</p>
                    </div>
                </div>

                {/* Timeline of Achievements */}
                <div className="space-y-12">
                    {years.map((year, index) => (
                        <div key={year} className="relative animate-fade-in-up" style={{ animationDelay: `${(index + 2) * 100}ms` }}>
                            <div className="flex items-center gap-4 mb-6">
                                <h2 className="text-5xl font-bold text-white/10">{year}</h2>
                                <div className="h-px bg-[var(--border)] flex-grow"></div>
                            </div>

                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {/* Mock Data Items */}
                                <div className="card p-6 border-l-4 border-l-[var(--primary)] hover:translate-x-2 transition-transform">
                                    <div className="text-sm text-[var(--primary)] font-bold mb-1">Državno Prvenstvo</div>
                                    <h3 className="font-bold text-white mb-2">Najuspješnija ekipa Seniora</h3>
                                    <p className="text-sm text-[var(--text-secondary)]">Sarajevo, Mart {year}</p>
                                </div>
                                <div className="card p-6 border-l-4 border-l-[var(--secondary)] hover:translate-x-2 transition-transform">
                                    <div className="text-sm text-[var(--secondary)] font-bold mb-1">Evropski Kup</div>
                                    <h3 className="font-bold text-white mb-2">Bronzana medalja - Larisa Cerić</h3>
                                    <p className="text-sm text-[var(--text-secondary)]">Dubrovnik, April {year}</p>
                                </div>
                                <div className="card p-6 border-l-4 border-l-[var(--accent)] hover:translate-x-2 transition-transform">
                                    <div className="text-sm text-[var(--accent)] font-bold mb-1">Balkansko Prvenstvo</div>
                                    <h3 className="font-bold text-white mb-2">3 Zlata, 2 Srebra</h3>
                                    <p className="text-sm text-[var(--text-secondary)]">Skoplje, Maj {year}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <p className="text-[var(--text-muted)] italic">
                        * Prikazani su samo najznačajniji rezultati. Za kompletnu arhivu, posjetite naše prostorije.
                    </p>
                </div>
            </div>
        </div>
    );
}

import { Metadata } from 'next';
import { getSponsors } from "@/actions/sponsors";

export const metadata: Metadata = {
    title: "Sponzori | Judo Klub Željezničar",
    description: "Zahvaljujemo se našim sponzorima i prijateljima kluba na podršci.",
};

export default async function SponzoriPage() {
    const sponsors = await getSponsors();

    return (
        <div className="section">
            <div className="container">
                <div className="text-center mb-16 animate-fade-in-up">
                    <h1 className="text-4xl font-bold text-white mb-4">Sponzori i Prijatelji Kluba</h1>
                    <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
                        Veliko hvala našim partnerima koji podržavaju rad kluba i razvoj mladih sportista.
                    </p>
                </div>

                {sponsors.length === 0 ? (
                    <div className="text-center py-20 text-[var(--text-muted)] border-2 border-dashed border-[var(--border)] rounded-2xl">
                        Trenutno nemamo prikazanih sponzora. Ako želite podržati klub, kontaktirajte nas.
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {sponsors.map((sponsor, index) => (
                            <a
                                key={sponsor.id}
                                href={sponsor.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="card p-8 flex flex-col items-center justify-center hover:border-[var(--primary)] transition-all group min-h-[200px] animate-fade-in-up"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                {sponsor.logo ? (
                                    <img
                                        src={sponsor.logo}
                                        alt={sponsor.name}
                                        className="h-24 w-auto object-contain mb-6 filter grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-110"
                                    />
                                ) : (
                                    <div className="h-24 w-24 rounded-full bg-[var(--background)] flex items-center justify-center mb-6">
                                        <span className="text-2xl font-bold text-[var(--muted)] group-hover:text-[var(--primary)]">
                                            {sponsor.name.charAt(0)}
                                        </span>
                                    </div>
                                )}
                                <h3 className="text-lg font-bold text-[var(--text-primary)] group-hover:text-white transition-colors text-center">
                                    {sponsor.name}
                                </h3>
                                <span className="mt-2 text-xs font-bold text-[var(--primary)] opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all">
                                    Posjeti web stranicu →
                                </span>
                            </a>
                        ))}
                    </div>
                )}

                {/* Call to Action */}
                <div className="mt-24 text-center animate-fade-in-up" style={{ animationDelay: '500ms' }}>
                    <div className="card p-12 relative overflow-hidden">
                        <div className="relative z-10">
                            <h2 className="text-3xl font-bold text-white mb-4">Postanite naš Sponzor</h2>
                            <p className="text-[var(--text-secondary)] mb-8 max-w-xl mx-auto">
                                Želite podržati razvoj sporta i biti dio naše pobjedničke priče? Kontaktirajte nas i saznajte više o mogućnostima saradnje.
                            </p>
                            <a href="/kontakt" className="btn-primary inline-flex items-center gap-2">
                                Kontaktirajte nas
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </a>
                        </div>
                        {/* Decorative background */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--primary)]/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[var(--secondary)]/10 rounded-full blur-3xl -ml-32 -mb-32"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

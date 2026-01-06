import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Naš Dojo | Judo Klub Željezničar",
    description: "Pogledajte gdje treniraju naši šampioni. Vrhunski uslovi za trening u centru Sarajeva.",
};

export default function DojoPage() {
    return (
        <div className="section">
            <div className="container">
                <div className="text-center mb-16 animate-fade-in-up">
                    <h1 className="text-4xl font-bold text-white mb-4">Naš Dojo</h1>
                    <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
                        Mjesto gdje teče znoj, grade se karakteri i stvaraju pobjednici.
                    </p>
                </div>

                {/* Main Feature */}
                <div className="card overflow-hidden mb-12 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                    <div className="grid md:grid-cols-2">
                        <div className="h-64 md:h-auto bg-[var(--background-alt)] flex items-center justify-center">
                            <span className="text-[var(--text-muted)] text-xl">[Slika Velike Sale]</span>
                        </div>
                        <div className="p-8 md:p-12 flex flex-col justify-center">
                            <h2 className="text-2xl font-bold text-white mb-4">Velika Sala</h2>
                            <p className="text-[var(--text-secondary)] mb-6">
                                Naša glavna sala prostire se na preko 200 kvadratnih metara i opremljena je vrhunskim tatami podlogama sigurnim za sve uzraste.
                                Klimatizovan prostor sa modernim sistemom ventilacije osigurava svjež vazduh tokom cijelog treninga.
                            </p>
                            <ul className="space-y-3">
                                {[
                                    '200m² tatami površine',
                                    'Zaštitne strunjače na zidovima',
                                    'Moderna ventilacija i grijanje',
                                    'Video nadzor za sigurnost'
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-[var(--text-primary)]">
                                        <svg className="w-5 h-5 text-[var(--secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Additional Facilities */}
                <div className="grid md:grid-cols-3 gap-8 mb-16">
                    <div className="card p-6 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                        <div className="h-40 bg-[var(--background)] rounded-lg mb-4 flex items-center justify-center">
                            <span className="text-[var(--text-muted)]">[Teretana]</span>
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">Mini Teretana</h3>
                        <p className="text-[var(--text-secondary)] text-sm">
                            Opremljena tegovima, girjama i spravama za funkcionalni trening snage i kondicije.
                        </p>
                    </div>
                    <div className="card p-6 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
                        <div className="h-40 bg-[var(--background)] rounded-lg mb-4 flex items-center justify-center">
                            <span className="text-[var(--text-muted)]">[Svlačionice]</span>
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">Svlačionice</h3>
                        <p className="text-[var(--text-secondary)] text-sm">
                            Odvojene muške i ženske svlačionice sa tuševima i ormarićima za lične stvari.
                        </p>
                    </div>
                    <div className="card p-6 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
                        <div className="h-40 bg-[var(--background)] rounded-lg mb-4 flex items-center justify-center">
                            <span className="text-[var(--text-muted)]">[Čekaonica]</span>
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">Kutak za Roditelje</h3>
                        <p className="text-[var(--text-secondary)] text-sm">
                            Ugodan prostor gdje roditelji mogu sačekati djecu uz kafu i besplatan Wi-Fi.
                        </p>
                    </div>
                </div>

                {/* Location Map */}
                <div className="card p-6 animate-fade-in-up" style={{ animationDelay: '500ms' }}>
                    <h2 className="text-xl font-bold text-white mb-6">Gdje se nalazimo?</h2>
                    <div className="h-96 bg-[var(--background)] rounded-xl flex items-center justify-center border border-[var(--border)]">
                        <span className="text-[var(--text-muted)]">[Interactive Google Map here]</span>
                    </div>
                    <p className="mt-4 text-[var(--text-secondary)] text-center">
                        Ulica Zmaja od Bosne 123, 71000 Sarajevo (Glavni ulaz)
                    </p>
                </div>
            </div>
        </div>
    );
}

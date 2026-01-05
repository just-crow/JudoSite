import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Članstvo | Judo Klub Sarajevo",
    description: "Postanite član Judo Kluba Sarajevo. Informacije o članarini i beneficijama.",
};

const membershipTiers = [
    {
        name: "Standardno",
        price: "30",
        period: "mjesečno",
        features: [
            "Pristup svim treninzima",
            "Korištenje opreme kluba",
            "Učešće na internim takmičenjima",
            "Članarina za savez",
        ],
        highlighted: false,
    },
    {
        name: "Premium",
        price: "50",
        period: "mjesečno",
        features: [
            "Sve iz Standardnog paketa",
            "Individualni treninzi (2x mjesečno)",
            "Prioritet pri upisu na kampove",
            "Popust na opremu",
            "Pristup video materijalima",
        ],
        highlighted: true,
    },
    {
        name: "Porodično",
        price: "80",
        period: "mjesečno",
        features: [
            "Do 3 člana porodice",
            "Sve beneficije Premium paketa",
            "Porodični popust 20%",
            "Fleksibilni termini",
        ],
        highlighted: false,
    },
];

const benefits = [
    {
        title: "Profesionalni treninzi",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        icon: "🥋",
    },
    {
        title: "Moderna oprema",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        icon: "🏋️",
    },
    {
        title: "Zajednica",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        icon: "🤝",
    },
    {
        title: "Takmičenja",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        icon: "🏆",
    },
];

export default function ClanstvoPage() {
    return (
        <>
            {/* Hero */}
            <section className="relative py-20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)] via-[var(--primary-dark)] to-[var(--background)]"></div>
                <div className="container relative z-10 text-center">
                    <span className="tag mb-4">Članstvo</span>
                    <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                        Postani dio naše porodice
                    </h1>
                    <p className="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pridruži se stotinama članova koji uživaju u beneficijama članstva.
                    </p>
                </div>
            </section>

            {/* Pricing Tiers */}
            <section className="section">
                <div className="container">
                    <div className="grid md:grid-cols-3 gap-6">
                        {membershipTiers.map((tier, index) => (
                            <div
                                key={index}
                                className={`card p-8 relative overflow-hidden ${tier.highlighted ? "border-[var(--secondary)] border-2" : ""
                                    }`}
                            >
                                {tier.highlighted && (
                                    <div className="absolute top-0 right-0 bg-[var(--secondary)] text-[var(--primary-dark)] text-xs font-bold px-4 py-1 rounded-bl-lg">
                                        Najpopularniji
                                    </div>
                                )}
                                <h3 className="text-xl font-bold text-white mb-2">{tier.name}</h3>
                                <div className="flex items-baseline gap-1 mb-6">
                                    <span className="text-4xl font-bold gradient-text">{tier.price}</span>
                                    <span className="text-[var(--text-secondary)]">KM/{tier.period}</span>
                                </div>
                                <ul className="space-y-3 mb-8">
                                    {tier.features.map((feature, i) => (
                                        <li key={i} className="flex items-start gap-3 text-[var(--text-secondary)]">
                                            <svg className="w-5 h-5 text-[var(--secondary)] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                                <Link
                                    href="/kontakt"
                                    className={`block text-center py-3 rounded-lg font-semibold transition-colors ${tier.highlighted
                                            ? "btn-primary"
                                            : "btn-secondary"
                                        }`}
                                >
                                    Odaberi paket
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Benefits */}
            <section className="section pt-0">
                <div className="container">
                    <h2 className="text-3xl font-bold text-white text-center mb-12">
                        Beneficije članstva
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {benefits.map((benefit, index) => (
                            <div key={index} className="card p-6 text-center">
                                <span className="text-4xl mb-4 block">{benefit.icon}</span>
                                <h3 className="text-lg font-bold text-white mb-2">{benefit.title}</h3>
                                <p className="text-[var(--text-secondary)] text-sm">{benefit.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="section pt-0">
                <div className="container max-w-3xl">
                    <h2 className="text-3xl font-bold text-white text-center mb-12">
                        Česta pitanja
                    </h2>
                    <div className="space-y-4">
                        {[
                            {
                                q: "Kako se mogu učlaniti?",
                                a: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Kontaktirajte nas putem kontakt forme ili dođite lično u naš dojo.",
                            },
                            {
                                q: "Da li je potrebno iskustvo?",
                                a: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ne, primamo članove svih nivoa iskustva.",
                            },
                            {
                                q: "Koji su termini treninga?",
                                a: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Treninzi se održavaju svakog dana, provjerite raspored na stranici Akademija.",
                            },
                            {
                                q: "Da li mogu probati prije učlanjenja?",
                                a: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Da, nudimo besplatan probni trening.",
                            },
                        ].map((faq, i) => (
                            <div key={i} className="card p-6">
                                <h3 className="text-lg font-bold text-white mb-2">{faq.q}</h3>
                                <p className="text-[var(--text-secondary)]">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="section pt-0">
                <div className="container">
                    <div className="card p-12 bg-gradient-to-r from-[var(--secondary)] to-[var(--secondary-light)] text-center">
                        <h2 className="text-3xl font-bold text-[var(--primary-dark)] mb-4">
                            Spreman/na za prvi korak?
                        </h2>
                        <p className="text-[var(--primary-dark)]/80 mb-8 max-w-xl mx-auto">
                            Lorem ipsum dolor sit amet. Kontaktirajte nas za više informacija ili dođite na besplatan probni trening.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link href="/kontakt" className="inline-block bg-[var(--primary-dark)] text-white font-semibold py-4 px-8 rounded-lg hover:bg-[var(--primary)] transition-colors">
                                Kontaktiraj nas
                            </Link>
                            <Link href="/akademija" className="inline-block bg-white/20 text-[var(--primary-dark)] font-semibold py-4 px-8 rounded-lg hover:bg-white/30 transition-colors">
                                Saznaj više
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

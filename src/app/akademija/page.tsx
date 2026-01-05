import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Akademija | Judo Klub Sarajevo",
    description: "Naša judo akademija nudi programe za sve uzraste. Saznajte zašto smo najbolja škola juda u BiH.",
};

const programs = [
    {
        title: "Mini Judo",
        age: "4-6 godina",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Uvod u judo kroz igru i zabavu.",
        schedule: "Ponedjeljak, Srijeda 17:00-18:00",
        icon: "🥋",
    },
    {
        title: "Početnici",
        age: "7-10 godina",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Osnove juda i razvoj motoričkih sposobnosti.",
        schedule: "Ponedjeljak, Srijeda, Petak 17:00-18:30",
        icon: "⭐",
    },
    {
        title: "Kadeti",
        age: "11-14 godina",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Napredne tehnike i pripreme za takmičenja.",
        schedule: "Utorak, Četvrtak, Subota 17:00-19:00",
        icon: "🏅",
    },
    {
        title: "Juniori",
        age: "15-17 godina",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Intenzivni treninzi i takmičarski program.",
        schedule: "Ponedjeljak - Petak 18:00-20:00",
        icon: "🎯",
    },
    {
        title: "Seniori",
        age: "18+ godina",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Profesionalni treninzi za odrasle.",
        schedule: "Ponedjeljak - Petak 19:00-21:00",
        icon: "🏆",
    },
    {
        title: "Rekreativci",
        age: "Svi uzrasti",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Judo za zdravlje i kondiciju.",
        schedule: "Utorak, Četvrtak 20:00-21:30",
        icon: "💪",
    },
];

const benefits = [
    {
        title: "Stručni treneri",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        icon: "👨‍🏫",
    },
    {
        title: "Moderni dojo",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        icon: "🏛️",
    },
    {
        title: "Takmičenja",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        icon: "🎖️",
    },
    {
        title: "Zajednica",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        icon: "🤝",
    },
];

export default function AkademijaPage() {
    return (
        <>
            {/* Hero Section */}
            <section className="relative py-20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)] via-[var(--primary-dark)] to-[var(--background)]"></div>
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-20 left-20 w-64 h-64 bg-[var(--secondary)] rounded-full blur-3xl"></div>
                    <div className="absolute bottom-20 right-20 w-80 h-80 bg-[var(--secondary)] rounded-full blur-3xl"></div>
                </div>
                <div className="container relative z-10">
                    <div className="max-w-3xl">
                        <span className="tag mb-4">Akademija</span>
                        <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                            Započni svoje judo putovanje
                        </h1>
                        <p className="text-xl text-[var(--text-secondary)] mb-8">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Naša akademija nudi programe za sve uzraste i nivoe iskustva.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link href="/akademija/upis" className="btn-primary">
                                Upiši se sada
                            </Link>
                            <Link href="/kontakt" className="btn-secondary">
                                Kontaktiraj nas
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Benefits */}
            <section className="section">
                <div className="container">
                    <h2 className="text-3xl font-bold text-white text-center mb-12">
                        Zašto izabrati našu akademiju?
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

            {/* Programs */}
            <section className="section pt-0">
                <div className="container">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-white mb-4">Naši programi</h2>
                        <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Odaberite program koji vam odgovara.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {programs.map((program, index) => (
                            <div key={index} className="card p-6 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-20 h-20 bg-[var(--secondary)]/10 rounded-bl-full flex items-center justify-center">
                                    <span className="text-2xl">{program.icon}</span>
                                </div>
                                <span className="tag mb-4">{program.age}</span>
                                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[var(--secondary)] transition-colors">
                                    {program.title}
                                </h3>
                                <p className="text-[var(--text-secondary)] text-sm mb-4">
                                    {program.description}
                                </p>
                                <div className="flex items-center gap-2 text-[var(--text-muted)] text-sm">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    {program.schedule}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="section">
                <div className="container">
                    <div className="card p-12 bg-gradient-to-r from-[var(--secondary)] to-[var(--secondary-light)] text-center relative overflow-hidden">
                        <div className="absolute -left-20 -top-20 w-60 h-60 bg-white/10 rounded-full"></div>
                        <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-white/10 rounded-full"></div>
                        <div className="relative z-10">
                            <h2 className="text-3xl font-bold text-[var(--primary-dark)] mb-4">
                                Spreman/na za prvi korak?
                            </h2>
                            <p className="text-[var(--primary-dark)]/80 mb-8 max-w-xl mx-auto">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pridruži se našoj porodici danas!
                            </p>
                            <Link href="/akademija/upis" className="inline-block bg-[var(--primary-dark)] text-white font-semibold py-4 px-8 rounded-lg hover:bg-[var(--primary)] transition-colors">
                                Prijavi se za besplatan probni trening
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

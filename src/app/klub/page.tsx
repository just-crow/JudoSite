import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "O klubu | Judo Klub Sarajevo",
    description: "Saznajte više o Judo Klubu Sarajevo - historija, rukovodstvo, dojo i kontakt informacije.",
};

const leadership = [
    {
        name: "Sanin Mirvić",
        role: "Predsjednik kluba",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
        name: "Amina Hadžić",
        role: "Potpredsjednica",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
        name: "Edin Bašić",
        role: "Generalni sekretar",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
];

export default function KlubPage() {
    return (
        <>
            {/* Hero */}
            <section className="relative py-20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)] via-[var(--primary-dark)] to-[var(--background)]"></div>
                <div className="container relative z-10">
                    <div className="max-w-3xl">
                        <span className="tag mb-4">O nama</span>
                        <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                            Judo Klub Sarajevo
                        </h1>
                        <p className="text-xl text-[var(--text-secondary)]">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Od 1952. godine razvijamo judo kulturu i sportsku izvrsnost u Bosni i Hercegovini.
                        </p>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section className="section">
                <div className="container">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold text-white mb-6">Naša misija</h2>
                            <p className="text-[var(--text-secondary)] mb-4">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
                            </p>
                            <p className="text-[var(--text-secondary)] mb-4">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                            </p>
                            <p className="text-[var(--text-secondary)]">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </p>
                        </div>
                        <div className="relative h-80 rounded-2xl overflow-hidden bg-gradient-to-br from-[var(--surface)] to-[var(--surface-light)]">
                            <div className="absolute inset-0 flex items-center justify-center opacity-20">
                                <svg className="w-32 h-32 text-[var(--secondary)]" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
                                </svg>
                            </div>
                            <div className="absolute bottom-4 left-4 right-4 text-center text-[var(--text-muted)] text-sm">
                                [Placeholder za sliku kluba]
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Leadership */}
            <section className="section pt-0">
                <div className="container">
                    <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
                        <span className="w-1 h-8 bg-[var(--secondary)] rounded-full"></span>
                        Rukovodstvo
                    </h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {leadership.map((person, index) => (
                            <div key={index} className="card p-6 text-center">
                                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-[var(--secondary)] to-[var(--secondary-light)] flex items-center justify-center">
                                    <span className="text-2xl font-bold text-[var(--primary-dark)]">
                                        {person.name.split(' ').map(n => n[0]).join('')}
                                    </span>
                                </div>
                                <h3 className="text-lg font-bold text-white">{person.name}</h3>
                                <p className="text-[var(--secondary)] font-medium text-sm mb-2">{person.role}</p>
                                <p className="text-[var(--text-secondary)] text-sm">{person.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Dojo */}
            <section className="section pt-0">
                <div className="container">
                    <div className="card p-8 lg:p-12">
                        <div className="grid lg:grid-cols-2 gap-8 items-center">
                            <div>
                                <h2 className="text-3xl font-bold text-white mb-4">Naš Dojo</h2>
                                <p className="text-[var(--text-secondary)] mb-6">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Naš dojo je opremljen najmodernijom opremom i prostire se na 500 kvadratnih metara.
                                </p>
                                <ul className="space-y-3">
                                    {["300m² tatami prostora", "Fitness sala", "Svlačionice sa tuševima", "Parking", "Pristup za invalidska kolica"].map((feature, i) => (
                                        <li key={i} className="flex items-center gap-3 text-[var(--text-secondary)]">
                                            <svg className="w-5 h-5 text-[var(--secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="relative h-64 rounded-xl overflow-hidden bg-gradient-to-br from-[var(--surface-light)] to-[var(--surface)]">
                                <div className="absolute inset-0 flex items-center justify-center opacity-20">
                                    <span className="text-8xl">🥋</span>
                                </div>
                                <div className="absolute bottom-4 left-4 right-4 text-center text-[var(--text-muted)] text-sm">
                                    [Placeholder za sliku doja]
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Quick Links */}
            <section className="section pt-0">
                <div className="container">
                    <div className="grid md:grid-cols-3 gap-6">
                        <Link href="/historija" className="card p-6 group">
                            <h3 className="text-lg font-bold text-white group-hover:text-[var(--secondary)] transition-colors mb-2">
                                Historija kluba →
                            </h3>
                            <p className="text-[var(--text-secondary)] text-sm">
                                Saznajte više o našoj bogatoj historiji od 1952. godine.
                            </p>
                        </Link>
                        <Link href="/klub/sponzori" className="card p-6 group">
                            <h3 className="text-lg font-bold text-white group-hover:text-[var(--secondary)] transition-colors mb-2">
                                Sponzori →
                            </h3>
                            <p className="text-[var(--text-secondary)] text-sm">
                                Naši partneri i sponzori koji podržavaju naš rad.
                            </p>
                        </Link>
                        <Link href="/kontakt" className="card p-6 group">
                            <h3 className="text-lg font-bold text-white group-hover:text-[var(--secondary)] transition-colors mb-2">
                                Kontakt →
                            </h3>
                            <p className="text-[var(--text-secondary)] text-sm">
                                Kontaktirajte nas za više informacija.
                            </p>
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}

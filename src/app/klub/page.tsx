import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "O klubu | Judo Klub Željezničar",
    description: "Saznajte više o Judo Klubu Željezničar - historija, dojo i kontakt informacije.",
};



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
                            Judo Klub Željezničar
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
                            <img
                                src="/images/486677264_620710237636162_8126068584696942124_n.jpg"
                                alt="Judo Klub Željezničar"
                                className="w-full h-full object-cover"
                            />
                        </div>
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

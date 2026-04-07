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
                        <p className="text-xl text-[#e0e8f0]">
                            Osnovan 1952. godine u Sarajevu, Judo Klub Željezničar je jedno od najstarijih i najtrofejnijih judo kolektiva u Bosni i Hercegovini. Preko sedam decenija njegujemo duh majstora Kano Jigoro-a, odgajajući generacije sportista, trenera i ljude vrijedne poštovanja.
                        </p>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section className="section">
                <div className="container">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-6">Naša misija</h2>
                            <p className="text-[var(--text-secondary)] mb-4">
                                Judo Klub Željezničar već generacijama gradi šampione, ne samo na strunjači već i u životu. Naš klub okuplja takmičare svih uzrasta, od najmlađih pionira do seniora, pružajući im stručno vođenje, disciplinu i timski duh.
                            </p>
                            <p className="text-[var(--text-secondary)] mb-4">
                                Kroz redovne treninge, seminare sa međunarodnim trenerima i učešće na domaćim i evropskim takmičenjima, naši sportisti stiču iskustvo koje ih razlikuje. Poseban ponos predstavljaju državni prvaci i reprezentativci koji su ponikli u našem klubu.
                            </p>
                            <p className="text-[var(--text-secondary)]">
                                Klub je otvoren za sve koji žele da nauče judo, unaprijede svoju tehniku ili se pripreme za takmičarski nivo. Bez obzira na godine i predznanje, kod nas svako ima priliku da postane dio porodice Željezničar.
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
                                <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-4">Naš Dojo</h2>
                                <p className="text-[var(--text-secondary)] mb-6">
                                    Naš dojo se nalazi u srcu Sarajeva i pruža profesionalne uslove za sve uzraste. Prostrani tatami prostor, kvalitetna ventilacija i stručno vođenje čine svaki trening sigurnim i efikasnim.
                                </p>
                                <ul className="space-y-3">
                                    {["300m² tatami prostora", "Prostrana glavna sala", "Odvojene svlačionice", "Parking u blizini"].map((feature, i) => (
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
                            <h3 className="text-lg font-bold text-[var(--text-primary)] group-hover:text-[var(--secondary)] transition-colors mb-2">
                                Historija kluba →
                            </h3>
                            <p className="text-[var(--text-secondary)] text-sm">
                                Saznajte više o našoj bogatoj historiji od 1952. godine.
                            </p>
                        </Link>
                        <Link href="/klub/sponzori" className="card p-6 group">
                            <h3 className="text-lg font-bold text-[var(--text-primary)] group-hover:text-[var(--secondary)] transition-colors mb-2">
                                Sponzori →
                            </h3>
                            <p className="text-[var(--text-secondary)] text-sm">
                                Naši partneri i sponzori koji podržavaju naš rad.
                            </p>
                        </Link>
                        <Link href="/kontakt" className="card p-6 group">
                            <h3 className="text-lg font-bold text-[var(--text-primary)] group-hover:text-[var(--secondary)] transition-colors mb-2">
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

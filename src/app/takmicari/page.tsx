import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Takmičari | Judo Klub Sarajevo",
    description: "Upoznajte naše takmičare - seniore, juniore, kadete i naše trenere.",
};

const weightCategories = [
    "Sve kategorije",
    "-60kg",
    "-66kg",
    "-73kg",
    "-81kg",
    "-90kg",
    "-100kg",
    "+100kg",
];

const athletes = [
    {
        name: "Marko Petrović",
        category: "-73kg",
        rank: "1. Dan",
        achievements: "Državni prvak 2025, Bronza EP 2024",
        href: "/takmicari/marko-petrovic",
    },
    {
        name: "Adnan Hodžić",
        category: "-81kg",
        rank: "2. Dan",
        achievements: "Viceprvak BiH 2025",
        href: "/takmicari/adnan-hodzic",
    },
    {
        name: "Emir Begović",
        category: "-66kg",
        rank: "1. Dan",
        achievements: "Pobjednik Sarajevo Open 2025",
        href: "/takmicari/emir-begovic",
    },
    {
        name: "Amar Delić",
        category: "-90kg",
        rank: "2. Dan",
        achievements: "Reprezentativac BiH",
        href: "/takmicari/amar-delic",
    },
    {
        name: "Selma Mujić",
        category: "-57kg",
        rank: "1. Dan",
        achievements: "Državna prvakinja 2025",
        href: "/takmicari/selma-mujic",
    },
    {
        name: "Lejla Hasanović",
        category: "-63kg",
        rank: "1. Dan",
        achievements: "Bronza Balkansko prvenstvo 2024",
        href: "/takmicari/lejla-hasanovic",
    },
];

const coaches = [
    {
        name: "Slaviša Stojanović",
        role: "Glavni trener",
        rank: "5. Dan",
        experience: "20+ godina iskustva",
        href: "/takmicari/treneri/slavisa-stojanovic",
    },
    {
        name: "Mirza Halilović",
        role: "Trener juniora",
        rank: "4. Dan",
        experience: "15 godina iskustva",
        href: "/takmicari/treneri/mirza-halilovic",
    },
    {
        name: "Amela Kovačević",
        role: "Trenerka kadeta",
        rank: "3. Dan",
        experience: "10 godina iskustva",
        href: "/takmicari/treneri/amela-kovacevic",
    },
];

export default function TakmicariPage() {
    return (
        <div className="section">
            <div className="container">
                {/* Page Header */}
                <div className="mb-12">
                    <h1 className="text-4xl font-bold text-white mb-4">Naši takmičari</h1>
                    <p className="text-[var(--text-secondary)] max-w-2xl">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Upoznajte naše reprezentativce i buduće šampione.
                    </p>
                </div>

                {/* Weight Category Filter */}
                <div className="flex flex-wrap gap-2 mb-12">
                    {weightCategories.map((cat, index) => (
                        <button
                            key={cat}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${index === 0
                                    ? "bg-[var(--secondary)] text-[var(--primary-dark)]"
                                    : "bg-[var(--surface)] text-[var(--text-secondary)] hover:bg-[var(--surface-hover)] hover:text-white"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Athletes Grid */}
                <div className="mb-16">
                    <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                        <span className="w-1 h-8 bg-[var(--secondary)] rounded-full"></span>
                        Seniori
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {athletes.map((athlete, index) => (
                            <Link
                                key={index}
                                href={athlete.href}
                                className="card p-6 group"
                            >
                                {/* Avatar placeholder */}
                                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--surface)] flex items-center justify-center">
                                    <span className="text-3xl font-bold text-[var(--secondary)]">
                                        {athlete.name.split(' ').map(n => n[0]).join('')}
                                    </span>
                                </div>
                                <div className="text-center">
                                    <h3 className="text-lg font-bold text-white group-hover:text-[var(--secondary)] transition-colors">
                                        {athlete.name}
                                    </h3>
                                    <p className="text-[var(--secondary)] font-medium text-sm mb-2">
                                        {athlete.category} • {athlete.rank}
                                    </p>
                                    <p className="text-[var(--text-secondary)] text-sm">
                                        {athlete.achievements}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Coaches Section */}
                <div>
                    <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                        <span className="w-1 h-8 bg-[var(--secondary)] rounded-full"></span>
                        Treneri i Sensei
                    </h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {coaches.map((coach, index) => (
                            <Link
                                key={index}
                                href={coach.href}
                                className="card p-6 group relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 w-24 h-24 bg-[var(--secondary)]/10 rounded-bl-full"></div>
                                {/* Avatar placeholder */}
                                <div className="w-20 h-20 mb-4 rounded-full bg-gradient-to-br from-[var(--secondary)] to-[var(--secondary-light)] flex items-center justify-center">
                                    <span className="text-2xl font-bold text-[var(--primary-dark)]">
                                        {coach.name.split(' ').map(n => n[0]).join('')}
                                    </span>
                                </div>
                                <h3 className="text-lg font-bold text-white group-hover:text-[var(--secondary)] transition-colors">
                                    {coach.name}
                                </h3>
                                <p className="text-[var(--secondary)] font-medium text-sm mb-1">
                                    {coach.role}
                                </p>
                                <p className="text-[var(--text-secondary)] text-sm mb-1">
                                    {coach.rank}
                                </p>
                                <p className="text-[var(--text-muted)] text-sm">
                                    {coach.experience}
                                </p>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

import NewsCard from "@/components/NewsCard";
import Sidebar from "@/components/Sidebar";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Novosti | Judo Klub Sarajevo",
    description: "Najnovije vijesti, izvještaji sa takmičenja, intervjui i foto galerije Judo Kluba Sarajevo.",
};

const categories = [
    { label: "Sve", href: "/novosti", active: true },
    { label: "Najave", href: "/novosti/najave", active: false },
    { label: "Izvještaji", href: "/novosti/izvjestaji", active: false },
    { label: "Akademija", href: "/novosti/akademija", active: false },
    { label: "Intervjui", href: "/novosti/intervjui", active: false },
];

const newsArticles = [
    {
        title: "Naši takmičari osvojili 5 medalja na Evropskom prvenstvu",
        excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        category: "Takmičenja",
        date: "5. januar 2026.",
        href: "/novosti/evropsko-prvenstvo",
    },
    {
        title: "Slaviša Stojanović novi šef stručnog štaba Judo Kluba",
        excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation.",
        category: "Novosti",
        date: "3. januar 2026.",
        href: "/novosti/novi-trener",
    },
    {
        title: "Upisi u zimski semestar akademije su otvoreni",
        excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aute irure dolor in reprehenderit.",
        category: "Akademija",
        date: "1. januar 2026.",
        href: "/novosti/upisi-zima",
    },
    {
        title: "Održana sjednica Skupštine: Imenovano novo rukovodstvo Kluba",
        excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Excepteur sint occaecat cupidatat non proident.",
        category: "Klub",
        date: "26. decembar 2025.",
        href: "/novosti/skupstina",
    },
    {
        title: "FOTO: Juniori Judo Kluba osvojili Kup BiH",
        excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sunt in culpa qui officia deserunt mollit.",
        category: "Takmičenja",
        date: "20. decembar 2025.",
        href: "/novosti/juniori-kup",
    },
    {
        title: "Intervju: Sanin Mirvić o budućnosti kluba",
        excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. At vero eos et accusamus et iusto odio.",
        category: "Intervjui",
        date: "18. decembar 2025.",
        href: "/novosti/intervju-mirovic",
    },
    {
        title: "Pet mladih takmičara potpisalo ugovore sa reprezentacijom",
        excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam libero tempore, cum soluta nobis est eligendi.",
        category: "Akademija",
        date: "15. decembar 2025.",
        href: "/novosti/mladi-takmicari",
    },
    {
        title: "Peti kamp životnih šampiona pred nama",
        excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Temporibus autem quibusdam et aut officiis debitis.",
        category: "Najave",
        date: "12. decembar 2025.",
        href: "/novosti/kamp-sampiona",
    },
];

export default function NovostiPage() {
    return (
        <div className="section">
            <div className="container">
                {/* Page Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-white mb-4">Novosti</h1>
                    <p className="text-[var(--text-secondary)] max-w-2xl">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pratite sve aktuelnosti iz našeg kluba.
                    </p>
                </div>

                {/* Category Filter */}
                <div className="flex flex-wrap gap-2 mb-8">
                    {categories.map((cat) => (
                        <Link
                            key={cat.label}
                            href={cat.href}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${cat.active
                                    ? "bg-[var(--secondary)] text-[var(--primary-dark)]"
                                    : "bg-[var(--surface)] text-[var(--text-secondary)] hover:bg-[var(--surface-hover)] hover:text-white"
                                }`}
                        >
                            {cat.label}
                        </Link>
                    ))}
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* News Grid */}
                    <div className="lg:col-span-2">
                        <div className="grid md:grid-cols-2 gap-6">
                            {newsArticles.map((article, index) => (
                                <NewsCard
                                    key={index}
                                    title={article.title}
                                    excerpt={article.excerpt}
                                    category={article.category}
                                    date={article.date}
                                    href={article.href}
                                />
                            ))}
                        </div>

                        {/* Pagination */}
                        <div className="flex justify-center gap-2 mt-12">
                            <button className="w-10 h-10 rounded-lg bg-[var(--secondary)] text-[var(--primary-dark)] font-bold">
                                1
                            </button>
                            <button className="w-10 h-10 rounded-lg bg-[var(--surface)] text-white hover:bg-[var(--surface-hover)] transition-colors">
                                2
                            </button>
                            <button className="w-10 h-10 rounded-lg bg-[var(--surface)] text-white hover:bg-[var(--surface-hover)] transition-colors">
                                3
                            </button>
                            <span className="w-10 h-10 flex items-center justify-center text-[var(--text-muted)]">...</span>
                            <button className="w-10 h-10 rounded-lg bg-[var(--surface)] text-white hover:bg-[var(--surface-hover)] transition-colors">
                                12
                            </button>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div>
                        <Sidebar />
                    </div>
                </div>
            </div>
        </div>
    );
}

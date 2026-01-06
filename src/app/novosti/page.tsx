import NewsCard from "@/components/NewsCard";
import Sidebar from "@/components/Sidebar";
import Link from "next/link";
import { Metadata } from "next";
import { getNews } from "@/actions/news";

export const metadata: Metadata = {
    title: "Novosti | Judo Klub Željezničar",
    description: "Najnovije vijesti, izvještaji sa takmičenja, intervjui i foto galerije Judo Kluba Željezničar.",
};

const categories = [
    { label: "Sve", href: "/novosti", active: true },
    { label: "Najave", href: "/novosti/najave", active: false },
    { label: "Izvještaji", href: "/novosti/izvjestaji", active: false },
    { label: "Akademija", href: "/novosti/akademija", active: false },
    { label: "Intervjui", href: "/novosti/intervjui", active: false },
];

export default async function NovostiPage() {
    const newsArticles = await getNews();

    return (
        <div className="section">
            <div className="container">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* News Grid */}
                    <div className="lg:col-span-2">
                        <div className="grid md:grid-cols-2 gap-6">
                            {newsArticles.map((article) => (
                                <NewsCard
                                    key={article.id}
                                    title={article.title}
                                    excerpt={article.excerpt}
                                    category={article.tags?.[0] || "Novosti"}
                                    date={article.date}
                                    href={`/novosti/${article.id}`}
                                    image={article.image}
                                />
                            ))}
                        </div>

                        {newsArticles.length === 0 && (
                            <div className="p-12 text-center text-[var(--text-secondary)] bg-[var(--surface)] rounded-xl">
                                <p>Trenutno nema novosti.</p>
                            </div>
                        )}

                        {/* Pagination - Simplified for now */}
                        {newsArticles.length > 6 && (
                            <div className="flex justify-center gap-2 mt-12">
                                <button className="w-10 h-10 rounded-lg bg-[var(--secondary)] text-[var(--primary-dark)] font-bold">
                                    1
                                </button>
                                {/* Add real pagination logic later if needed */}
                            </div>
                        )}
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

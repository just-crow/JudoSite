import { getNews } from "@/actions/news";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export async function generateMetadata(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const news = await getNews();
    const article = news.find((n) => n.id === params.id);

    if (!article) {
        return {
            title: "Vijest nije pronađena | Judo Klub Željezničar",
        };
    }

    return {
        title: `${article.title} | Judo Klub Željezničar`,
        description: article.excerpt,
        openGraph: {
            images: [article.image || '/logo.png'],
        },
    };
}

export default async function NewsArticlePage(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const news = await getNews();
    const article = news.find((n) => n.id === params.id);

    if (!article) {
        return notFound();
    }

    return (
        <main className="min-h-screen bg-[var(--background)] pt-24 pb-20">
            <article className="container max-w-4xl mx-auto">
                {/* Back Link */}
                <Link
                    href="/novosti"
                    className="inline-flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--primary)] mb-8 transition-colors group"
                >
                    <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Povratak na novosti
                </Link>

                {/* Header */}
                <header className="mb-10 text-center">
                    <div className="flex items-center justify-center gap-4 text-sm text-[var(--text-muted)] mb-4">
                        <span className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {article.date}
                        </span>
                        {article.tags && article.tags.length > 0 && (
                            <>
                                <span>•</span>
                                <span className="text-[var(--primary)] font-bold uppercase tracking-wider">
                                    {article.tags[0]}
                                </span>
                            </>
                        )}
                    </div>
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--text-primary)] leading-tight mb-6">
                        {article.title}
                    </h1>
                </header>

                {/* Featured Image - Using Next.js Image for optimization */}
                <div className="relative w-full rounded-3xl overflow-hidden shadow-xl mb-10 group bg-[var(--surface-light)]">
                    {article.image ? (
                        <div className="relative w-full" style={{ aspectRatio: '16/9' }}>
                            <Image
                                src={article.image}
                                alt={article.title}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 896px"
                                className="object-cover"
                                priority
                                quality={85}
                            />
                        </div>
                    ) : (
                        <div className="w-full h-64 bg-[var(--surface)] flex items-center justify-center">
                            <span className="text-[var(--text-muted)]">Nema slike</span>
                        </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                </div>

                {/* Content */}
                <div className="prose prose-lg max-w-none prose-headings:text-[var(--text-primary)] prose-p:text-[var(--text-secondary)] prose-strong:text-[var(--text-primary)] p-2">
                    {article.content.split('\n').map((paragraph, index) => (
                        <p key={index} className="mb-4 text-lg leading-relaxed">
                            {paragraph}
                        </p>
                    ))}
                </div>

                {/* Share / Footer of article (Optional) */}
            </article>
        </main>
    );
}

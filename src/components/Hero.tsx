import Link from 'next/link';

interface HeroProps {
    featuredArticle?: {
        title: string;
        excerpt: string;
        image: string;
        category: string;
        href: string;
    };
    secondaryArticles?: Array<{
        title: string;
        image: string;
        category: string;
        href: string;
    }>;
}

export default function Hero({ featuredArticle, secondaryArticles }: HeroProps) {
    const defaultFeatured = {
        title: 'Naši takmičari osvojili 5 medalja na Evropskom prvenstvu',
        excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Naši mladi džudisti pokazali su izvanredne rezultate...',
        image: '/images/hero-judo.jpg',
        category: 'Takmičenja',
        href: '/novosti/evropsko-prvenstvo',
    };

    const defaultSecondary = [
        {
            title: 'Upisi u zimski semestar akademije su otvoreni',
            image: '/images/academy.jpg',
            category: 'Akademija',
            href: '/novosti/upisi-zima',
        },
        {
            title: 'Intervju: Trener godine o planovima za 2026.',
            image: '/images/coach.jpg',
            category: 'Intervjui',
            href: '/novosti/intervju-trener',
        },
    ];

    const featured = featuredArticle || defaultFeatured;
    const secondary = secondaryArticles || defaultSecondary;

    return (
        <section className="py-10 lg:py-14 bg-[var(--background-alt)]">
            <div className="container">
                <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
                    {/* Main featured article */}
                    <div className="lg:col-span-2">
                        <Link href={featured.href} className="group block relative rounded-2xl overflow-hidden h-[400px] lg:h-[500px] shadow-lg">
                            {/* Placeholder image background */}
                            <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)] to-[var(--primary-light)]">
                                <div className="absolute inset-0 flex items-center justify-center opacity-20">
                                    <svg className="w-48 h-48 text-white" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                                    </svg>
                                </div>
                            </div>
                            {/* Gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                            {/* Content */}
                            <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-10">
                                <span className="tag mb-4">{featured.category}</span>
                                <h2 className="text-2xl lg:text-4xl font-bold text-white mb-4 group-hover:text-[var(--accent)] transition-colors leading-tight">
                                    {featured.title}
                                </h2>
                                <p className="text-white/80 text-base lg:text-lg line-clamp-2 max-w-2xl">
                                    {featured.excerpt}
                                </p>
                            </div>
                            {/* Hover effect */}
                            <div className="absolute inset-0 border-4 border-transparent group-hover:border-[var(--accent)] rounded-2xl transition-all"></div>
                        </Link>
                    </div>

                    {/* Secondary articles */}
                    <div className="flex flex-col gap-6 lg:gap-8">
                        {secondary.map((article, index) => (
                            <Link
                                key={index}
                                href={article.href}
                                className="group relative rounded-2xl overflow-hidden h-[200px] lg:h-[234px] flex-1 shadow-lg"
                            >
                                {/* Placeholder image background */}
                                <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary-light)] to-[var(--primary)]">
                                    <div className="absolute inset-0 flex items-center justify-center opacity-20">
                                        <svg className="w-24 h-24 text-white" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                                        </svg>
                                    </div>
                                </div>
                                {/* Gradient overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                                {/* Content */}
                                <div className="absolute bottom-0 left-0 right-0 p-6">
                                    <span className="tag mb-2 text-[10px]">{article.category}</span>
                                    <h3 className="text-lg font-bold text-white group-hover:text-[var(--accent)] transition-colors line-clamp-2">
                                        {article.title}
                                    </h3>
                                </div>
                                {/* Hover effect */}
                                <div className="absolute inset-0 border-4 border-transparent group-hover:border-[var(--accent)] rounded-2xl transition-all"></div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

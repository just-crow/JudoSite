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
        <section className="py-20 lg:py-24 bg-gradient-to-b from-[var(--background-alt)] to-[var(--background)] relative overflow-hidden">
            {/* Decorative floating elements */}
            <div className="decorative-circle w-[600px] h-[600px] -top-64 -right-64 opacity-[0.04]" />
            <div className="decorative-circle-accent w-[400px] h-[400px] -bottom-48 -left-48 opacity-[0.05]" style={{ animationDelay: '2s' }} />

            <div className="container relative z-10">
                <div className="grid lg:grid-cols-3 gap-8 lg:gap-10">
                    {/* Main featured article */}
                    <div className="lg:col-span-2">
                        <Link href={featured.href} className="group block relative rounded-[32px] overflow-hidden h-[500px] lg:h-[600px] shadow-2xl hover:shadow-[0_20px_40px_rgba(24,72,143,0.3)] transition-all duration-700">
                            {/* Animated gradient background */}
                            <div className="absolute inset-0 image-placeholder">
                                <div className="absolute inset-0 flex items-center justify-center opacity-10">
                                    <svg className="w-48 h-48 text-white animate-pulse-subtle" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                                    </svg>
                                </div>
                            </div>

                            {/* Enhanced gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/5"></div>
                            <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                            {/* Content with MODERATE padding */}
                            <div className="absolute bottom-0 left-0 right-0 p-10 lg:p-14 transform group-hover:translate-y-[-8px] transition-transform duration-700">
                                <span className="tag mb-6 inline-block shadow-lg">{featured.category}</span>
                                <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6 group-hover:text-[var(--accent)] transition-colors leading-[1.1] text-shadow-lg tracking-tight">
                                    {featured.title}
                                </h2>
                                <p className="text-white/90 text-lg lg:text-xl line-clamp-2 max-w-3xl leading-relaxed mb-8 font-light">
                                    {featured.excerpt}
                                </p>
                                <div className="flex items-center gap-4 text-white opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-6 group-hover:translate-y-0">
                                    <span className="font-bold text-sm uppercase tracking-widest">Pročitaj cijelu vijest</span>
                                    <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:bg-[var(--accent)] transition-colors">
                                        <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* Glowing border effect */}
                            <div className="absolute inset-0 rounded-[32px] border-4 border-transparent group-hover:border-[var(--accent)] transition-all duration-700 group-hover:shadow-[inset_0_0_60px_rgba(212,167,39,0.3)]"></div>
                        </Link>
                    </div>

                    {/* Secondary articles */}
                    <div className="flex flex-col gap-6 lg:gap-8">
                        {secondary.map((article, index) => (
                            <Link
                                key={index}
                                href={article.href}
                                className="group relative rounded-[28px] overflow-hidden h-[240px] lg:h-[290px] flex-1 shadow-xl hover:shadow-2xl transition-all duration-700"
                            >
                                {/* Animated placeholder background */}
                                <div className="absolute inset-0 image-placeholder" style={{ animationDelay: `${index * 3}s` }}>
                                    <div className="absolute inset-0 flex items-center justify-center opacity-10">
                                        <svg className="w-32 h-32 text-white animate-pulse-subtle" fill="currentColor" viewBox="0 0 24 24" style={{ animationDelay: `${index * 0.5}s` }}>
                                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                                        </svg>
                                    </div>
                                </div>

                                {/* Gradient overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                                {/* Content with generous padding */}
                                <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-10 transform group-hover:translate-y-[-6px] transition-transform duration-500">
                                    <span className="tag mb-4 inline-block text-[10px] py-1 px-3 shadow-md">{article.category}</span>
                                    <h3 className="text-xl lg:text-2xl font-bold text-white group-hover:text-[var(--accent)] transition-colors line-clamp-2 text-shadow leading-tight tracking-tight">
                                        {article.title}
                                    </h3>
                                </div>

                                {/* Hover effect */}
                                <div className="absolute inset-0 border-4 border-transparent group-hover:border-[var(--accent)] rounded-[28px] transition-all duration-500 group-hover:shadow-[inset_0_0_50px_rgba(212,167,39,0.2)]"></div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

import Link from 'next/link';

interface NewsCardProps {
    title: string;
    excerpt?: string;
    image?: string;
    category: string;
    date: string;
    href: string;
    size?: 'small' | 'medium' | 'large';
}

export default function NewsCard({
    title,
    excerpt,
    image,
    category,
    date,
    href,
    size = 'medium',
}: NewsCardProps) {
    const isSmall = size === 'small';

    if (isSmall) {
        return (
            <Link href={href} className="group flex items-start gap-4 p-5 rounded-2xl hover:bg-white hover:shadow-lg transition-all duration-300 border border-transparent hover:border-[var(--border-light)] transform hover:-translate-y-1">
                <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 relative shadow-sm group-hover:shadow-md transition-shadow">
                    {image ? (
                        <img
                            src={image}
                            alt={title}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="absolute inset-0 image-placeholder">
                            <div className="absolute inset-0 flex items-center justify-center opacity-10">
                                <svg className="w-8 h-8 text-[var(--text-muted)]" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                                </svg>
                            </div>
                        </div>
                    )}
                </div>
                <div className="flex-1 min-w-0 py-1">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-[10px] font-bold text-[var(--primary)] uppercase tracking-wider">{category}</span>
                        <span className="text-[10px] text-[var(--text-muted)] flex items-center gap-1">
                            <span className="w-1 h-1 rounded-full bg-[var(--text-muted)]"></span>
                            {date}
                        </span>
                    </div>
                    <h4 className="text-sm font-bold text-[var(--text-primary)] group-hover:text-[var(--primary)] transition-colors line-clamp-2 leading-snug mb-0">
                        {title}
                    </h4>
                </div>
            </Link>
        );
    }

    return (
        <Link href={href} className="group card overflow-hidden hover-glow-ring block h-full mb-10">
            {/* Image section */}
            <div className={`relative overflow-hidden ${size === 'large' ? 'h-72 lg:h-80' : 'h-56 lg:h-64'} image-placeholder`}>
                {image ? (
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center opacity-15">
                        <svg className={`w-24 h-24 text-[var(--text-muted)] transition-transform duration-700 group-hover:scale-110`} fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z" />
                        </svg>
                    </div>
                )}
                <div className="absolute top-5 left-5">
                    <span className="tag shadow-lg backdrop-blur-md bg-[var(--primary)]/90">{category}</span>
                </div>
            </div>

            {/* Content section */}
            <div className="p-8 lg:p-10 flex flex-col h-full justify-between">
                <div>
                    <h3 className={`font-bold text-[var(--text-primary)] group-hover:text-[var(--primary)] transition-colors mb-4 line-clamp-2 leading-tight ${size === 'large' ? 'text-2xl' : 'text-xl'}`}>
                        {title}
                    </h3>
                    {excerpt && (
                        <p className="text-[var(--text-secondary)] text-base line-clamp-3 mb-6 leading-relaxed">
                            {excerpt}
                        </p>
                    )}
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-[var(--border-light)] mt-auto">
                    <span className="text-sm text-[var(--text-muted)] flex items-center gap-2 font-medium">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {date}
                    </span>
                    <span className="text-[var(--primary)] text-sm font-bold flex items-center gap-2 group-hover:gap-3 transition-all duration-300 uppercase tracking-wide">
                        Pročitaj
                        <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </span>
                </div>
            </div>
        </Link>
    );
}

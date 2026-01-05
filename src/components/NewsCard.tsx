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
    if (size === 'small') {
        return (
            <Link href={href} className="group flex gap-4 p-4 rounded-xl hover:bg-[var(--background-alt)] transition-colors">
                {/* Thumbnail */}
                <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-gradient-to-br from-[var(--primary)] to-[var(--primary-light)]">
                    <div className="w-full h-full flex items-center justify-center opacity-40">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
                        </svg>
                    </div>
                </div>
                {/* Content */}
                <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-bold text-[var(--primary)] uppercase tracking-wider">{category}</span>
                    <h4 className="text-sm font-semibold text-[var(--text-primary)] group-hover:text-[var(--primary)] transition-colors line-clamp-2 mt-1">
                        {title}
                    </h4>
                    <span className="text-xs text-[var(--text-muted)] mt-2 block">{date}</span>
                </div>
            </Link>
        );
    }

    return (
        <Link href={href} className="group card overflow-hidden">
            {/* Image */}
            <div className={`relative overflow-hidden ${size === 'large' ? 'h-56' : 'h-48'} bg-gradient-to-br from-[var(--primary)] to-[var(--primary-light)]`}>
                <div className="absolute inset-0 flex items-center justify-center opacity-30">
                    <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
                    </svg>
                </div>
                {/* Category tag */}
                <div className="absolute top-4 left-4">
                    <span className="tag">{category}</span>
                </div>
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            {/* Content */}
            <div className="p-6">
                <h3 className={`font-bold text-[var(--text-primary)] group-hover:text-[var(--primary)] transition-colors mb-3 line-clamp-2 ${size === 'large' ? 'text-xl' : 'text-base'}`}>
                    {title}
                </h3>
                {excerpt && (
                    <p className="text-[var(--text-secondary)] text-sm line-clamp-2 mb-4">
                        {excerpt}
                    </p>
                )}
                <div className="flex items-center justify-between">
                    <span className="text-xs text-[var(--text-muted)]">{date}</span>
                    <span className="text-[var(--primary)] text-sm font-semibold group-hover:underline">
                        Pročitaj više →
                    </span>
                </div>
            </div>
        </Link>
    );
}

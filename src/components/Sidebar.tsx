import Link from 'next/link';

interface UpcomingEvent {
    title: string;
    date: string;
    location: string;
    href: string;
}

interface SidebarProps {
    showMembershipCTA?: boolean;
    showUpcomingEvents?: boolean;
    showSponsors?: boolean;
    upcomingEvents?: UpcomingEvent[];
}

const defaultEvents: UpcomingEvent[] = [
    {
        title: 'Državno prvenstvo BiH',
        date: '15. januar 2026.',
        location: 'Sarajevo',
        href: '/novosti/drzavno-prvenstvo',
    },
    {
        title: 'Međunarodni turnir "Sarajevo Open"',
        date: '28. januar 2026.',
        location: 'Sarajevo',
        href: '/novosti/sarajevo-open',
    },
    {
        title: 'Kup BiH - Juniori',
        date: '10. februar 2026.',
        location: 'Banja Luka',
        href: '/novosti/kup-bih',
    },
];

export default function Sidebar({
    showMembershipCTA = true,
    showUpcomingEvents = true,
    showSponsors = true,
    upcomingEvents = defaultEvents,
}: SidebarProps) {
    return (
        <aside className="space-y-6">
            {/* Membership CTA */}
            {showMembershipCTA && (
                <div className="card p-6 bg-gradient-to-br from-[var(--secondary)] to-[var(--secondary-light)] relative overflow-hidden">
                    {/* Decorative pattern */}
                    <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full"></div>
                    <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/10 rounded-full"></div>

                    <div className="relative z-10">
                        <h3 className="text-xl font-bold text-[var(--primary-dark)] mb-2">
                            Postani član kluba!
                        </h3>
                        <p className="text-[var(--primary-dark)]/80 text-sm mb-4">
                            Pridruži se našoj porodici i započni svoje judo putovanje danas.
                        </p>
                        <Link href="/clanstvo" className="inline-block bg-[var(--primary-dark)] text-white font-semibold py-3 px-6 rounded-lg hover:bg-[var(--primary)] transition-colors">
                            Učlani se
                        </Link>
                    </div>
                </div>
            )}

            {/* Upcoming Events */}
            {showUpcomingEvents && (
                <div className="card p-6">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                        <svg className="w-5 h-5 text-[var(--secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Nadolazeća takmičenja
                    </h3>
                    <div className="space-y-4">
                        {upcomingEvents.map((event, index) => (
                            <Link
                                key={index}
                                href={event.href}
                                className="block p-4 rounded-lg bg-[var(--background)] hover:bg-[var(--surface-hover)] transition-colors border border-[var(--border)]"
                            >
                                <p className="text-xs text-[var(--secondary)] font-semibold mb-1">{event.date}</p>
                                <h4 className="text-white font-medium text-sm mb-1">{event.title}</h4>
                                <p className="text-[var(--text-muted)] text-xs flex items-center gap-1">
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    {event.location}
                                </p>
                            </Link>
                        ))}
                    </div>
                    <Link href="/novosti/najave" className="block text-center text-[var(--secondary)] text-sm font-medium mt-4 hover:underline">
                        Vidi sva takmičenja →
                    </Link>
                </div>
            )}

            {/* Sponsors */}
            {showSponsors && (
                <div className="card p-6">
                    <h3 className="text-lg font-bold text-white mb-4">Sponzori</h3>
                    <div className="grid grid-cols-2 gap-4">
                        {[1, 2, 3, 4].map((i) => (
                            <div
                                key={i}
                                className="h-16 rounded-lg bg-[var(--background)] border border-[var(--border)] flex items-center justify-center"
                            >
                                <span className="text-[var(--text-muted)] text-xs">Sponzor {i}</span>
                            </div>
                        ))}
                    </div>
                    <Link href="/klub/sponzori" className="block text-center text-[var(--secondary)] text-sm font-medium mt-4 hover:underline">
                        Postani sponzor →
                    </Link>
                </div>
            )}
        </aside>
    );
}

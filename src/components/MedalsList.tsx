import { getZeljeznicarMedals } from '@/lib/judomanager-standings';

export async function MedalsList({
    registrationLink,
    date,
}: {
    registrationLink?: string | null;
    date: string;
}) {
    if (!registrationLink?.includes('portal.judomanager.com/competition/')) {
        return null;
    }

    const externalId = registrationLink.split('/').pop()?.split('?')[0];
    if (!externalId) return null;

    const medals = await getZeljeznicarMedals(externalId, date);
    if (!medals || medals.length === 0) return null;

    return (
        <div className="mt-4 pt-4 border-t border-[var(--border)]">
            <h4 className="text-sm font-bold text-[var(--accent)] mb-3 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
                Osvojene Medalje ({medals.length})
            </h4>
            <div className="flex flex-wrap gap-2">
                {medals.map((m, idx) => (
                    <div 
                        key={`${m.id}-${idx}`}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium bg-[var(--surface)] border border-[var(--border)]"
                    >
                        <span className="text-lg leading-none">
                            {m.place === 1 ? '🥇' : m.place === 2 ? '🥈' : '🥉'}
                        </span>
                        <span className="text-[var(--text-primary)]">
                            {m.givenName} {m.familyName}
                        </span>
                        {m.category && (
                            <span className="text-[var(--text-muted)] text-xs ml-1">
                                {m.category}
                            </span>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
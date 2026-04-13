import { getZeljeznicarMedals } from '@/lib/judomanager-standings';
import { Trophy, Medal, Crown } from 'lucide-react';

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

    const sortedMedals = medals.sort((a, b) => a.place - b.place);

    return (
        <div className="mt-4 pt-4 border-t border-[var(--border)]">
            <h4 className="text-sm font-bold text-[var(--accent)] mb-3 flex items-center gap-2">
                <Trophy className="w-4 h-4 text-[var(--accent)]" />
                Osvojene Medalje ({medals.length})
            </h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mt-3">
                {sortedMedals.map((m, idx) => {
                    const isGold = m.place === 1;
                    const isSilver = m.place === 2;
                    const isBronze = m.place === 3;
                    
                    let bgClass = "bg-[var(--surface)]";
                    let borderClass = "border-[var(--border)]";
                    let iconColor = "text-[var(--text-muted)]";
                    let IconCmp = Medal;
                    
                    if (isGold) {
                        bgClass = "bg-[#FFF8DC]/80 dark:bg-[#DAA520]/10";
                        borderClass = "border-[#FFD700]/50 dark:border-[#DAA520]/30";
                        iconColor = "text-[#DAA520]";
                        IconCmp = Crown;
                    } else if (isSilver) {
                        bgClass = "bg-[#F8FAFC]/80 dark:bg-[#64748B]/10";
                        borderClass = "border-[#94A3B8]/50 dark:border-[#64748B]/30";
                        iconColor = "text-[#64748B]";
                    } else if (isBronze) {
                        bgClass = "bg-[#FFF1E6]/80 dark:bg-[#B87333]/10";
                        borderClass = "border-[#E6A87C]/50 dark:border-[#B87333]/30";
                        iconColor = "text-[#B87333]";
                    }

                    return (
                        <div 
                            key={`${m.id}-${idx}`}
                            className={`flex py-2 px-3 rounded-xl border ${bgClass} ${borderClass} items-center justify-between shadow-sm transition-all duration-200 hover:-translate-y-[1px] hover:shadow-md`}
                        >
                            <div className="flex items-center gap-2.5 overflow-hidden">
                                <div className={`flex items-center justify-center shrink-0 w-7 h-7 rounded-full bg-white dark:bg-black/20 shadow-sm border border-black/5 dark:border-white/5 ${iconColor}`}>
                                    <IconCmp className="w-3.5 h-3.5" strokeWidth={2.5} />
                                </div>
                                <span className="font-bold text-sm truncate text-[var(--text-primary)]">
                                    {m.givenName} <span className="opacity-80 font-semibold">{m.familyName}</span>
                                </span>
                            </div>
                            
                            {m.category && (
                                <span className="ml-2 text-[10px] font-bold px-2 py-0.5 rounded-md bg-[var(--background)] text-[var(--text-muted)] border border-[var(--border)] shadow-sm shrink-0 uppercase tracking-widest">
                                    {m.category}
                                </span>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

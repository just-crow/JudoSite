
'use client';

import { useState, useMemo } from 'react';
import { Competitor } from '@/actions/competitors';
import { Crown, Medal, Trophy, User, FolderOpen, Award, X, ChevronRight } from 'lucide-react';

interface CompetitorsListProps {
    competitors: Competitor[];
}

export default function CompetitorsList({ competitors }: CompetitorsListProps) {
    const [filter, setFilter] = useState('Svi');
    const [selectedCompetitor, setSelectedCompetitor] = useState<Competitor | null>(null);

    // Extract unique age groups for filter tabs
    const ageGroups = ['Svi', ...Array.from(new Set(competitors.map(c => c.ageGroup))).sort()];

    const filtered = useMemo(() => filter === 'Svi'
        ? competitors
        : competitors.filter(c => c.ageGroup === filter), [filter, competitors]);

    const isMedal = (text: string) => text.startsWith('🥇') || text.startsWith('🥈') || text.startsWith('🥉');

    const sortAchievements = (a: string, b: string) => {
        const getRank = (text: string) => {
            if (text.startsWith('🥇')) return 1;
            if (text.startsWith('🥈')) return 2;
            if (text.startsWith('🥉')) return 3;
            return 4;
        };
        return getRank(a) - getRank(b);
    };

    const getMedalIcon = (text: string, className = "w-4 h-4") => {
        if (text.startsWith('🥇')) return <Crown className={`${className} text-[#DAA520] drop-shadow-sm`} strokeWidth={2.5} />;
        if (text.startsWith('🥈')) return <Medal className={`${className} text-[#64748B] drop-shadow-sm`} strokeWidth={2.5} />;
        if (text.startsWith('🥉')) return <Medal className={`${className} text-[#B87333] drop-shadow-sm`} strokeWidth={2.5} />;
        return <Trophy className={`${className} text-[var(--accent)]`} />;
    };

    const getMedalBg = (text: string) => {
        if (text.startsWith('🥇')) return 'bg-gradient-to-br from-[#FFF8DC] to-[#FFF0B3] border-[#FFD700]/50 outline-[#FFD700]/30 text-[#B8860B]';
        if (text.startsWith('🥈')) return 'bg-gradient-to-br from-[#F8FAFC] to-[#E2E8F0] border-[#94A3B8]/50 outline-[#94A3B8]/30 text-[#334155]';
        if (text.startsWith('🥉')) return 'bg-gradient-to-br from-[#FFF1E6] to-[#FFE4CC] border-[#E6A87C]/50 outline-[#CD7F32]/30 text-[#8B4513]';
        return 'bg-gray-50 border-gray-200 outline-gray-200';
    };

    return (
        <div>
            {/* Filters */}
            <div className="flex flex-wrap items-center justify-center gap-2.5 mb-14 relative z-10">
                {ageGroups.map((group) => (
                    <button
                        key={group}
                        onClick={() => setFilter(group)}
                        className={`px-6 py-2.5 rounded-full text-sm font-bold tracking-wide transition-all duration-300 ease-out shadow-sm border ${filter === group
                                ? "bg-[var(--primary)] border-[var(--primary)] text-white shadow-md scale-105"
                                : "bg-[var(--surface)] text-[var(--text-secondary)] border-[var(--border)] hover:bg-[var(--hover)] hover:text-[var(--text-primary)] hover:border-[var(--primary-light)]"
                            }`}
                    >
                        {group}
                    </button>
                ))}
            </div>

            {/* Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 xl:gap-8 mb-12">
                {filtered.map((competitor) => {
                    const previewAchievements = (competitor.achievements?.filter(a => a.trim() !== '') || []).sort(sortAchievements);
                    const medalsOnly = previewAchievements.filter(isMedal);
                    const hasMore = previewAchievements.length > 2;

                    return (
                        <div 
                            key={competitor.id} 
                            onClick={() => setSelectedCompetitor(competitor)}
                            className="group cursor-pointer bg-[var(--surface)] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-[var(--primary)]/10 transition-all duration-500 hover:-translate-y-1.5 transform-gpu border border-[var(--border)] flex flex-col h-full relative"
                        >
                            {/* Decorative background gradient on hover */}
                            <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary-light)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                            {/* Image Header */}
                            <div className="relative aspect-[4/5] bg-gradient-to-b from-[var(--background-alt)] to-[var(--background)] flex items-center justify-center flex-shrink-0 z-10 overflow-hidden">
                                {competitor.image ? (
                                    <img
                                        src={competitor.image}
                                        alt={competitor.name}
                                        className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
                                    />
                                ) : (
                                    <div className="absolute inset-0 flex items-center justify-center w-full h-full bg-gradient-to-br from-[var(--background-alt)] to-[var(--border)]/30">
                                        <User className="w-24 h-24 text-[var(--border)] opacity-60" strokeWidth={1} />
                                    </div>
                                )}
                                
                                {/* Gradient completely covering to avoid container rounding gaps */}
                                <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface)] via-[var(--surface)]/0 to-transparent from-[-5%] via-25% pointer-events-none z-10" />
                                
                                <div className="absolute top-4 right-4 z-20 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] font-bold text-white uppercase tracking-wider border border-white/10 shadow-sm transition-transform duration-300 group-hover:scale-105">
                                    {competitor.ageGroup}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-5 pt-6 -mt-1 flex flex-col flex-grow relative z-20 bg-[var(--surface)]">
                                <h3 className="text-xl font-bold text-[var(--text-primary)] mb-1.5 group-hover:text-[var(--accent)] transition-colors duration-300">
                                    {competitor.name}
                                </h3>
                                <p className="text-[var(--text-muted)] font-semibold text-xs tracking-wide uppercase mb-5 flex items-center gap-1.5">
                                    <span className="bg-[var(--background-alt)] px-2 py-0.5 rounded text-[var(--text-secondary)]">{competitor.category}</span>
                                    <span className="text-[var(--border)]">•</span>
                                    <span className="bg-[var(--background-alt)] px-2 py-0.5 rounded text-[var(--text-secondary)]">{competitor.rank}</span>
                                </p>

                                <div className="flex-grow flex flex-col justify-end">
                                    {medalsOnly.length > 0 ? (
                                        <div className="mb-4">
                                            <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] mb-2">Izdvojene medalje</div>
                                            <div className="flex flex-wrap gap-2">
                                                {medalsOnly.slice(0, 4).map((medal, i) => (
                                                    <div 
                                                        key={i} 
                                                        title={medal.substring(2)} 
                                                        className={`w-9 h-9 flex items-center justify-center rounded-full border outline outline-4 ${getMedalBg(medal)} transition-transform hover:scale-110`}
                                                    >
                                                        {getMedalIcon(medal, "w-4 h-4")}
                                                    </div>
                                                ))}
                                                {medalsOnly.length > 4 && (
                                                    <div className="w-9 h-9 flex items-center justify-center rounded-full bg-[var(--background-alt)] border border-[var(--border)] text-[10px] font-bold text-[var(--text-secondary)]">
                                                        +{medalsOnly.length - 4}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ) : previewAchievements.length > 0 && (
                                        <div className="mb-4 space-y-2.5">
                                            <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] mb-1 mt-auto">Rezultati</div>
                                            {previewAchievements.slice(0, 2).map((achievement, i) => (
                                                <div key={i} className="flex items-start gap-2.5 text-xs text-[var(--text-secondary)] group/item">
                                                    <div className="mt-0.5 shrink-0 bg-[var(--accent)]/10 p-1 rounded text-[var(--accent)] group-hover/item:bg-[var(--accent)] group-hover/item:text-white transition-colors">
                                                        <Trophy className="w-3 h-3" />
                                                    </div>
                                                    <span className="line-clamp-2 leading-tight">
                                                        {achievement}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {previewAchievements.length > 0 && (
                                        <div className="pt-3 mt-auto border-t border-[var(--border)]/50">
                                            <div className="flex items-center justify-between w-full text-xs font-bold text-[var(--accent)] group-hover:text-[var(--primary)] transition-colors">
                                                <span>Prikaži profil & rezultate</span>
                                                <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {filtered.length === 0 && (
                <div className="text-center py-16 bg-[var(--surface)] text-[var(--text-muted)] border border-dashed border-[var(--border)] rounded-3xl xl:w-2/3 mx-auto flex flex-col items-center justify-center">
                    <User className="w-16 h-16 text-[var(--border)] mb-4 opacity-50" />
                    <p className="text-lg font-bold text-[var(--text-secondary)]">Nema takmičara u ovoj kategoriji.</p>
                </div>
            )}

            {/* Modal */}
            {selectedCompetitor && (
                <div 
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm transition-opacity"
                    onClick={() => setSelectedCompetitor(null)}
                >
                    <div 
                        className="bg-[var(--surface)] rounded-3xl w-full max-w-4xl max-h-[90vh] flex flex-col md:flex-row shadow-2xl relative overflow-hidden ring-1 ring-white/10 animate-in fade-in zoom-in-95 duration-300"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button 
                            className="absolute top-4 right-4 z-20 w-10 h-10 flex items-center justify-center bg-black/20 hover:bg-black/40 rounded-full text-white transition-colors backdrop-blur-md"
                            onClick={() => setSelectedCompetitor(null)}
                        >
                            <X className="w-5 h-5" />
                        </button>

                        {/* Modal Image */}
                        <div className="w-full md:w-[45%] min-h-[360px] md:h-auto bg-[var(--background-alt)] flex flex-col relative flex-shrink-0">
                            {selectedCompetitor.image ? (
                                <img
                                    src={selectedCompetitor.image}
                                    alt={selectedCompetitor.name}
                                    className="absolute inset-0 w-full h-full object-cover object-center"
                                />
                            ) : (
                                <div className="absolute inset-0 flex items-center justify-center border-r border-[var(--border)]">
                                    <User className="w-32 h-32 text-[var(--border)] opacity-30" strokeWidth={1} />
                                </div>
                            )}
                            
                            {/* Overlay gradients for text readability */}
                            <div className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                            
                            <div className="relative mt-auto p-8 text-white z-10 flex flex-col justify-end h-full">
                                <span className="inline-block bg-[var(--primary)]/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-white mb-3 w-fit border border-white/20">
                                    {selectedCompetitor.ageGroup}
                                </span>
                                <h2 className="text-4xl font-black tracking-tight leading-none mb-4 drop-shadow-md">
                                    {selectedCompetitor.name}
                                </h2>
                                <div className="flex flex-wrap items-center gap-2">
                                    <span className="bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/20 text-sm font-bold shadow-sm">{selectedCompetitor.category}</span>
                                    <span className="bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/20 text-sm font-bold shadow-sm">{selectedCompetitor.rank}</span>
                                </div>
                            </div>
                        </div>
                        
                        {/* Modal Content */}
                        <div className="w-full md:w-[55%] flex flex-col h-full bg-[var(--surface)] max-h-[50vh] md:max-h-[90vh]">
                            <div className="p-6 sm:p-8 flex-grow overflow-y-auto custom-scrollbar">
                                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[var(--border)] sticky top-0 bg-[var(--surface)]/95 backdrop-blur-md z-10 pt-2">
                                    <Award className="w-6 h-6 text-[var(--accent)]" />
                                    <h4 className="text-xl font-bold text-[var(--text-primary)] tracking-tight">
                                        Sportski Uspjesi
                                    </h4>
                                </div>
                                
                                {(!selectedCompetitor.achievements || selectedCompetitor.achievements.filter(a=>a.trim()!=='').length === 0) ? (
                                    <div className="flex flex-col items-center justify-center py-16 bg-[var(--background-alt)] rounded-2xl border border-dashed border-[var(--border)]">
                                        <FolderOpen className="w-12 h-12 text-[var(--text-muted)] mb-3 opacity-50" strokeWidth={1.5} />
                                        <p className="text-sm text-[var(--text-muted)] font-semibold">
                                            Nema upisanih rezultata za ovog takmičara.
                                        </p>
                                    </div>
                                ) : (
                                    <ul className="space-y-3 pb-8">
                                        {[...selectedCompetitor.achievements.filter(a => a.trim() !== '')]
                                            .sort(sortAchievements)
                                            .map((achievement, i) => {
                                            const medal = isMedal(achievement);
                                            return (
                                                <li 
                                                    key={i} 
                                                    className={`flex items-start gap-4 p-4 rounded-xl border transition-all duration-300 hover:shadow-md ${
                                                        medal 
                                                            ? getMedalBg(achievement).replace('outline', 'hover:border') + ' text-[var(--text-primary)] hover:-translate-y-0.5' 
                                                            : 'bg-[var(--background)] border-[var(--border)] hover:bg-[var(--surface)] text-[var(--text-secondary)] hover:border-[var(--primary-light)]'
                                                    }`}
                                                >
                                                    <div className="flex-shrink-0 mt-0.5">
                                                        {medal ? (
                                                            <div className="bg-white/80 dark:bg-black/20 p-2 rounded-full shadow-sm border border-black/5 dark:border-white/5">
                                                                {getMedalIcon(achievement, "w-4 h-4")}
                                                            </div>
                                                        ) : (
                                                            <div className="bg-[var(--background-alt)] p-2 rounded-full border border-[var(--border)]">
                                                                <Trophy className="w-4 h-4 text-[var(--text-muted)]" />
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="leading-relaxed font-semibold">
                                                        {medal ? achievement.substring(2) : achievement}
                                                    </div>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

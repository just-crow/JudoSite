'use client';

import { useState } from 'react';
import { Competitor } from '@/actions/competitors';
import Image from 'next/image';

interface CompetitorsListProps {
    competitors: Competitor[];
}

export default function CompetitorsList({ competitors }: CompetitorsListProps) {
    const [filter, setFilter] = useState('Svi');

    // Extract unique age groups for filter tabs
    const ageGroups = ['Svi', ...Array.from(new Set(competitors.map(c => c.ageGroup))).sort()];

    const filtered = filter === 'Svi'
        ? competitors
        : competitors.filter(c => c.ageGroup === filter);

    return (
        <div>
            {/* Filters */}
            <div className="flex flex-wrap gap-3 mb-12 justify-center">
                {ageGroups.map((group) => (
                    <button
                        key={group}
                        onClick={() => setFilter(group)}
                        className={`px-6 py-3 rounded-full text-sm font-bold transition-all shadow-sm ${filter === group
                                ? "bg-[var(--primary)] text-white shadow-lg scale-105"
                                : "bg-white text-[var(--text-secondary)] hover:bg-[var(--primary-light)] hover:text-white"
                            }`}
                    >
                        {group}
                    </button>
                ))}
            </div>

            {/* Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filtered.map((competitor) => (
                    <div key={competitor.id} className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-[var(--border)]">
                        {/* Image Header */}
                        <div className="relative h-64 bg-gradient-to-br from-[var(--background-alt)] to-[var(--border)] overflow-hidden">
                            {competitor.image ? (
                                <img
                                    src={competitor.image}
                                    alt={competitor.name}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                            ) : (
                                <div className="absolute inset-0 flex items-center justify-center text-[var(--text-muted)]">
                                    <span className="text-6xl opacity-20">🥋</span>
                                </div>
                            )}
                            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-[var(--primary)] shadow-sm">
                                {competitor.ageGroup}
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-6">
                            <h3 className="text-xl font-bold text-[var(--text-primary)] mb-1 group-hover:text-[var(--primary)] transition-colors">
                                {competitor.name}
                            </h3>
                            <p className="text-[var(--text-secondary)] font-medium text-sm mb-4">
                                {competitor.category} • {competitor.rank}
                            </p>

                            {competitor.achievements && competitor.achievements.length > 0 && (
                                <div className="space-y-2">
                                    {competitor.achievements.slice(0, 2).map((achievement, i) => (
                                        <div key={i} className="flex items-start gap-2 text-xs text-[var(--text-secondary)]">
                                            <span className="text-[var(--accent)] mt-0.5">🏆</span>
                                            <span>{achievement}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {filtered.length === 0 && (
                <div className="text-center py-12 text-[var(--text-muted)]">
                    <p className="text-lg">Nema takmičara u ovoj kategoriji.</p>
                </div>
            )}
        </div>
    );
}

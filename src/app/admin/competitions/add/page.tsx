'use client';

import { createCompetition } from "@/actions/competitions";
import Link from "next/link";

export default function AddCompetitionPage() {
    return (
        <div className="max-w-2xl mx-auto animate-fade-in-up">
            <div className="flex items-center gap-4 mb-8">
                <Link href="/admin/competitions" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-[var(--text-primary)]">Dodaj Takmičenje</h1>
                    <p className="text-[var(--text-secondary)]">Unesite podatke o novom takmičenju</p>
                </div>
            </div>

            <form action={createCompetition} className="space-y-6">
                <div className="card p-8 space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                            Naziv Takmičenja
                        </label>
                        <input name="title" type="text" required className="w-full px-4 py-2 border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] text-[var(--text-primary)]" />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                                Datum
                            </label>
                            <input name="date" type="date" required className="w-full px-4 py-2 border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] text-[var(--text-primary)]" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                                Lokacija
                            </label>
                            <input name="location" type="text" required className="w-full px-4 py-2 border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] text-[var(--text-primary)]" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                            Opis
                        </label>
                        <textarea name="description" rows={3} className="w-full px-4 py-2 border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] text-[var(--text-primary)]" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                            Link za registraciju (opcionalno)
                        </label>
                        <input name="registrationLink" type="url" className="w-full px-4 py-2 border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] text-[var(--text-primary)]" placeholder="https://..." />
                    </div>
                </div>

                <div className="flex justify-end gap-4">
                    <Link href="/admin/competitions" className="px-6 py-2 text-[var(--text-secondary)] hover:bg-gray-100 rounded-lg transition-colors font-medium">Odustani</Link>
                    <button type="submit" className="btn-primary">Sačuvaj</button>
                </div>
            </form>
        </div>
    );
}

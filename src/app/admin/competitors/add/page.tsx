'use client';

import { createCompetitor } from "@/actions/competitors";
import { useState } from "react";
import Link from "next/link";

export default function AddCompetitorPage() {
    return (
        <div className="max-w-2xl mx-auto animate-fade-in-up">
            <div className="flex items-center gap-4 mb-8">
                <Link href="/admin/competitors" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-[var(--text-primary)]">Dodaj Takmičara</h1>
                    <p className="text-[var(--text-secondary)]">Unesite podatke o novom takmičaru</p>
                </div>
            </div>

            <form action={createCompetitor} className="space-y-6">
                <div className="card p-8 space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                            Ime i Prezime
                        </label>
                        <input
                            name="name"
                            type="text"
                            required
                            className="w-full px-4 py-2 border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] text-[var(--text-primary)]"
                            placeholder="npr. Marko Marković"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                                Kategorija
                            </label>
                            <input
                                name="category"
                                type="text"
                                required
                                className="w-full px-4 py-2 border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] text-[var(--text-primary)]"
                                placeholder="npr. -73kg"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                                Uzrast
                            </label>
                            <select
                                name="ageGroup"
                                required
                                className="w-full px-4 py-2 border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] text-[var(--text-primary)] bg-white"
                            >
                                <option value="U-9">U-9</option>
                                <option value="U-11">U-11</option>
                                <option value="U-13">U-13</option>
                                <option value="U-15">U-15</option>
                                <option value="Kadeti">Kadeti</option>
                                <option value="Juniori">Juniori</option>
                                <option value="Seniori">Seniori</option>
                                <option value="Veterani">Veterani</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                            Rank / Pojas
                        </label>
                        <input
                            name="rank"
                            type="text"
                            required
                            className="w-full px-4 py-2 border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] text-[var(--text-primary)]"
                            placeholder="npr. 1. Dan"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                            Opis / Uspjesi
                        </label>
                        <textarea
                            name="description"
                            rows={3}
                            className="w-full px-4 py-2 border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] text-[var(--text-primary)]"
                            placeholder="Kratak opis ili najvažniji rezultati..."
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                            Fotografija
                        </label>
                        <div className="border-2 border-dashed border-[var(--border)] rounded-xl p-8 text-center hover:border-[var(--primary)] transition-colors bg-[var(--background-alt)]">
                            <input
                                type="file"
                                name="file"
                                accept="image/*"
                                className="w-full"
                            />
                            <p className="text-sm text-[var(--text-muted)] mt-2">
                                Preporučeno: JPG, PNG. Max 5MB.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end gap-4">
                    <Link href="/admin/competitors" className="px-6 py-2 text-[var(--text-secondary)] hover:bg-gray-100 rounded-lg transition-colors font-medium">
                        Odustani
                    </Link>
                    <button type="submit" className="btn-primary">
                        Sačuvaj Takmičara
                    </button>
                </div>
            </form>
        </div>
    );
}

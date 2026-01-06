'use client'

import { createAlbum } from '@/actions/gallery'
import Link from 'next/link'
import { useFormStatus } from 'react-dom'
import { useState } from 'react'

function SubmitButton() {
    const { pending } = useFormStatus()

    return (
        <button
            type="submit"
            disabled={pending}
            className={`btn-primary px-8 py-3 w-full sm:w-auto flex justify-center ${pending ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
            {pending ? (
                <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Kreiranje...
                </>
            ) : (
                'Kreiraj Album'
            )}
        </button>
    )
}

export default function AddAlbumPage() {
    const [useUrl, setUseUrl] = useState(false)
    const [fileName, setFileName] = useState<string | null>(null)

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in-up">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-[var(--text-primary)]">Novi Album</h1>
                    <p className="text-[var(--text-secondary)]">Dodaj novi foto album u galeriju</p>
                </div>
                <Link href="/admin/gallery" className="text-[var(--text-secondary)] hover:text-[var(--primary)] font-medium flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Nazad na galeriju
                </Link>
            </div>

            <div className="card p-8">
                <form action={createAlbum} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Naziv Albuma</label>
                            <input
                                name="title"
                                type="text"
                                required
                                className="w-full px-4 py-3 rounded-xl border border-[var(--border)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20 outline-none transition-all"
                                placeholder="npr. Državno Prvenstvo 2025"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Datum</label>
                            <input
                                name="date"
                                type="text"
                                required
                                className="w-full px-4 py-3 rounded-xl border border-[var(--border)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20 outline-none transition-all"
                                placeholder="npr. 12.03.2025"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <label className="block text-sm font-medium text-[var(--text-secondary)]">Naslovna Slika</label>
                            <button
                                type="button"
                                onClick={() => setUseUrl(!useUrl)}
                                className="text-xs text-[var(--primary)] hover:underline"
                            >
                                {useUrl ? 'Koristi upload fajla' : 'Koristi URL slike'}
                            </button>
                        </div>

                        {useUrl ? (
                            <input
                                name="coverImage"
                                type="url"
                                className="w-full px-4 py-3 rounded-xl border border-[var(--border)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20 outline-none transition-all"
                                placeholder="npr. https://example.com/cover.jpg"
                            />
                        ) : (
                            <div className="relative border-2 border-dashed border-[var(--border)] rounded-xl p-6 text-center hover:border-[var(--primary)] transition-colors cursor-pointer bg-[var(--background-alt)]">
                                <input
                                    name="file"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) setFileName(file.name);
                                    }}
                                    className="w-full h-full opacity-0 absolute inset-0 cursor-pointer"
                                />
                                <div className="pointer-events-none">
                                    <svg className="w-8 h-8 mx-auto text-[var(--text-secondary)] mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    <p className="text-sm text-[var(--text-secondary)]">
                                        {fileName ? `Odabrano: ${fileName}` : 'Kliknite za upload naslovne slike'}
                                    </p>
                                </div>
                            </div>
                        )}
                        <p className="text-xs text-[var(--text-muted)] mt-2">Ova slika će se prikazivati na kartici albuma.</p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Dodatne slike (URL-ovi)</label>
                        <textarea
                            name="images"
                            rows={5}
                            className="w-full px-4 py-3 rounded-xl border border-[var(--border)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20 outline-none transition-all"
                            placeholder="Unesite linkove slika odvojene zarezom (npr. url1, url2, url3)..."
                        />
                        <p className="text-xs text-[var(--text-muted)] mt-2">Trenutno podržan samo unos URL-ova za galeriju. U budućnosti će biti dodan multi-file upload.</p>
                    </div>

                    <div className="pt-4 border-t border-[var(--border)] flex justify-end">
                        <SubmitButton />
                    </div>
                </form>
            </div>
        </div>
    )
}

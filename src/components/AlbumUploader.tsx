'use client'

import { useRef, useState, useTransition } from 'react'
import { addImagesToAlbum } from '@/actions/gallery'

export default function AlbumUploader({ albumId }: { albumId: string }) {
    const formRef = useRef<HTMLFormElement>(null)
    const [isPending, startTransition] = useTransition()
    const [uploadCount, setUploadCount] = useState(0)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setUploadCount(e.target.files.length)

            // Create FormData manually to ensure files are captured
            const formData = new FormData()
            Array.from(e.target.files).forEach(file => {
                formData.append('file', file)
            })

            // Call action directly
            startTransition(async () => {
                await addImagesToAlbum(albumId, formData)

                // Reset input
                if (formRef.current) formRef.current.reset()
                setUploadCount(0)
            })
        }
    }

    return (
        <form
            ref={formRef}
            className="w-full"
        >
            <div className={`relative border-2 border-dashed border-[var(--border)] rounded-xl p-8 text-center hover:border-[var(--primary)] transition-all cursor-pointer bg-[var(--background-alt)] group ${isPending ? 'opacity-50 pointer-events-none' : ''}`}>
                <input
                    name="file"
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileChange}
                    disabled={isPending}
                    className="w-full h-full opacity-0 absolute inset-0 cursor-pointer z-10"
                />

                <div className="pointer-events-none flex flex-col items-center justify-center gap-3">
                    {isPending ? (
                        <>
                            <div className="w-12 h-12 rounded-full border-4 border-[var(--primary)] border-t-transparent animate-spin"></div>
                            <p className="font-bold text-[var(--primary)]">Upload slika u toku ({uploadCount})...</p>
                        </>
                    ) : (
                        <>
                            <div className="w-16 h-16 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-[var(--text-primary)] mb-1">Klikni ili prevuci slike ovdje</h3>
                                <p className="text-sm text-[var(--text-secondary)]">Podržano više slika odjednom (Bulk Upload)</p>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </form>
    )
}

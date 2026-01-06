import { getAlbum, updateAlbum, addImagesToAlbum, removeImageFromAlbum } from '@/actions/gallery'
import { verifySession } from '@/actions/auth'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export default async function EditAlbumPage({ params }: { params: { id: string } }) {
    await verifySession()
    const { id } = await params
    const album = await getAlbum(id)

    if (!album) {
        notFound()
    }

    return (
        <div className="space-y-8 animate-fade-in-up">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-[var(--text-primary)]">Uredi Album</h1>
                    <p className="text-[var(--text-secondary)]">{album.title}</p>
                </div>
                <Link href="/admin/gallery" className="text-[var(--text-secondary)] hover:text-[var(--primary)] font-medium flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Nazad na galeriju
                </Link>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">

                {/* Edit Details Form */}
                <div className="card p-8 h-fit">
                    <h2 className="text-xl font-bold mb-6 text-[var(--text-primary)]">Osnovni Podaci</h2>
                    <form action={updateAlbum.bind(null, album.id)} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Naziv Albuma</label>
                            <input
                                name="title"
                                type="text"
                                defaultValue={album.title}
                                required
                                className="w-full px-4 py-3 rounded-xl border border-[var(--border)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20 outline-none transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Datum</label>
                            <input
                                name="date"
                                type="text"
                                defaultValue={album.date}
                                required
                                className="w-full px-4 py-3 rounded-xl border border-[var(--border)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20 outline-none transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Nova Naslovna Slika (URL)</label>
                            <input
                                name="coverImage"
                                type="url"
                                defaultValue={album.coverImage}
                                className="w-full px-4 py-3 rounded-xl border border-[var(--border)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20 outline-none transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Ili Upload Nove Slike</label>
                            <div className="relative border-2 border-dashed border-[var(--border)] rounded-xl p-4 text-center hover:border-[var(--primary)] transition-colors cursor-pointer bg-[var(--background-alt)]">
                                <input
                                    name="file"
                                    type="file"
                                    accept="image/*"
                                    className="w-full h-full opacity-0 absolute inset-0 cursor-pointer"
                                />
                                <div className="pointer-events-none">
                                    <span className="text-sm text-[var(--text-secondary)]">Klikni za promjenu cover slike</span>
                                </div>
                            </div>
                        </div>

                        <div className="pt-4">
                            <button type="submit" className="btn-primary w-full justify-center">Spremi Promjene</button>
                        </div>
                    </form>
                </div>

                {/* Add Images Form */}
                <div className="card p-8 h-fit">
                    <h2 className="text-xl font-bold mb-6 text-[var(--text-primary)]">Dodaj Nove Fotografije</h2>
                    <form action={addImagesToAlbum.bind(null, album.id)} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">URL Slike</label>
                            <input
                                name="imageUrl"
                                type="url"
                                placeholder="https://..."
                                className="w-full px-4 py-3 rounded-xl border border-[var(--border)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20 outline-none transition-all"
                            />
                        </div>
                        <div className="text-center text-sm text-[var(--text-secondary)] font-medium">- ILI -</div>
                        <div>
                            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Upload Slike</label>
                            <div className="relative border-2 border-dashed border-[var(--border)] rounded-xl p-6 text-center hover:border-[var(--primary)] transition-colors cursor-pointer bg-[var(--background-alt)]">
                                <input
                                    name="file"
                                    type="file"
                                    accept="image/*"
                                    className="w-full h-full opacity-0 absolute inset-0 cursor-pointer"
                                />
                                <div className="pointer-events-none">
                                    <svg className="w-8 h-8 mx-auto text-[var(--text-secondary)] mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    <span className="text-sm text-[var(--text-secondary)]">Klikni za upload nove slike</span>
                                </div>
                            </div>
                        </div>

                        <div className="pt-4">
                            <button type="submit" className="btn-secondary w-full justify-center">Dodaj Sliku</button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Image Gallery Management */}
            <div className="card p-8">
                <h2 className="text-xl font-bold mb-6 text-[var(--text-primary)]">Upravljanje Slikama ({album.images.length})</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {album.images.map((img, idx) => (
                        <div key={idx} className="relative group aspect-square rounded-xl overflow-hidden border border-[var(--border)]">
                            <img src={img} alt={`Slika ${idx + 1}`} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <form action={removeImageFromAlbum.bind(null, album.id, img)}>
                                    <button className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors transform hover:scale-110">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </form>
                            </div>
                        </div>
                    ))}
                </div>
                {album.images.length === 0 && (
                    <p className="text-center text-[var(--text-secondary)] py-8">Nema slika u ovom albumu.</p>
                )}
            </div>
        </div>
    )
}

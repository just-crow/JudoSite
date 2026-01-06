import { getAlbums, deleteAlbum } from "@/actions/gallery"
import { verifySession } from "@/actions/auth"
import Link from "next/link"

export default async function AdminGalleryPage() {
    await verifySession()
    const albums = await getAlbums()

    return (
        <div className="space-y-8 animate-fade-in-up">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-[var(--text-primary)]">Upravljanje Galerijom</h1>
                    <p className="text-[var(--text-secondary)]">Pregled i uređivanje foto albuma</p>
                </div>
                <Link href="/admin/gallery/add" className="btn-primary flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Novi Album
                </Link>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {albums.map((album) => (
                    <div key={album.id} className="card overflow-hidden group">
                        <div className="relative h-48">
                            <img
                                src={album.coverImage}
                                alt={album.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                            <div className="absolute bottom-4 left-4 text-white">
                                <span className="text-sm font-medium opacity-90">{album.date}</span>
                                <div className="flex items-center gap-1 text-sm mt-1">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    {album.images.length} slika
                                </div>
                            </div>
                        </div>

                        <div className="p-6">
                            <h3 className="text-lg font-bold text-[var(--text-primary)] mb-4">{album.title}</h3>

                            <div className="flex items-center justify-end gap-3">
                                <Link href={`/admin/gallery/${album.id}`} className="text-blue-500 hover:text-blue-700 font-medium text-sm flex items-center gap-1 hover:bg-blue-50 px-3 py-2 rounded-lg transition-colors">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                    Uredi
                                </Link>
                                <form action={deleteAlbum.bind(null, album.id)}>
                                    <button className="text-red-500 hover:text-red-700 font-medium text-sm flex items-center gap-1 hover:bg-red-50 px-3 py-2 rounded-lg transition-colors">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                        Obriši
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                ))}

                {albums.length === 0 && (
                    <div className="col-span-full py-12 text-center card">
                        <div className="w-16 h-16 bg-[var(--background-alt)] rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-[var(--text-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-bold text-[var(--text-primary)]">Galerija je prazna</h3>
                        <p className="text-[var(--text-secondary)] mt-2 mb-6">Započnite dodavanjem prvog foto albuma.</p>
                        <Link href="/admin/gallery/add" className="btn-secondary">
                            Kreiraj Album
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}

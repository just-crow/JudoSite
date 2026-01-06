import Link from 'next/link';
import { getAlbums } from '@/actions/gallery';

export default async function GalleryPage() {
    const albums = await getAlbums();

    return (
        <main>
            {/* Hero Section */}
            <section className="section pb-12 pt-32 lg:pt-48 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-[var(--background-alt)] to-[var(--background)] -z-10" />

                {/* Decorative elements */}
                <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-gradient-to-br from-[var(--primary-light)]/10 to-[var(--accent)]/10 rounded-full blur-3xl animate-float-slow -z-10" />
                <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[var(--primary)]/5 rounded-full blur-2xl animate-float -z-10" />

                <div className="container">
                    <div className="max-w-4xl mx-auto text-center space-y-6">
                        <span className="tag animate-fade-in-up" style={{ animationDelay: '0ms' }}>
                            Uspomene
                        </span>
                        <h1 className="text-4xl lg:text-6xl font-bold tracking-tight animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                            Foto <span className="gradient-text">Galerije</span>
                        </h1>
                        <p className="text-lg lg:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                            Pogledajte fotografije sa naših takmičenja, treninga i druženja. Svaka slika priča priču o trudu, disciplini i uspjehu.
                        </p>
                    </div>
                </div>
            </section>

            {/* Gallery Grid */}
            <section className="section pt-0 pb-24">
                <div className="container">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
                        {albums.map((album, index) => (
                            <Link
                                href={`/novosti/galerije/${album.id}`}
                                key={album.id}
                                className="group relative block animate-fade-in-up"
                                style={{ animationDelay: `${300 + index * 100}ms` }}
                            >
                                {/* Card Container */}
                                <div className="relative h-[300px] lg:h-[350px] rounded-[var(--radius-xl)] overflow-hidden shadow-lg transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-2">

                                    {/* Image Background */}
                                    <div
                                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                        style={{ backgroundImage: `url(${album.coverImage})` }}
                                    />

                                    {/* Overlay Gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--primary-dark)]/90 via-[var(--primary-dark)]/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

                                    {/* Content */}
                                    <div className="absolute inset-0 p-8 flex flex-col justify-end">
                                        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                            <div className="flex items-center gap-3 mb-3">
                                                <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold text-white border border-white/10">
                                                    {album.date}
                                                </span>
                                                <span className="text-white/80 text-sm font-medium flex items-center gap-1">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                    {album.images.length} slika
                                                </span>
                                            </div>

                                            <h3 className="text-2xl font-bold text-white mb-2 leading-tight group-hover:text-[var(--accent-light)] transition-colors">
                                                {album.title}
                                            </h3>

                                            <div className="h-0 group-hover:h-8 overflow-hidden transition-all duration-300 opacity-0 group-hover:opacity-100">
                                                <span className="text-sm font-bold text-white flex items-center gap-2">
                                                    Pregledaj album
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                    </svg>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* Load More Button (Simulated) */}
                    <div className="mt-16 text-center animate-fade-in-up" style={{ animationDelay: '800ms' }}>
                        <button className="btn-secondary group">
                            Učitaj još galerija
                            <svg className="w-5 h-5 ml-2 group-hover:rotate-180 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                    </div>
                </div>
            </section>
        </main>
    );
}

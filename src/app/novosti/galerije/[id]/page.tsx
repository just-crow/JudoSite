import { getAlbum, getAlbums } from '@/actions/gallery';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
    const albums = await getAlbums();
    return albums.map((album) => ({
        id: album.id,
    }));
}

export default async function AlbumPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const album = await getAlbum(id);

    if (!album) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-[var(--background)]">
            {/* Hero / Header with optimized background */}
            <section className="relative mt-12 overflow-hidden min-h-[300px]">
                {/* Background image using Next.js Image for optimization */}
                {album.coverImage && (
                    <Image
                        src={album.coverImage}
                        alt={album.title}
                        fill
                        className="object-cover -z-20"
                        priority
                        quality={75}
                    />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-[var(--background)]/80 to-[var(--primary-dark)]/80 -z-10" />

                <div className="container relative z-10 py-12">
                    <Link href="/novosti/galerije" className="inline-flex items-center gap-2 text-black hover:text-gray-600 mb-8 transition-colors group">
                        <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/20 transition-all">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                        </div>
                        <span className="font-medium">Nazad na galerije</span>
                    </Link>

                    <h1 className="text-4xl lg:text-6xl font-bold text-black mb-6 animate-fade-in-up">
                        {album.title}
                    </h1>

                    <div className="flex items-center gap-4 text-white/90 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                        <span className="px-4 py-1.5 rounded-full bg-[var(--primary)] text-sm font-bold">
                            {album.date}
                        </span>
                        <span className="text-sm font-medium opacity-80">
                            {album.images.length} Fotografija
                        </span>
                    </div>
                </div>
            </section>

            {/* Gallery Grid with optimized images */}
            <section className="section pt-0 pb-24">
                <div className="container">
                    <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                        {album.images.map((img, index) => (
                            <div
                                key={index}
                                className="break-inside-avoid relative group rounded-2xl overflow-hidden shadow-lg animate-fade-in-up"
                                style={{ animationDelay: `${index * 50}ms` }}
                            >
                                {/* Using Next.js Image with responsive sizing */}
                                <div className="relative w-full" style={{ aspectRatio: '4/3' }}>
                                    <Image
                                        src={img}
                                        alt={`${album.title} - Slika ${index + 1}`}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                        className="object-cover transform transition-transform duration-700 group-hover:scale-105"
                                        loading="lazy"
                                        quality={80}
                                    />
                                </div>
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                            </div>
                        ))}
                    </div>

                    {album.images.length === 0 && (
                        <div className="text-center py-20 text-[var(--text-secondary)]">
                            <p>Trenutno nema fotografija u ovom albumu.</p>
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}

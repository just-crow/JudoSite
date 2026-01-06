import { verifySession } from "@/actions/auth"
import Link from "next/link"

export default async function AdminDashboard() {
    await verifySession()

    return (
        <div className="space-y-8 animate-fade-in-up">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-[var(--text-primary)]">Dashboard</h1>
                    <p className="text-[var(--text-secondary)]">Upravljanje sadržajem web stranice</p>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                {/* News Card */}
                <Link href="/admin/news" className="group">
                    <div className="card p-8 h-full hover:border-[var(--primary)] transition-colors">
                        <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                            </svg>
                        </div>
                        <h2 className="text-xl font-bold text-[var(--text-primary)] mb-2 group-hover:text-[var(--primary)] transition-colors">Novosti</h2>
                        <p className="text-[var(--text-secondary)] mb-6">
                            Dodaj nove vijesti, takmičarske izvještaje i najave događaja.
                        </p>
                        <span className="text-sm font-bold text-[var(--primary)] flex items-center gap-2 group-hover:gap-4 transition-all">
                            Upravljaj novostima
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </span>
                    </div>
                </Link>

                {/* Gallery Card */}
                <Link href="/admin/gallery" className="group">
                    <div className="card p-8 h-full hover:border-[var(--primary)] transition-colors">
                        <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <h2 className="text-xl font-bold text-[var(--text-primary)] mb-2 group-hover:text-[var(--primary)] transition-colors">Foto Galerija</h2>
                        <p className="text-[var(--text-secondary)] mb-6">
                            Upravljaj albumima, dodaj nove fotografije i organizuj uspomene.
                        </p>
                        <span className="text-sm font-bold text-[var(--primary)] flex items-center gap-2 group-hover:gap-4 transition-all">
                            Upravljaj galerijom
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </span>
                    </div>
                </Link>
            </div>
        </div>
    )
}

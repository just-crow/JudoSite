import { getSession } from "@/actions/auth";
import Link from "next/link";
import { logout } from "@/actions/auth";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getSession();

    return (
        <div className="min-h-screen bg-[var(--background-alt)]">
            {session && (
                <nav className="bg-white border-b border-[var(--border)] fixed top-0 w-full z-50">
                    <div className="container mx-auto px-4">
                        <div className="flex items-center justify-between h-16">
                            <div className="flex items-center gap-8">
                                <Link href="/admin/dashboard" className="text-xl font-bold text-[var(--primary)]">
                                    Admin Panel
                                </Link>
                                <div className="hidden md:flex items-center gap-6">
                                    <Link href="/admin/dashboard" className="text-sm font-medium hover:text-[var(--primary)] transition-colors">
                                        Dashboard
                                    </Link>
                                    <Link href="/admin/news" className="text-sm font-medium hover:text-[var(--primary)] transition-colors">
                                        Novosti
                                    </Link>
                                    <Link href="/admin/gallery" className="text-sm font-medium hover:text-[var(--primary)] transition-colors">
                                        Galerija
                                    </Link>
                                    <Link href="/admin/competitors" className="text-sm font-medium hover:text-[var(--primary)] transition-colors">
                                        Takmičari
                                    </Link>
                                    <Link href="/admin/trainers" className="text-sm font-medium hover:text-[var(--primary)] transition-colors">
                                        Treneri
                                    </Link>
                                    <Link href="/admin/competitions" className="text-sm font-medium hover:text-[var(--primary)] transition-colors">
                                        Takmičenja
                                    </Link>
                                    <Link href="/" target="_blank" className="text-sm font-medium hover:text-[var(--primary)] transition-colors flex items-center gap-2">
                                        Posjeti stranicu
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <span className="text-sm text-[var(--text-secondary)] hidden sm:block">
                                    Prijavljen kao: <span className="font-semibold text-[var(--text-primary)]">{session.user}</span>
                                </span>
                                <form action={logout}>
                                    <button className="text-sm text-red-500 hover:text-red-700 font-medium transition-colors">
                                        Odjavi se
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </nav>
            )}
            <main className={session ? "container mx-auto px-4 py-8 pt-24" : ""}>
                {children}
            </main>
        </div>
    );
}

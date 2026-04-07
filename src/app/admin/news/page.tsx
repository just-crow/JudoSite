import { getNews, deleteNews } from "@/actions/news"
import { verifySession } from "@/actions/auth"
import Link from "next/link"
import ReorderableNewsList from "./ReorderableList"

export default async function AdminNewsPage() {
    await verifySession()
    const news = await getNews()

    return (
        <div className="space-y-8 animate-fade-in-up">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-[var(--text-primary)]">Upravljanje Novostima</h1>
                    <p className="text-[var(--text-secondary)]">Pregled i uredjivanje svih novosti</p>
                </div>
                <Link href="/admin/news/add" className="btn-primary flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Dodaj Novost
                </Link>
            </div>

            <ReorderableNewsList initialNews={news} />
        </div>
    )
}

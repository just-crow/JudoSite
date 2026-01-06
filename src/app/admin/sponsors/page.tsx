import { getSponsors, deleteSponsor } from "@/actions/sponsors"
import { verifySession } from "@/actions/auth"
import Link from "next/link"

export default async function AdminSponsorsPage() {
    await verifySession()
    const sponsors = await getSponsors()

    return (
        <div className="space-y-8 animate-fade-in-up">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-[var(--text-primary)]">Upravljanje Sponzorima</h1>
                    <p className="text-[var(--text-secondary)]">Pregled i uređivanje sponzora</p>
                </div>
                <Link href="/admin/sponsors/add" className="btn-primary flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Dodaj Sponzora
                </Link>
            </div>

            <div className="card overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-[#f0f4f8] text-[var(--text-secondary)] font-semibold text-sm uppercase tracking-wider">
                            <tr>
                                <th className="p-6">Naziv</th>
                                <th className="p-6">Logo</th>
                                <th className="p-6">Web stranica</th>
                                <th className="p-6 text-right">Akcije</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[var(--border)]">
                            {sponsors.map((item) => (
                                <tr key={item.id} className="hover:bg-[var(--background-alt)] transition-colors">
                                    <td className="p-6 font-medium text-[var(--text-primary)]">{item.name}</td>
                                    <td className="p-6">
                                        {item.logo && <img src={item.logo} alt={item.name} className="h-12 object-contain" />}
                                    </td>
                                    <td className="p-6 text-[var(--text-secondary)]">
                                        <a href={item.website} target="_blank" className="text-[var(--primary)] hover:underline">{item.website}</a>
                                    </td>
                                    <td className="p-6 text-right">
                                        <div className="flex items-center justify-end gap-2 isolate relative z-10">
                                            <Link
                                                href={`/admin/sponsors/${item.id}/edit`}
                                                className="inline-flex items-center px-3 py-2 text-sm font-medium text-[var(--primary)] bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                                            >
                                                Uredi
                                            </Link>
                                            <form action={deleteSponsor.bind(null, item.id)}>
                                                <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors">
                                                    Obriši
                                                </button>
                                            </form>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

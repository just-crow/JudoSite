import { getCompetitions, deleteCompetition } from "@/actions/competitions"
import { verifySession } from "@/actions/auth"
import Link from "next/link"

export default async function AdminCompetitionsPage() {
    await verifySession()
    const competitions = await getCompetitions()

    return (
        <div className="space-y-8 animate-fade-in-up">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-[var(--text-primary)]">Upravljanje Takmičenjima</h1>
                    <p className="text-[var(--text-secondary)]">Pregled nadolazećih takmičenja</p>
                </div>
                <Link href="/admin/competitions/add" className="btn-primary flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Dodaj Takmičenje
                </Link>
            </div>

            <div className="card overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-[#f0f4f8] text-[var(--text-secondary)] font-semibold text-sm uppercase tracking-wider">
                            <tr>
                                <th className="p-6">Naziv</th>
                                <th className="p-6">Datum</th>
                                <th className="p-6">Lokacija</th>
                                <th className="p-6 text-right">Akcije</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[var(--border)]">
                            {competitions.map((item) => (
                                <tr key={item.id} className="hover:bg-[var(--background-alt)] transition-colors">
                                    <td className="p-6 font-medium text-[var(--text-primary)]">{item.title}</td>
                                    <td className="p-6 text-[var(--text-secondary)]">{item.date}</td>
                                    <td className="p-6 text-[var(--text-secondary)]">{item.location}</td>
                                    <td className="p-6 text-right flex items-center justify-end gap-2">
                                        <Link href={`/admin/competitions/${item.id}/edit`} className="text-[var(--primary)] hover:text-[var(--primary-dark)] font-medium transition-colors p-2 hover:bg-blue-50 rounded-lg">
                                            Uredi
                                        </Link>
                                        <form action={deleteCompetition.bind(null, item.id)}>
                                            <button className="text-red-500 hover:text-red-700 font-medium transition-colors p-2 hover:bg-red-50 rounded-lg">
                                                Obriši
                                            </button>
                                        </form>
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

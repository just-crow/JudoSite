import { getTrainers, deleteTrainer } from "@/actions/trainers"
import { verifySession } from "@/actions/auth"
import Link from "next/link"

export default async function AdminTrainersPage() {
    await verifySession()
    const trainers = await getTrainers()

    return (
        <div className="space-y-8 animate-fade-in-up">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-[var(--text-primary)]">Upravljanje Trenerima</h1>
                    <p className="text-[var(--text-secondary)]">Pregled i uređivanje trenerskog tima</p>
                </div>
                <Link href="/admin/trainers/add" className="btn-primary flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Dodaj Trenera
                </Link>
            </div>

            <div className="card overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-[#f0f4f8] text-[var(--text-secondary)] font-semibold text-sm uppercase tracking-wider">
                            <tr>
                                <th className="p-6">Ime i Prezime</th>
                                <th className="p-6">Uloga</th>
                                <th className="p-6">Rank</th>
                                <th className="p-6">Kontakt</th>
                                <th className="p-6 text-right">Akcije</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[var(--border)]">
                            {trainers.map((item) => (
                                <tr key={item.id} className="hover:bg-[var(--background-alt)] transition-colors">
                                    <td className="p-6 font-medium text-[var(--text-primary)]">
                                        <div className="flex items-center gap-3">
                                            {item.image && <img src={item.image} alt={item.name} className="w-10 h-10 rounded-full object-cover" />}
                                            {item.name}
                                        </div>
                                    </td>
                                    <td className="p-6 text-[var(--text-secondary)]">{item.role}</td>
                                    <td className="p-6 text-[var(--text-secondary)]">{item.rank}</td>
                                    <td className="p-6 text-[var(--text-secondary)] text-sm">
                                        <div>{item.email}</div>
                                        <div>{item.phone}</div>
                                    </td>
                                    <td className="p-6 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link href={`/admin/trainers/${item.id}/edit`} className="text-[var(--primary)] hover:text-[var(--primary-dark)] font-medium transition-colors p-2 hover:bg-blue-50 rounded-lg">
                                                Uredi
                                            </Link>
                                            <form action={deleteTrainer.bind(null, item.id)}>
                                                <button className="text-red-500 hover:text-red-700 font-medium transition-colors p-2 hover:bg-red-50 rounded-lg">
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

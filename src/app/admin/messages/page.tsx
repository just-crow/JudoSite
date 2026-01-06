import { getMessages, deleteMessage, markAsRead } from "@/actions/messages"
import { verifySession } from "@/actions/auth"
import Link from "next/link"

export default async function AdminMessagesPage() {
    await verifySession()
    const messages = await getMessages()

    return (
        <div className="space-y-8 animate-fade-in-up">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-[var(--text-primary)]">Poruke Konatakt Forme</h1>
                    <p className="text-[var(--text-secondary)]">Pregled svih poruka poslanih putem web stranice</p>
                </div>
            </div>

            <div className="card overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-[#f0f4f8] text-[var(--text-secondary)] font-semibold text-sm uppercase tracking-wider">
                            <tr>
                                <th className="p-6">Datum</th>
                                <th className="p-6">Pošiljalac</th>
                                <th className="p-6">Tema</th>
                                <th className="p-6">Poruka</th>
                                <th className="p-6 text-right">Akcije</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[var(--border)]">
                            {messages.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="p-12 text-center text-[var(--text-muted)]">
                                        Nema novih poruka.
                                    </td>
                                </tr>
                            ) : (
                                messages.map((msg) => (
                                    <tr key={msg.id} className={`hover:bg-[var(--background-alt)] transition-colors ${msg.read ? 'opacity-75' : 'bg-white font-medium'}`}>
                                        <td className="p-6 text-sm whitespace-nowrap text-[var(--text-secondary)]">
                                            {new Date(msg.createdAt).toLocaleDateString('bs-BA')} <br />
                                            {new Date(msg.createdAt).toLocaleTimeString('bs-BA', { hour: '2-digit', minute: '2-digit' })}
                                        </td>
                                        <td className="p-6">
                                            <div className="font-bold text-[var(--text-primary)]">{msg.firstName} {msg.lastName}</div>
                                            <div className="text-sm text-[var(--text-secondary)]">{msg.email}</div>
                                            <div className="text-sm text-[var(--text-secondary)]">{msg.phone}</div>
                                        </td>
                                        <td className="p-6 text-[var(--primary)]">{msg.subject}</td>
                                        <td className="p-6 text-[var(--text-secondary)] max-w-sm truncate" title={msg.message}>
                                            {msg.message}
                                        </td>
                                        <td className="p-6 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link href={`/admin/messages/${msg.id}`} className="text-[var(--primary)] hover:text-[var(--primary-dark)] font-medium transition-colors p-2 hover:bg-blue-50 rounded-lg whitespace-nowrap">
                                                    Pregledaj
                                                </Link>
                                                <form action={deleteMessage.bind(null, msg.id)}>
                                                    <button className="text-red-500 hover:text-red-700 font-medium transition-colors p-2 hover:bg-red-50 rounded-lg">
                                                        Obriši
                                                    </button>
                                                </form>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

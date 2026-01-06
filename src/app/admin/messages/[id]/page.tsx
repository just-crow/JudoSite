import { getMessages, deleteMessage } from "@/actions/messages";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MarkAsRead } from "@/components/MarkAsRead";

export default async function MessageDetailsPage(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const messages = await getMessages();
    const message = messages.find(m => m.id === params.id);

    if (!message) {
        notFound();
    }

    const deleteWithId = deleteMessage.bind(null, message.id);

    return (
        <div className="max-w-3xl mx-auto animate-fade-in-up">
            {!message.read && <MarkAsRead id={message.id} />}
            <div className="flex items-center gap-4 mb-8">
                <Link href="/admin/messages" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-[var(--text-primary)]">Detalji Poruke</h1>
                    <p className="text-[var(--text-secondary)]">
                        Od: {message.firstName} {message.lastName}
                    </p>
                </div>
            </div>

            <div className="card p-8 space-y-8">
                {/* Meta Info */}
                <div className="flex items-center justify-between p-4 bg-[var(--background)] rounded-lg border border-[var(--border)]">
                    <div>
                        <p className="text-xs text-[var(--text-secondary)] uppercase tracking-wider mb-1">Datum slanja</p>
                        <p className="font-medium text-[var(--text-primary)]" suppressHydrationWarning>
                            {new Date(message.createdAt).toLocaleDateString('bs-BA')} u {new Date(message.createdAt).toLocaleTimeString('bs-BA', { hour: '2-digit', minute: '2-digit' })}
                        </p>
                    </div>
                    <div>
                        <p className="text-xs text-[var(--text-secondary)] uppercase tracking-wider mb-1">Status</p>
                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${message.read ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                            {message.read ? 'Pročitano' : 'Novo'}
                        </span>
                    </div>
                </div>

                {/* Contact Info */}
                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <h3 className="text-sm font-bold text-[var(--text-secondary)] uppercase mb-2">Kontakt Podaci</h3>
                        <div className="space-y-2">
                            <div>
                                <span className="text-sm text-[var(--text-muted)]">Email:</span>
                                <a href={`mailto:${message.email}`} className="ml-2 text-[var(--primary)] hover:underline">{message.email}</a>
                            </div>
                            <div>
                                <span className="text-sm text-[var(--text-muted)]">Telefon:</span>
                                <a href={`tel:${message.phone}`} className="ml-2 text-[var(--text-primary)] hover:underline">{message.phone}</a>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-sm font-bold text-[var(--text-secondary)] uppercase mb-2">Tema</h3>
                        <p className="text-lg font-medium text-[var(--text-primary)]">{message.subject}</p>
                    </div>
                </div>

                <div className="border-t border-[var(--border)]"></div>

                {/* Message Body */}
                <div>
                    <h3 className="text-sm font-bold text-[var(--text-secondary)] uppercase mb-4">Sadržaj Poruke</h3>
                    <div className="bg-[var(--background-alt)] p-6 rounded-xl text-[var(--text-primary)] leading-relaxed whitespace-pre-wrap">
                        {message.message}
                    </div>
                </div>
            </div>

            <div className="mt-6 flex justify-end gap-4">
                <Link href={`mailto:${message.email}?subject=Re: ${message.subject}`} className="btn-secondary">
                    Odgovori na Email
                </Link>
                <form action={deleteWithId}>
                    <button className="btn-primary bg-red-600 hover:bg-red-700 border-red-600 hover:border-red-700 text-white">
                        Obriši Poruku
                    </button>
                </form>
            </div>
        </div>
    );
}

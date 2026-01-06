import { getTrainer, updateTrainer } from "@/actions/trainers";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function EditTrainerPage(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const trainer = await getTrainer(params.id);

    if (!trainer) {
        notFound();
    }

    const updateWithId = updateTrainer.bind(null, params.id);

    return (
        <div className="max-w-2xl mx-auto animate-fade-in-up">
            <div className="flex items-center gap-4 mb-8">
                <Link href="/admin/trainers" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-[var(--text-primary)]">Uredi Trenera</h1>
                    <p className="text-[var(--text-secondary)]">Izmjena podataka za: {trainer.name}</p>
                </div>
            </div>

            <form action={updateWithId} className="space-y-6">
                <div className="card p-8 space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                            Ime i Prezime
                        </label>
                        <input
                            name="name"
                            type="text"
                            required
                            defaultValue={trainer.name}
                            className="w-full px-4 py-2 border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] text-[var(--text-primary)]"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                                Uloga
                            </label>
                            <input
                                name="role"
                                type="text"
                                required
                                defaultValue={trainer.role}
                                className="w-full px-4 py-2 border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] text-[var(--text-primary)]"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                                Rank
                            </label>
                            <input
                                name="rank"
                                type="text"
                                required
                                defaultValue={trainer.rank}
                                className="w-full px-4 py-2 border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] text-[var(--text-primary)]"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                            Biografija
                        </label>
                        <textarea
                            name="bio"
                            rows={4}
                            defaultValue={trainer.bio}
                            className="w-full px-4 py-2 border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] text-[var(--text-primary)]"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                                Email
                            </label>
                            <input
                                name="email"
                                type="email"
                                defaultValue={trainer.email}
                                className="w-full px-4 py-2 border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] text-[var(--text-primary)]"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                                Telefon
                            </label>
                            <input
                                name="phone"
                                type="text"
                                defaultValue={trainer.phone}
                                className="w-full px-4 py-2 border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] text-[var(--text-primary)]"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                            Nova Fotografija (opcionalno)
                        </label>
                        <div className="border-2 border-dashed border-[var(--border)] rounded-xl p-8 text-center hover:border-[var(--primary)] transition-colors bg-[var(--background-alt)]">
                            <input type="file" name="file" accept="image/*" className="w-full" />
                        </div>
                        {trainer.image && (
                            <div className="mt-4">
                                <p className="text-xs text-[var(--text-muted)] mb-2">Trenutna slika:</p>
                                <img src={trainer.image} alt={trainer.name} className="h-20 w-auto rounded-lg" />
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex justify-end gap-4">
                    <Link href="/admin/trainers" className="px-6 py-2 text-[var(--text-secondary)] hover:bg-gray-100 rounded-lg transition-colors font-medium">Odustani</Link>
                    <button type="submit" className="btn-primary">Sačuvaj Izmjene</button>
                </div>
            </form>
        </div>
    );
}

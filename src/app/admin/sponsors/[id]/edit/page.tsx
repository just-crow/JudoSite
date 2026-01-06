import { getSponsor, updateSponsor } from "@/actions/sponsors";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function EditSponsorPage(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const sponsor = await getSponsor(params.id);

    if (!sponsor) {
        notFound();
    }

    const updateWithId = updateSponsor.bind(null, params.id);

    return (
        <div className="max-w-2xl mx-auto animate-fade-in-up">
            <div className="flex items-center gap-4 mb-8">
                <Link href="/admin/sponsors" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-[var(--text-primary)]">Uredi Sponzora</h1>
                    <p className="text-[var(--text-secondary)]">Izmjena podataka za: {sponsor.name}</p>
                </div>
            </div>

            <form action={updateWithId} className="space-y-6">
                <div className="card p-8 space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                            Naziv Sponzora
                        </label>
                        <input
                            name="name"
                            type="text"
                            required
                            defaultValue={sponsor.name}
                            className="w-full px-4 py-2 border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] text-[var(--text-primary)]"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                            Web Stranica
                        </label>
                        <input
                            name="website"
                            type="url"
                            defaultValue={sponsor.website}
                            className="w-full px-4 py-2 border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] text-[var(--text-primary)]"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                            Novi Logo (opcionalno)
                        </label>
                        <div className="border-2 border-dashed border-[var(--border)] rounded-xl p-8 text-center hover:border-[var(--primary)] transition-colors bg-[var(--background-alt)]">
                            <input type="file" name="file" accept="image/*" className="w-full" />
                        </div>
                        {sponsor.logo && (
                            <div className="mt-4">
                                <p className="text-xs text-[var(--text-muted)] mb-2">Trenutni logo:</p>
                                <img src={sponsor.logo} alt={sponsor.name} className="h-12 object-contain" />
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex justify-end gap-4">
                    <Link href="/admin/sponsors" className="px-6 py-2 text-[var(--text-secondary)] hover:bg-gray-100 rounded-lg transition-colors font-medium">Odustani</Link>
                    <button type="submit" className="btn-primary">Sačuvaj Izmjene</button>
                </div>
            </form>
        </div>
    );
}

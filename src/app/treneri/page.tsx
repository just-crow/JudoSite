import { getTrainers } from "@/actions/trainers";
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Treneri | Judo Klub Željezničar",
    description: "Stručni tim Judo Kluba Željezničar.",
};

export default async function TreneriPage() {
    const trainers = await getTrainers();

    return (
        <div className="min-h-screen bg-[var(--background)]">
            {/* Header */}
            <section className="bg-[var(--primary)] text-white py-20 relative overflow-hidden">
                <div className="container relative z-10 text-center">
                    <span className="tag mb-4 bg-white/20 backdrop-blur-md">Stručni Tim</span>
                    <h1 className="text-4xl lg:text-5xl font-bold mb-6">Naši Treneri</h1>
                    <p className="text-xl opacity-90 max-w-2xl mx-auto">
                        Iskusni stručnjaci posvećeni razvoju novih generacija šampiona.
                    </p>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div className="space-y-12">
                        {trainers.map((trainer, index) => (
                            <div key={trainer.id} className="group relative bg-white rounded-[32px] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-[var(--border)]">
                                <div className="grid lg:grid-cols-12 gap-0">
                                    {/* Image Side */}
                                    <div className={`lg:col-span-4 relative h-80 lg:h-auto ${index % 2 === 1 ? 'lg:order-last' : ''}`}>
                                        {trainer.image ? (
                                            <img
                                                src={trainer.image}
                                                alt={trainer.name}
                                                className="absolute inset-0 w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="absolute inset-0 bg-gradient-to-br from-[var(--background-alt)] to-[var(--border)] flex items-center justify-center">
                                                <span className="text-6xl">🥋</span>
                                            </div>
                                        )}
                                        {/* Overlay for contrast on mobile if needed, or style */}
                                    </div>

                                    {/* Content Side */}
                                    <div className="lg:col-span-8 p-8 lg:p-12 flex flex-col justify-center">
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                                            <div>
                                                <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-2 group-hover:text-[var(--primary)] transition-colors">
                                                    {trainer.name}
                                                </h2>
                                                <p className="text-[var(--primary)] font-bold text-lg">{trainer.role}</p>
                                            </div>
                                            <div className="px-4 py-2 bg-[var(--background-alt)] rounded-xl border border-[var(--border)] text-center min-w-[100px]">
                                                <span className="block text-xs text-[var(--text-muted)] uppercase tracking-wider font-bold">Rank</span>
                                                <span className="font-bold text-[var(--text-primary)]">{trainer.rank}</span>
                                            </div>
                                        </div>

                                        <p className="text-[var(--text-secondary)] text-lg leading-relaxed mb-8">
                                            {trainer.bio || "Nema biografije."}
                                        </p>

                                        <div className="grid sm:grid-cols-2 gap-4 mt-auto">
                                            {trainer.email && (
                                                <div className="flex items-center gap-3 p-4 rounded-xl bg-[var(--background-alt)] hover:bg-[var(--primary)] hover:text-white transition-colors group/item">
                                                    <svg className="w-5 h-5 text-[var(--text-muted)] group-hover/item:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                    </svg>
                                                    <span className="font-medium text-sm truncate">{trainer.email}</span>
                                                </div>
                                            )}
                                            {trainer.phone && (
                                                <div className="flex items-center gap-3 p-4 rounded-xl bg-[var(--background-alt)] hover:bg-[var(--primary)] hover:text-white transition-colors group/item">
                                                    <svg className="w-5 h-5 text-[var(--text-muted)] group-hover/item:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                                    </svg>
                                                    <span className="font-medium text-sm">{trainer.phone}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}

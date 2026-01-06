import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Rukovodstvo | Judo Klub Željezničar",
    description: "Upoznajte rukovodstvo i stručni štab Judo Kluba Željezničar.",
};

export default function RukovodstvoPage() {
    return (
        <div className="section">
            <div className="container">
                <div className="text-center mb-16 animate-fade-in-up">
                    <h1 className="text-4xl font-bold text-white mb-4">Rukovodstvo Kluba</h1>
                    <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
                        Tim koji vodi naš klub ka novim uspjesima i pobjedama.
                    </p>
                </div>

                {/* President & Board */}
                <div className="grid md:grid-cols-3 gap-8 mb-16">
                    <div className="card p-8 text-center animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                        <div className="w-32 h-32 mx-auto bg-[var(--background)] rounded-full mb-6 flex items-center justify-center">
                            <span className="text-4xl">👔</span>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Ime Prezime</h3>
                        <p className="text-[var(--primary)] font-medium mb-4">Predsjednik Kluba</p>
                        <p className="text-[var(--text-secondary)] text-sm">
                            Dugogodišnji sportski radnik i bivši takmičar.
                        </p>
                    </div>
                    <div className="card p-8 text-center animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                        <div className="w-32 h-32 mx-auto bg-[var(--background)] rounded-full mb-6 flex items-center justify-center">
                            <span className="text-4xl">📝</span>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Ime Prezime</h3>
                        <p className="text-[var(--primary)] font-medium mb-4">Generalni Sekretar</p>
                        <p className="text-[var(--text-secondary)] text-sm">
                            Zadužen za organizaciju i administrativne poslove.
                        </p>
                    </div>
                    <div className="card p-8 text-center animate-fade-in-up" style={{ animationDelay: '300ms' }}>
                        <div className="w-32 h-32 mx-auto bg-[var(--background)] rounded-full mb-6 flex items-center justify-center">
                            <span className="text-4xl">⚖️</span>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Ime Prezime</h3>
                        <p className="text-[var(--primary)] font-medium mb-4">Predsjednik Skupštine</p>
                        <p className="text-[var(--text-secondary)] text-sm">
                            Vodi skupštinu kluba i nadzire rad upravnog odbora.
                        </p>
                    </div>
                </div>

                {/* Management Board List */}
                <div className="card p-12 text-center animate-fade-in-up" style={{ animationDelay: '400ms' }}>
                    <h2 className="text-2xl font-bold text-white mb-8">Upravni Odbor</h2>
                    <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
                        {['Član 1', 'Član 2', 'Član 3', 'Član 4', 'Član 5', 'Član 6', 'Član 7', 'Član 8'].map((member, i) => (
                            <div key={i} className="p-4 bg-[var(--background)] rounded-xl border border-[var(--border)]">
                                <p className="text-[var(--text-primary)] font-medium">{member}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

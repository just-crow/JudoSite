import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Kontakt | Judo Klub Željezničar",
    description: "Kontaktirajte Judo Klub Željezničar. Adresa, telefon, email i kontakt forma.",
};

export default function KontaktPage() {
    return (
        <div className="section">
            <div className="container">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-white mb-4">Kontaktirajte nas</h1>
                    <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Rado ćemo odgovoriti na sva vaša pitanja.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Contact Form */}
                    <div className="card p-8">
                        <h2 className="text-2xl font-bold text-white mb-6">Pošaljite poruku</h2>
                        <form className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[var(--text-secondary)] text-sm mb-2">Ime</label>
                                    <input
                                        type="text"
                                        placeholder="Vaše ime"
                                        className="w-full px-4 py-3 rounded-lg bg-[var(--background)] border border-[var(--border)] text-white placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--secondary)] transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[var(--text-secondary)] text-sm mb-2">Prezime</label>
                                    <input
                                        type="text"
                                        placeholder="Vaše prezime"
                                        className="w-full px-4 py-3 rounded-lg bg-[var(--background)] border border-[var(--border)] text-white placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--secondary)] transition-colors"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-[var(--text-secondary)] text-sm mb-2">Email</label>
                                <input
                                    type="email"
                                    placeholder="vas@email.com"
                                    className="w-full px-4 py-3 rounded-lg bg-[var(--background)] border border-[var(--border)] text-white placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--secondary)] transition-colors"
                                />
                            </div>
                            <div>
                                <label className="block text-[var(--text-secondary)] text-sm mb-2">Telefon</label>
                                <input
                                    type="tel"
                                    placeholder="+387 6X XXX XXX"
                                    className="w-full px-4 py-3 rounded-lg bg-[var(--background)] border border-[var(--border)] text-white placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--secondary)] transition-colors"
                                />
                            </div>
                            <div>
                                <label className="block text-[var(--text-secondary)] text-sm mb-2">Tema</label>
                                <select className="w-full px-4 py-3 rounded-lg bg-[var(--background)] border border-[var(--border)] text-white focus:outline-none focus:border-[var(--secondary)] transition-colors">
                                    <option value="">Odaberite temu</option>
                                    <option value="membership">Članstvo</option>
                                    <option value="academy">Akademija</option>
                                    <option value="training">Treninzi</option>
                                    <option value="competition">Takmičenja</option>
                                    <option value="other">Ostalo</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-[var(--text-secondary)] text-sm mb-2">Poruka</label>
                                <textarea
                                    rows={5}
                                    placeholder="Vaša poruka..."
                                    className="w-full px-4 py-3 rounded-lg bg-[var(--background)] border border-[var(--border)] text-white placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--secondary)] transition-colors resize-none"
                                ></textarea>
                            </div>
                            <button type="submit" className="btn-primary w-full">
                                Pošalji poruku
                            </button>
                        </form>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-6">
                        {/* Address Card */}
                        <div className="card p-6">
                            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-3">
                                <svg className="w-6 h-6 text-[var(--secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                Adresa
                            </h3>
                            <p className="text-[var(--text-secondary)]">
                                Judo Klub Željezničar<br />
                                Ulica Zmaja od Bosne 123<br />
                                71000 Sarajevo<br />
                                Bosna i Hercegovina
                            </p>
                        </div>

                        {/* Phone Card */}
                        <div className="card p-6">
                            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-3">
                                <svg className="w-6 h-6 text-[var(--secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                Telefon
                            </h3>
                            <p className="text-[var(--text-secondary)]">
                                Kancelarija: +387 33 XXX XXX<br />
                                Mobitel: +387 6X XXX XXX
                            </p>
                        </div>

                        {/* Email Card */}
                        <div className="card p-6">
                            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-3">
                                <svg className="w-6 h-6 text-[var(--secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                Email
                            </h3>
                            <p className="text-[var(--text-secondary)]">
                                info@judoklub-zeljeznicar.ba<br />
                                akademija@judoklub-zeljeznicar.ba
                            </p>
                        </div>

                        {/* Hours Card */}
                        <div className="card p-6">
                            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-3">
                                <svg className="w-6 h-6 text-[var(--secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Radno vrijeme
                            </h3>
                            <div className="text-[var(--text-secondary)] space-y-1">
                                <p>Ponedjeljak - Petak: 09:00 - 21:00</p>
                                <p>Subota: 09:00 - 15:00</p>
                                <p>Nedjelja: Zatvoreno</p>
                            </div>
                        </div>

                        {/* Map Placeholder */}
                        <div className="card p-6">
                            <h3 className="text-lg font-bold text-white mb-4">Lokacija</h3>
                            <div className="h-48 rounded-lg bg-[var(--background)] border border-[var(--border)] flex items-center justify-center">
                                <span className="text-[var(--text-muted)]">[Placeholder za mapu]</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

import { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
    title: "Kontakt | Judo Klub Željezničar",
    description: "Kontaktirajte Judo Klub Željezničar. Adresa, telefon, email i kontakt forma.",
};

export default function KontaktPage() {
    return (
        <div className="section">
            <div className="container">
                {/* Header */}
                <div className="text-center mb-12 animate-fade-in-up">
                    <h1 className="text-4xl font-bold text-white mb-4">Kontaktirajte nas</h1>
                    <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
                        IMATE PITANJA? Rado ćemo odgovoriti na sve vaše upite vezane za treninge, takmičenja ili upis.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Contact Form */}
                    <div className="card p-8 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                        <h2 className="text-2xl font-bold text-white mb-6">Pošaljite poruku</h2>
                        <ContactForm />
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-6 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
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
                                Kemala Kapetanovića 43<br />
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
                    </div>
                </div>

                {/* Map Section */}
                <div className="mt-12 rounded-3xl overflow-hidden shadow-2xl h-[400px] animate-fade-in-up" style={{ animationDelay: '300ms' }}>
                    <iframe
                        width="100%"
                        height="100%"
                        id="gmap_canvas"
                        src="https://maps.google.com/maps?q=Kemala+Kapetanovica+43+Sarajevo&t=&z=15&ie=UTF8&iwloc=&output=embed"
                        frameBorder="0"
                        scrolling="no"
                        marginHeight={0}
                        marginWidth={0}
                        title="Dojo Location"
                    ></iframe>
                </div>
            </div>
        </div>
    );
}

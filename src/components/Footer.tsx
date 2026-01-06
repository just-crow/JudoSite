import Link from 'next/link';

const footerLinks = {
    novosti: [
        { label: 'Najave', href: '/novosti/najave' },
        { label: 'Izvještaji', href: '/novosti/izvjestaji' },
        { label: 'Foto galerije', href: '/novosti/galerije' },
        { label: 'Intervjui', href: '/novosti/intervjui' },
    ],
    klub: [
        { label: 'O klubu', href: '/klub' },
        { label: 'Historija', href: '/historija' },
        { label: 'Rukovodstvo', href: '/klub/rukovodstvo' },
        { label: 'Dojo', href: '/klub/dojo' },
    ],
    takmicari: [
        { label: 'Seniori', href: '/takmicari/seniori' },
        { label: 'Juniori', href: '/takmicari/juniori' },
        { label: 'Treneri', href: '/takmicari/treneri' },
    ],
    podrska: [
        { label: 'Kontakt', href: '/kontakt' },
        { label: 'Članstvo', href: '/clanstvo' },
        { label: 'Shop', href: '/shop' },
        { label: 'Press', href: '/klub/press' },
    ],
};

import { getSponsors } from '@/actions/sponsors';

export default async function Footer() {
    const sponsors = await getSponsors();
    return (
        <footer className="bg-[var(--primary)] text-white relative overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[var(--accent)]/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

            <div className="container relative z-10">
                {/* Main Footer Content */}
                <div className="py-16 lg:py-20 grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-16">
                    {/* Brand Section */}
                    <div className="lg:col-span-1 space-y-6">
                        <Link href="/" className="inline-block group">
                            <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4 group-hover:bg-white/20 transition-colors border border-white/10">
                                <span className="text-4xl font-bold">柔</span>
                            </div>
                            <h2 className="text-2xl font-bold mb-1">Judo Klub</h2>
                            <p className="text-white/60 text-sm">Željezničar</p>
                        </Link>
                        <p className="text-white/70 leading-relaxed text-sm">
                            Više od 70 godina tradicije, uspjeha i stvaranja šampiona. Pridruži se našoj porodici.
                        </p>
                        <div className="flex gap-3 pt-2">
                            {['facebook', 'instagram', 'youtube'].map((social) => (
                                <a key={social} href="#" className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center hover:bg-[var(--accent)] hover:text-white transition-all transform hover:-translate-y-1">
                                    <span className="sr-only">{social}</span>
                                    <div className="w-5 h-5 bg-current rounded-full opacity-50" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links Column 1 */}
                    <div>
                        <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                            <span className="w-1 h-6 bg-[var(--accent)] rounded-full"></span>
                            Klub
                        </h3>
                        <ul className="space-y-3">
                            {['O nama', 'Historijat', 'Uprava', 'Treneri', 'Kontakt'].map((item) => (
                                <li key={item}>
                                    <Link href="#" className="text-white/70 hover:text-white hover:translate-x-1 transition-all inline-block text-sm">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Links Column 2 */}
                    <div>
                        <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                            <span className="w-1 h-6 bg-[var(--accent)] rounded-full"></span>
                            Programi
                        </h3>
                        <ul className="space-y-3">
                            {['Judo škola', 'Takmičarski pogon', 'Rekreativni judo', 'Samodbrana', 'Termini treninga'].map((item) => (
                                <li key={item}>
                                    <Link href="#" className="text-white/70 hover:text-white hover:translate-x-1 transition-all inline-block text-sm">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter / Contact */}
                    <div>
                        <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                            <span className="w-1 h-6 bg-[var(--accent)] rounded-full"></span>
                            Kontakt
                        </h3>
                        <div className="space-y-4">
                            <div className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                                <p className="text-xs text-[var(--accent)] font-bold uppercase tracking-wider mb-1">Adresa</p>
                                <p className="text-sm font-medium">Mula Mustafe Bašeskije 12</p>
                                <p className="text-sm text-white/60">71000 Sarajevo, BiH</p>
                            </div>
                            <div className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                                <p className="text-xs text-[var(--accent)] font-bold uppercase tracking-wider mb-1">Email</p>
                                <p className="text-sm font-medium">info@judoklub.ba</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sponsors Section */}
                {sponsors.length > 0 && (
                    <div className="py-12 border-t border-white/10">
                        <p className="text-center text-sm font-bold tracking-widest text-white/40 uppercase mb-8">Ponosni Prijatelji i Sponzori</p>
                        <div className="flex flex-wrap justify-center gap-8 items-center min-h-[60px]">
                            {sponsors.map((sponsor) => (
                                <a
                                    key={sponsor.id}
                                    href={sponsor.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group opacity-40 hover:opacity-100 transition-opacity duration-300"
                                    title={sponsor.name}
                                >
                                    {sponsor.logo ? (
                                        <img src={sponsor.logo} alt={sponsor.name} className="h-10 w-auto object-contain filter grayscale group-hover:grayscale-0 transition-all" />
                                    ) : (
                                        <span className="text-sm font-bold text-white group-hover:text-[var(--accent)] transition-colors">{sponsor.name}</span>
                                    )}
                                </a>
                            ))}
                        </div>
                    </div>
                )}

                {/* Bottom Bar */}
                <div className="py-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/50">
                    <p>© 2026 Judo Klub Željezničar. Sva prava pridržana.</p>
                    <div className="flex gap-6">
                        <Link href="#" className="hover:text-white transition-colors">Privatnost</Link>
                        <Link href="#" className="hover:text-white transition-colors">Uslovi korištenja</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

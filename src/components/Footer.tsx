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

export default function Footer() {
    return (
        <footer className="bg-[var(--primary)] text-white">
            {/* Main footer */}
            <div className="container py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-16">
                    {/* Brand */}
                    <div className="lg:col-span-2">
                        <Link href="/" className="flex items-center gap-4 mb-8">
                            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                                <span className="text-3xl font-bold text-[var(--primary)]">柔</span>
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-white">Judo Klub</h2>
                                <p className="text-sm text-white/70">Sarajevo</p>
                            </div>
                        </Link>
                        <p className="text-white/80 mb-8 max-w-sm leading-relaxed text-base">
                            Od 1952. godine razvijamo judo kulturu i sportsku izvrsnost. Pridružite nam se na putu ka majstorstvu.
                        </p>
                        <div className="flex gap-4">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center hover:bg-white hover:text-[var(--primary)] transition-all">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.77,7.46H14.5v-1.9c0-.9.6-1.1,1-1.1h3V.5h-4.33C10.24.5,9.5,3.44,9.5,5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4Z" /></svg>
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center hover:bg-white hover:text-[var(--primary)] transition-all">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12,2.16c3.2,0,3.58,0,4.85.07,3.25.15,4.77,1.69,4.92,4.92.06,1.27.07,1.65.07,4.85s0,3.58-.07,4.85c-.15,3.23-1.66,4.77-4.92,4.92-1.27.06-1.64.07-4.85.07s-3.58,0-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.64-.07-4.85s0-3.58.07-4.85C2.38,3.92,3.9,2.38,7.15,2.23,8.42,2.18,8.8,2.16,12,2.16ZM12,0C8.74,0,8.33,0,7.05.07c-4.27.2-6.78,2.71-7,7C0,8.33,0,8.74,0,12s0,3.67.07,4.95c.2,4.27,2.71,6.78,7,7C8.33,24,8.74,24,12,24s3.67,0,4.95-.07c4.27-.2,6.78-2.71,7-7C24,15.67,24,15.26,24,12s0-3.67-.07-4.95c-.2-4.27-2.71-6.78-7-7C15.67,0,15.26,0,12,0Zm0,5.84A6.16,6.16,0,1,0,18.16,12,6.16,6.16,0,0,0,12,5.84ZM12,16a4,4,0,1,1,4-4A4,4,0,0,1,12,16ZM18.41,4.15a1.44,1.44,0,1,0,1.44,1.44A1.44,1.44,0,0,0,18.41,4.15Z" /></svg>
                            </a>
                            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center hover:bg-white hover:text-[var(--primary)] transition-all">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.5,6.19a3.02,3.02,0,0,0-2.12-2.14C19.54,3.5,12,3.5,12,3.5s-7.54,0-9.38.55A3.02,3.02,0,0,0,.5,6.19,31.67,31.67,0,0,0,0,12a31.67,31.67,0,0,0,.5,5.81,3.02,3.02,0,0,0,2.12,2.14c1.84.55,9.38.55,9.38.55s7.54,0,9.38-.55a3.02,3.02,0,0,0,2.12-2.14A31.67,31.67,0,0,0,24,12,31.67,31.67,0,0,0,23.5,6.19ZM9.5,15.57V8.43L16,12Z" /></svg>
                            </a>
                        </div>
                    </div>

                    {/* Links */}
                    <div>
                        <h3 className="text-white font-bold mb-6 text-lg">Novosti</h3>
                        <ul className="space-y-4">
                            {footerLinks.novosti.map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} className="text-white/70 hover:text-white transition-colors">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-white font-bold mb-6 text-lg">Klub</h3>
                        <ul className="space-y-4">
                            {footerLinks.klub.map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} className="text-white/70 hover:text-white transition-colors">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-white font-bold mb-6 text-lg">Podrška</h3>
                        <ul className="space-y-4">
                            {footerLinks.podrska.map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} className="text-white/70 hover:text-white transition-colors">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-white/20">
                <div className="container py-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-white/60 text-sm">
                        © 2026 Judo Klub Sarajevo. Sva prava zadržana.
                    </p>
                    <div className="flex gap-8 text-sm">
                        <Link href="/privatnost" className="text-white/60 hover:text-white">
                            Politika privatnosti
                        </Link>
                        <Link href="/uslovi" className="text-white/60 hover:text-white">
                            Uslovi korištenja
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

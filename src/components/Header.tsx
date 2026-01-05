'use client';

import Link from 'next/link';
import { useState } from 'react';

const menuItems = [
  {
    label: 'Novosti',
    href: '/novosti',
    submenu: [
      { label: 'Najave', href: '/novosti/najave' },
      { label: 'Izvještaji sa takmičenja', href: '/novosti/izvjestaji' },
      { label: 'Akademija', href: '/novosti/akademija' },
      { label: 'Intervjui', href: '/novosti/intervjui' },
      { label: 'Foto galerije', href: '/novosti/galerije' },
    ],
  },
  {
    label: 'Takmičari',
    href: '/takmicari',
    submenu: [
      { label: 'Seniori', href: '/takmicari/seniori' },
      { label: 'Juniori', href: '/takmicari/juniori' },
      { label: 'Kadeti', href: '/takmicari/kadeti' },
      { label: 'Treneri i Sensei', href: '/takmicari/treneri' },
    ],
  },
  {
    label: 'Akademija',
    href: '/akademija',
    submenu: [
      { label: 'O akademiji', href: '/akademija' },
      { label: 'Zašto judo?', href: '/akademija/zasto-judo' },
      { label: 'Poznati polaznici', href: '/akademija/polaznici' },
      { label: 'Osoblje', href: '/akademija/osoblje' },
      { label: 'Upis', href: '/akademija/upis' },
      { label: 'Kontakt', href: '/akademija/kontakt' },
    ],
  },
  {
    label: 'Klub',
    href: '/klub',
    submenu: [
      { label: 'O klubu', href: '/klub' },
      { label: 'Rukovodstvo', href: '/klub/rukovodstvo' },
      { label: 'Dojo', href: '/klub/dojo' },
      { label: 'Sponzori', href: '/klub/sponzori' },
      { label: 'Kontakt', href: '/kontakt' },
    ],
  },
  {
    label: 'Historija',
    href: '/historija',
    submenu: [
      { label: 'Historija kluba', href: '/historija' },
      { label: 'Uspjesi i medalje', href: '/historija/uspjesi' },
    ],
  },
  {
    label: 'Članstvo',
    href: '/clanstvo',
    submenu: [
      { label: 'Postani član', href: '/clanstvo' },
      { label: 'Obnova članarine', href: '/clanstvo/obnova' },
      { label: 'Provjeri status', href: '/clanstvo/status' },
    ],
  },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-[var(--primary)] text-white">
        <div className="container flex items-center justify-between py-3 text-sm">
          <div className="flex items-center gap-6">
            <Link href="/shop" className="hover:text-[var(--accent)] transition-colors opacity-90 hover:opacity-100">
              Shop
            </Link>
            <Link href="/kontakt" className="hover:text-[var(--accent)] transition-colors opacity-90 hover:opacity-100">
              Kontakt
            </Link>
          </div>
          <div className="flex items-center gap-5">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="opacity-80 hover:opacity-100 transition-opacity">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.77,7.46H14.5v-1.9c0-.9.6-1.1,1-1.1h3V.5h-4.33C10.24.5,9.5,3.44,9.5,5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4Z" /></svg>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="opacity-80 hover:opacity-100 transition-opacity">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12,2.16c3.2,0,3.58,0,4.85.07,3.25.15,4.77,1.69,4.92,4.92.06,1.27.07,1.65.07,4.85s0,3.58-.07,4.85c-.15,3.23-1.66,4.77-4.92,4.92-1.27.06-1.64.07-4.85.07s-3.58,0-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.64-.07-4.85s0-3.58.07-4.85C2.38,3.92,3.9,2.38,7.15,2.23,8.42,2.18,8.8,2.16,12,2.16ZM12,0C8.74,0,8.33,0,7.05.07c-4.27.2-6.78,2.71-7,7C0,8.33,0,8.74,0,12s0,3.67.07,4.95c.2,4.27,2.71,6.78,7,7C8.33,24,8.74,24,12,24s3.67,0,4.95-.07c4.27-.2,6.78-2.71,7-7C24,15.67,24,15.26,24,12s0-3.67-.07-4.95c-.2-4.27-2.71-6.78-7-7C15.67,0,15.26,0,12,0Zm0,5.84A6.16,6.16,0,1,0,18.16,12,6.16,6.16,0,0,0,12,5.84ZM12,16a4,4,0,1,1,4-4A4,4,0,0,1,12,16ZM18.41,4.15a1.44,1.44,0,1,0,1.44,1.44A1.44,1.44,0,0,0,18.41,4.15Z" /></svg>
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="opacity-80 hover:opacity-100 transition-opacity">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.5,6.19a3.02,3.02,0,0,0-2.12-2.14C19.54,3.5,12,3.5,12,3.5s-7.54,0-9.38.55A3.02,3.02,0,0,0,.5,6.19,31.67,31.67,0,0,0,0,12a31.67,31.67,0,0,0,.5,5.81,3.02,3.02,0,0,0,2.12,2.14c1.84.55,9.38.55,9.38.55s7.54,0,9.38-.55a3.02,3.02,0,0,0,2.12-2.14A31.67,31.67,0,0,0,24,12,31.67,31.67,0,0,0,23.5,6.19ZM9.5,15.57V8.43L16,12Z" /></svg>
            </a>
          </div>
        </div>
      </div>

      {/* Main header */}
      <nav className="glass">
        <div className="container flex items-center justify-between py-5">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-4">
            <div className="w-14 h-14 bg-[var(--primary)] rounded-full flex items-center justify-center shadow-lg">
              <span className="text-2xl font-bold text-white">柔</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-[var(--text-primary)]">Judo Klub</h1>
              <p className="text-sm text-[var(--text-muted)]">Sarajevo</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-2">
            {menuItems.map((item) => (
              <div
                key={item.label}
                className="relative group"
                onMouseEnter={() => setActiveSubmenu(item.label)}
                onMouseLeave={() => setActiveSubmenu(null)}
              >
                <Link
                  href={item.href}
                  className="px-5 py-3 text-[var(--text-primary)] hover:text-[var(--primary)] transition-colors font-medium flex items-center gap-2 rounded-lg hover:bg-[var(--background-alt)]"
                >
                  {item.label}
                  {item.submenu && (
                    <svg className="w-4 h-4 text-[var(--text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </Link>
                {item.submenu && activeSubmenu === item.label && (
                  <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-xl shadow-xl border border-[var(--border)] overflow-hidden animate-fade-in-up">
                    {item.submenu.map((subItem) => (
                      <Link
                        key={subItem.label}
                        href={subItem.href}
                        className="block px-5 py-4 text-[var(--text-secondary)] hover:bg-[var(--background-alt)] hover:text-[var(--primary)] transition-colors border-b border-[var(--border-light)] last:border-b-0"
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Link href="/clanstvo" className="btn-primary">
              Postani član
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[var(--text-primary)]"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[var(--border)] bg-white">
            <div className="container py-6">
              {menuItems.map((item) => (
                <div key={item.label} className="border-b border-[var(--border-light)] last:border-b-0">
                  <Link
                    href={item.href}
                    className="block py-4 text-[var(--text-primary)] font-medium hover:text-[var(--primary)]"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </div>
              ))}
              <Link href="/clanstvo" className="btn-primary block text-center mt-6" onClick={() => setMobileMenuOpen(false)}>
                Postani član
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

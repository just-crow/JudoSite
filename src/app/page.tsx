import Hero from "@/components/Hero";
import NewsCard from "@/components/NewsCard";
import Sidebar from "@/components/Sidebar";
import Link from "next/link";

const latestNews = [
  {
    title: "Slaviša Stojanović novi šef stručnog štaba Judo Kluba",
    excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    category: "Novosti",
    date: "3. januar 2026.",
    href: "/novosti/novi-trener",
  },
  {
    title: "Održana sjednica Skupštine: Imenovano novo rukovodstvo Kluba",
    excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation.",
    category: "Klub",
    date: "26. decembar 2025.",
    href: "/novosti/skupstina",
  },
  {
    title: "FOTO: Juniori Judo Kluba osvojili Kup BiH",
    excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aute irure dolor in reprehenderit in voluptate.",
    category: "Takmičenja",
    date: "20. decembar 2025.",
    href: "/novosti/juniori-kup",
  },
  {
    title: "Intervju: Sanin Mirvić o budućnosti kluba",
    excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Excepteur sint occaecat cupidatat non proident.",
    category: "Intervjui",
    date: "18. decembar 2025.",
    href: "/novosti/intervju-mirovic",
  },
];

const sidebarNews = [
  {
    title: "Pet mladih takmičara potpisalo ugovore sa reprezentacijom",
    category: "Akademija",
    date: "15. decembar 2025.",
    href: "/novosti/mladi-takmicari",
  },
  {
    title: "Peti kamp životnih šampiona pred nama",
    category: "Najave",
    date: "12. decembar 2025.",
    href: "/novosti/kamp-sampiona",
  },
  {
    title: "Oglas za prijem kondicionog trenera",
    category: "Klub",
    date: "10. decembar 2025.",
    href: "/novosti/oglas-trener",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <Hero />

      {/* Main Content */}
      <section className="section pt-0">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main News Column */}
            <div className="lg:col-span-2">
              {/* Section Header */}
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                  <span className="w-1 h-8 bg-[var(--secondary)] rounded-full"></span>
                  Najnovije vijesti
                </h2>
                <Link href="/novosti" className="text-[var(--secondary)] font-medium hover:underline hidden sm:block">
                  Sve vijesti →
                </Link>
              </div>

              {/* News Grid */}
              <div className="grid md:grid-cols-2 gap-6">
                {latestNews.map((news, index) => (
                  <NewsCard
                    key={index}
                    title={news.title}
                    excerpt={news.excerpt}
                    category={news.category}
                    date={news.date}
                    href={news.href}
                    size={index === 0 ? "large" : "medium"}
                  />
                ))}
              </div>

              {/* Mobile View All Link */}
              <Link href="/novosti" className="btn-secondary block text-center mt-8 sm:hidden">
                Sve vijesti →
              </Link>
            </div>

            {/* Sidebar */}
            <div>
              <Sidebar />

              {/* Additional News */}
              <div className="mt-6 card p-6">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-[var(--secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                  Ostale vijesti
                </h3>
                <div className="space-y-4">
                  {sidebarNews.map((news, index) => (
                    <NewsCard
                      key={index}
                      title={news.title}
                      category={news.category}
                      date={news.date}
                      href={news.href}
                      size="small"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section bg-gradient-to-r from-[var(--primary)] to-[var(--primary-dark)]">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Naš klub u brojkama</h2>
            <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Više od 70 godina tradicije i izvrsnosti.
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: "1952", label: "Godina osnivanja" },
              { number: "500+", label: "Aktivnih članova" },
              { number: "150+", label: "Medalja na takmičenjima" },
              { number: "25", label: "Trenera i stručnjaka" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-4xl lg:text-5xl font-bold gradient-text mb-2">{stat.number}</p>
                <p className="text-[var(--text-secondary)]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Academy CTA Section */}
      <section className="section">
        <div className="container">
          <div className="card p-8 lg:p-12 relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute -right-20 -top-20 w-80 h-80 bg-[var(--secondary)] rounded-full"></div>
              <div className="absolute -left-20 -bottom-20 w-60 h-60 bg-[var(--secondary)] rounded-full"></div>
            </div>

            <div className="relative z-10 grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <span className="tag mb-4">Akademija</span>
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                  Započni svoje judo putovanje
                </h2>
                <p className="text-[var(--text-secondary)] mb-6">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Naša akademija nudi programe za sve uzraste i nivoe iskustva.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link href="/akademija/upis" className="btn-primary">
                    Upiši se sada
                  </Link>
                  <Link href="/akademija" className="btn-secondary">
                    Saznaj više
                  </Link>
                </div>
              </div>
              <div className="relative h-64 lg:h-80 rounded-xl overflow-hidden bg-gradient-to-br from-[var(--surface-light)] to-[var(--surface)]">
                <div className="absolute inset-0 flex items-center justify-center opacity-20">
                  <svg className="w-32 h-32 text-[var(--secondary)]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                </div>
                <div className="absolute bottom-4 left-4 right-4 text-center text-[var(--text-muted)] text-sm">
                  [Placeholder za sliku akademije]
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Photo Gallery Preview */}
      <section className="section pt-0">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <span className="w-1 h-8 bg-[var(--secondary)] rounded-full"></span>
              Foto galerija
            </h2>
            <Link href="/novosti/galerije" className="text-[var(--secondary)] font-medium hover:underline">
              Sve galerije →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <Link
                key={i}
                href={`/novosti/galerije/galerija-${i}`}
                className="group relative aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-[var(--primary)] to-[var(--surface)]"
              >
                <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:opacity-30 transition-opacity">
                  <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
                  </svg>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform">
                  <p className="text-white text-sm font-medium">Galerija {i}</p>
                </div>
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-[var(--secondary)] rounded-xl transition-all"></div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

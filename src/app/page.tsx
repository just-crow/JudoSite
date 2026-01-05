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
      <section className="section bg-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="decorative-circle w-[600px] h-[600px] -top-64 -left-64 opacity-[0.03]" />

        <div className="container relative z-10">
          <div className="grid lg:grid-cols-3 gap-10 lg:gap-16">
            {/* Main News Column */}
            <div className="lg:col-span-2">
              {/* Section Header */}
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-4">
                  <div className="w-1 h-8 bg-[var(--accent)] rounded-full"></div>
                  <h2 className="text-3xl font-bold text-[var(--text-primary)]">Najnovije vijesti</h2>
                </div>
                <Link
                  href="/novosti"
                  className="group text-[var(--primary)] font-bold hover:text-[var(--primary-light)] hidden sm:flex items-center gap-2 text-sm transition-all"
                >
                  Sve vijesti
                  <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>

              {/* News Grid */}
              <div className="grid md:grid-cols-2 gap-8">
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
              <Link href="/novosti" className="btn-secondary w-full justify-center mt-10 sm:hidden py-4">
                Sve vijesti
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

            {/* Sidebar */}
            <div className="space-y-10">
              <Sidebar />

              {/* Additional News */}
              <div className="card p-8 lg:p-10 rounded-3xl">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-10 h-10 rounded-lg bg-[var(--secondary)] flex items-center justify-center text-white">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-[var(--text-primary)]">
                    Ostale vijesti
                  </h3>
                </div>
                <div className="space-y-6">
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
      <section className="section bg-[var(--primary)] section-pattern relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-12 left-12 w-32 h-32 bg-white/5 rounded-full animate-float" />
        <div className="absolute bottom-12 right-12 w-24 h-24 bg-white/5 rounded-full animate-float" style={{ animationDelay: '2s' }} />

        <div className="container relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Naš klub u brojkama
            </h2>
            <p className="text-white/80 max-w-2xl mx-auto text-xl font-light">
              Više od 70 godina tradicije i izvrsnosti u sportu.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {[
              { number: "1952", label: "Godina osnivanja" },
              { number: "500+", label: "Aktivnih članova" },
              { number: "150+", label: "Medalja na takmičenjima" },
              { number: "25", label: "Trenera i stručnjaka" },
            ].map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="inline-block p-6 lg:p-8 rounded-3xl bg-white/10 backdrop-blur-sm group-hover:bg-white/20 transition-all duration-300 group-hover:scale-105 mb-4 border border-white/10">
                  <p className="text-4xl lg:text-6xl font-bold text-white tracking-tight">{stat.number}</p>
                </div>
                <p className="text-white/80 text-lg font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Academy CTA Section */}
      <section className="section bg-gradient-to-b from-[var(--background-alt)] to-[var(--background)] relative overflow-hidden">
        <div className="container relative z-10">
          <div className="card p-10 lg:p-16 relative overflow-hidden rounded-[40px] border border-white">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
              <div className="absolute -right-24 -top-24 w-[500px] h-[500px] bg-[var(--primary)] rounded-full animate-float-slow"></div>
            </div>

            <div className="relative z-10 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div>
                <span className="tag mb-6 inline-block">Akademija</span>
                <h2 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                  <span className="gradient-text">Započni svoje judo putovanje</span>
                </h2>
                <p className="text-[var(--text-secondary)] mb-8 text-lg leading-relaxed">
                  Naša akademija nudi programe za sve uzraste i nivoe iskustva. Treniraj sa najboljima u najmodernijim uslovima.
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

              <div className="relative h-[350px] lg:h-[450px] rounded-[32px] overflow-hidden image-placeholder shadow-xl group border-4 border-white">
                <div className="absolute inset-0 flex items-center justify-center opacity-15">
                  <svg className="w-32 h-32 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                </div>
                {/* Glowing border on hover */}
                <div className="absolute inset-0 border-4 border-transparent group-hover:border-[var(--accent)] rounded-[32px] transition-all duration-500"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Photo Gallery Preview */}
      <section className="section bg-white relative overflow-hidden">
        <div className="container relative z-10">
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-4">
              <div className="w-1 h-8 bg-[var(--accent)] rounded-full"></div>
              <h2 className="text-3xl font-bold text-[var(--text-primary)]">Foto galerija</h2>
            </div>
            <Link
              href="/novosti/galerije"
              className="group text-[var(--primary)] font-bold hover:text-[var(--primary-light)] flex items-center gap-2 text-sm transition-all"
            >
              Sve galerije
              <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
            {[1, 2, 3, 4].map((i) => (
              <Link
                key={i}
                href={`/novosti/galerije/galerija-${i}`}
                className="group relative aspect-square rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500"
              >
                {/* Animated background */}
                <div className="absolute inset-0 image-placeholder" style={{ animationDelay: `${i * 2}s` }}>
                  <div className="absolute inset-0 flex items-center justify-center opacity-15 transition-opacity">
                    <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
                    </svg>
                  </div>
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                  <p className="text-white text-lg font-bold translate-y-2 group-hover:translate-y-0 transition-transform duration-300">Galerija {i}</p>
                </div>

                {/* Glowing border effect */}
                <div className="absolute inset-0 border-4 border-transparent group-hover:border-[var(--accent)] rounded-3xl transition-all duration-300"></div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

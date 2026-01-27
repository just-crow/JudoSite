import Hero from "@/components/Hero";
import NewsCard from "@/components/NewsCard";
import Image from "next/image";
import CompetitionsPreview from "@/components/CompetitionsPreview";
import { getNews } from "@/actions/news";
import Link from "next/link";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Judo Klub Željezničar | Početna",
  description: "Dobrodošli na službenu stranicu Judo Kluba Željezničar. Mjesto gdje se rađaju šampioni.",
  alternates: {
    canonical: '/',
  },
};

export default async function Home() {
  const allNews = await getNews(10);

  // Logic: 
  // 1. Prioritize Featured News
  // 2. Fill slots up to 3 for Hero

  const featured = allNews.filter(n => n.featured);
  const others = allNews.filter(n => !n.featured);

  // Create a pool of "potential hero news" starting with featured
  const potentialHeroNews = [...featured];

  // If we don't have enough featured to fill 3 slots, take from others (latest)
  if (potentialHeroNews.length < 3) {
    const needed = 3 - potentialHeroNews.length;
    potentialHeroNews.push(...others.slice(0, needed));
  }

  // Now take exactly the top 3 for Hero
  const heroNews = potentialHeroNews.slice(0, 3);

  // For the list below, we show everything that is NOT in the heroNews list
  // To avoid duplicates, we can filter by ID
  const heroIds = new Set(heroNews.map(n => n.id));
  const listNews = allNews.filter(n => !heroIds.has(n.id));

  return (
    <main className="min-h-screen bg-[var(--background)]">
      <Hero featuredNews={heroNews} />

      {/* Stats Section with subtle pattern background */}
      <section className="relative py-20 bg-[var(--surface)] overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-[40%] pointer-events-none bg-[#18488f]"
          style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, var(--text-muted) 1px, transparent 0)', backgroundSize: '40px 40px' }} />

        <div className="container relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center group p-6 rounded-2xl hover:bg-white/5 transition-colors">
              <div className="text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[var(--primary)] to-[var(--primary-light)] mb-2 group-hover:scale-110 transition-transform duration-300">30+</div>
              <div className="text-[var(--text-secondary)] font-medium">Godina Tradicije</div>
            </div>
            <div className="text-center group p-6 rounded-2xl hover:bg-white/5 transition-colors">
              <div className="text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[var(--primary)] to-[var(--primary-light)] mb-2 group-hover:scale-110 transition-transform duration-300">500+</div>
              <div className="text-[var(--text-secondary)] font-medium">Članova</div>
            </div>
            <div className="text-center group p-6 rounded-2xl hover:bg-white/5 transition-colors">
              <div className="text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[var(--primary)] to-[var(--primary-light)] mb-2 group-hover:scale-110 transition-transform duration-300">50+</div>
              <div className="text-[var(--text-secondary)] font-medium">Državnih Prvaka</div>
            </div>
            <div className="text-center group p-6 rounded-2xl hover:bg-white/5 transition-colors">
              <div className="text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[var(--primary)] to-[var(--primary-light)] mb-2 group-hover:scale-110 transition-transform duration-300">10+</div>
              <div className="text-[var(--text-secondary)] font-medium">Trenera</div>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Competitions Preview */}
      <section className="py-12 bg-white border-y border-[var(--border)]">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
            <h2 className="text-2xl font-bold text-[var(--text-primary)] flex items-center gap-3">
              <span className="w-1.5 h-6 bg-[var(--accent)] rounded-full"></span>
              Nadolazeća Takmičenja
            </h2>
            <Link href="/kalendar" className="text-sm font-bold text-[var(--primary)] hover:underline flex items-center gap-1">
              KALENDAR TAKMIČENJA
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
          </div>

          {/* We can fetch competitions here or pass them. Let's make Home async and fetch. */}
          <CompetitionsPreview />
        </div>
      </section>

      {/* Latest News Section */}
      <section className="section relative">
        {/* Floating decorative shape */}
        <div className="absolute top-20 right-0 w-96 h-96 bg-[var(--primary-light)]/5 rounded-full blur-3xl animate-pulse-slow -z-10" />

        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4 flex items-center gap-3">
                <span className="w-2 h-8 rounded-full bg-[var(--primary)] block"></span>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[var(--text-primary)] to-[var(--text-secondary)]">
                  Najnovije iz Kluba
                </span>
              </h2>
              <p className="text-[var(--text-secondary)] text-lg">
                Pratite naše uspjehe, takmičenja i događaje. Budite u toku sa dešavanjima u Judo Klubu Željezničar.
              </p>
            </div>
            <Link href="/novosti" className="btn-secondary group whitespace-nowrap">
              Sve Novosti
              <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {listNews.length > 0 ? (
              listNews.map((news, index) => (
                <NewsCard
                  key={news.id}
                  title={news.title}
                  excerpt={news.excerpt}
                  category={news.tags?.[0] || "Novosti"}
                  date={news.date}
                  image={news.image}
                  href={`/novosti/${news.id}`}
                  size={index === 0 ? 'large' : 'medium'} // First item is large
                />
              ))
            ) : (
              <div className="col-span-3 text-center py-12 text-[var(--text-secondary)] bg-[var(--surface)] rounded-2xl border border-[var(--border)]">
                <p className="text-lg">Sve novosti su prikazane u zaglavlju.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* About Section Preview */}
      <section className="section bg-[var(--surface)] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--surface)] via-transparent to-[var(--surface)] z-10 pointer-events-none" />

        <div className="container relative z-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <span className="tag animate-pulse-slow">O Nama</span>
              <h2 className="text-3xl lg:text-5xl font-bold leading-tight">
                Više od sporta - <span className="gradient-text">Način života</span>
              </h2>
              <p className="text-[var(--text-secondary)] text-lg leading-relaxed">
                Judo Klub Željezničar nije samo mjesto za trening. To je zajednica u kojoj gradimo karakter,
                učimo disciplini i stvaramo prijateljstva za cijeli život. Naši treneri su posvećeni
                razvoju svakog pojedinca, od početnika do vrhunskog takmičara.
              </p>

              <ul className="space-y-4">
                {[
                  "Stručni trenerski kadar sa licencama",
                  "Moderno opremljena dvorana (Dojo)",
                  "Programi za sve uzraste",
                  "Redovna takmičenja i kampovi"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-[var(--text-primary)] font-medium">
                    <div className="w-6 h-6 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    {item}
                  </li>
                ))}
              </ul>

              <Link href="/klub" className="btn-primary inline-flex mt-4">
                Saznaj Više o Klubu
              </Link>
            </div>

            <div className="relative">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl relative group">
                <div className="absolute inset-0 bg-gradient-to-tr from-[var(--primary)]/20 to-transparent z-10 group-hover:opacity-0 transition-opacity duration-500" />
                {/* Replace with actual club photo or high quality placeholder */}
                <Image
                  src="/images/486677264_620710237636162_8126068584696942124_n.jpg"
                  alt="Judo Klub Željezničar Tim"
                  fill
                  className="object-cover transform transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl max-w-xs hidden md:block animate-float">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">Škola Juda</div>
                    <div className="text-sm text-gray-500">Upis u toku</div>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  Pridružite se našoj školi juda i postanite dio pobjedničkog tima!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[var(--primary)] relative overflow-hidden text-white">
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--primary-dark)] to-[var(--primary)] opacity-90" />

        <div className="container relative z-10 text-center">
          <h2 className="text-3xl lg:text-5xl font-bold mb-6">Spremni za početak?</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Prvi trening je besplatan. Dođite i uvjerite se zašto smo najbolji judo klub u gradu.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/kontakt" className="px-8 py-4 bg-white text-[var(--primary-dark)] rounded-xl font-bold hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl hover:-translate-y-1 transform duration-300">
              Kontaktirajte Nas
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Historija | Judo Klub Željezničar",
    description: "Historija Judo Kluba Željezničar od osnivanja 1952. godine do danas.",
};

const timeline = [
    {
        year: "1952",
        title: "Osnivanje kluba",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Judo Klub Željezničar osnovan je kao jedan od prvih judo klubova u Jugoslaviji.",
    },
    {
        year: "1965",
        title: "Prva zlatna medalja",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Naš prvi takmičar osvojio je zlato na Državnom prvenstvu.",
    },
    {
        year: "1978",
        title: "Otvaranje nove dvorane",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Otvoren je novi dojo sa modernom opremom.",
    },
    {
        year: "1984",
        title: "Olimpijske igre u Sarajevu",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Naši članovi učestvovali su u promociji sporta tokom Zimskih olimpijskih igara.",
    },
    {
        year: "1995",
        title: "Obnova nakon rata",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Obnovili smo aktivnosti kluba i nastavili sa tradicijom juda.",
    },
    {
        year: "2010",
        title: "100 medalja na međunarodnim takmičenjima",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dostigli smo značajnu prekretnicu u historiji kluba.",
    },
    {
        year: "2024",
        title: "Novo rukovodstvo",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Izabrano je novo rukovodstvo sa ambicioznim planovima za budućnost.",
    },
];

const achievements = [
    { label: "Državna prvenstva", count: "45" },
    { label: "Međunarodne medalje", count: "150+" },
    { label: "Reprezentativci BiH", count: "30+" },
    { label: "Generacija takmičara", count: "70+" },
];

export default function HistorijaPage() {
    return (
        <>
            {/* Hero */}
            <section className="relative py-20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)] via-[var(--primary-dark)] to-[var(--background)]"></div>
                <div className="container relative z-10">
                    <div className="max-w-3xl">
                        <span className="tag mb-4">Historija</span>
                        <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                            Više od 70 godina tradicije
                        </h1>
                        <p className="text-xl text-white">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Od skromnih početaka 1952. godine do danas, naš klub je postao sinonim za judo izvrsnost.
                        </p>
                    </div>
                </div>
            </section>

            {/* Achievements Stats */}
            <section className="section">
                <div className="container">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                        {achievements.map((item, index) => (
                            <div key={index} className="card p-6 text-center">
                                <p className="text-4xl font-bold gradient-text mb-2">{item.count}</p>
                                <p className="text-[var(--text-secondary)]">{item.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Timeline */}
            <section className="section pt-0">
                <div className="container">
                    <h2 className="text-3xl font-bold text-[var(--secondary)] mb-12 text-center">Naša priča</h2>
                    <div className="relative">
                        {/* Timeline line */}
                        <div className="absolute left-4 lg:left-1/2 top-0 bottom-0 w-0.5 bg-[var(--border)] transform lg:-translate-x-1/2"></div>

                        {timeline.map((event, index) => (
                            <div
                                key={index}
                                className={`relative flex flex-col lg:flex-row gap-8 mb-12 last:mb-0 ${index % 2 === 0 ? "lg:flex-row-reverse" : ""
                                    }`}
                            >
                                {/* Year badge */}
                                <div className="absolute left-4 lg:left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-[var(--secondary)] flex items-center justify-center z-10">
                                    <div className="w-3 h-3 rounded-full bg-[var(--primary-dark)]"></div>
                                </div>

                                {/* Content */}
                                <div className={`lg:w-1/2 ml-16 lg:ml-0 ${index % 2 === 0 ? "lg:pr-16 lg:text-right" : "lg:pl-16"}`}>
                                    <span className="text-[var(--secondary)] font-bold text-xl">{event.year}</span>
                                    <h3 className="text-xl font-bold text-black mt-2 mb-3">{event.title}</h3>
                                    <p className="text-[var(--text-secondary)]">{event.description}</p>
                                </div>

                                {/* Spacer for alternating layout */}
                                <div className="hidden lg:block lg:w-1/2"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Notable Alumni */}
            <section className="section">
                <div className="container">
                    <h2 className="text-3xl font-bold text-[var(--secondary)] mb-8 flex items-center gap-3">
                        <span className="w-1 h-8 bg-[var(--secondary)] rounded-full"></span>
                        Poznati bivši članovi
                    </h2>
                    <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="card p-6 text-center">
                                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--surface)] flex items-center justify-center">
                                    <span className="text-2xl text-[var(--secondary)]">👤</span>
                                </div>
                                <h3 className="text-lg font-bold text-white">Ime Prezime</h3>
                                <p className="text-[var(--text-secondary)] text-sm">Lorem ipsum dolor sit amet</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}

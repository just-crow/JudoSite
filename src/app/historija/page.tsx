import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Historija | Judo Klub Željezničar",
    description: "Historija Judo Kluba Željezničar od osnivanja 1958. godine do danas.",
};

const timeline = [
    {
        year: "1958",
        title: "Osnivanje kluba",
        description: "Džudo klub “Željezničar” je formiran 1958. godine.",
    },
    {
        year: "1973/1974",
        title: "Ulazak u Prvu ligu Jugoslavije",
        description: "JUDO klub “Željezničar” je ušao u Prvu ligu Jugoslavije.",
    },
    {
        year: "1981/1982",
        title: "Prvaci Jugoslavije",
        description: "Klub je bio prvak Jugoslavije i osvojio III mjesto u Evropi.",
    },
    {
        year: "1983/1984",
        title: "Prvaci Kupa Jugoslavije",
        description: "Klub je bio prvak Kupa Jugoslavije i drugi put viceprvak u Evropi.",
    },
    {
        year: "1984–1992",
        title: "Period uspješnih takmičenja",
        description: "U ovom periodu klub je imao veoma uspješna takmičenja.",
    },
    {
        year: "1992–1995",
        title: "Treninzi u “FIS-u” Sarajevo",
        description: "Tokom ratnog perioda treninzi su se održavali u “FIS-u” Sarajevo.",
    },
    {
        year: "1993",
        title: "Početak Memorijalnog turnira “Vinko Šamarlić”",
        description: "Organizovan je prvi Memorijalni turnir u opkoljenom Sarajevu u čast heroja, dugogodišnjeg člana kluba i trenera Vinka Šamarlića.",
    },
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
                            Više od 60 godina tradicije
                        </h1>
                        <p className="text-xl text-white">
                            Klub sa dugom tradicijom vrhunskih rezultata i snažnim uticajem na razvoj juda u Sarajevu i Bosni i Hercegovini.
                        </p>
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

            {/* Champions and legacy */}
            <section className="section">
                <div className="container">
                    <div className="space-y-6 max-w-5xl mx-auto">
                        <div className="card p-6 md:p-8">
                            <h2 className="text-2xl font-bold text-[var(--secondary)] mb-4">Šampioni kluba</h2>
                            <p className="text-[var(--text-secondary)] leading-relaxed">
                                U dosadašnjem periodu klub je iznjedrio mnoge šampione i to u bivšoj Jugoslaviji: Jokić, Gavrilović, Mehičević, Mučibabić, Todorović, Kusmuk i drugi.
                                Zatim i poslijeratne šampione: Amel Mekić (evropski prvak), Nemanja Majdov (svjetski i evropski prvak), Kačar Slobodan, braća Lukač i drugi.
                            </p>
                        </div>

                        <div className="card p-6 md:p-8">
                            <h2 className="text-2xl font-bold text-[var(--secondary)] mb-4">Uloga kluba u razvoju juda</h2>
                            <p className="text-[var(--text-secondary)] leading-relaxed">
                                Ono što je bitno napomenuti jeste da su većinu JUDO klubova koji egzistiraju na području Sarajeva osnovali prvotimci JUDO KLUBA “Željezničar”.
                            </p>
                        </div>

                        <div className="card p-6 md:p-8">
                            <h2 className="text-2xl font-bold text-[var(--secondary)] mb-4">Ciljevi projekta</h2>
                            <p className="text-[var(--text-secondary)] leading-relaxed mb-3">
                                <span className="underline font-semibold text-[var(--text-primary)]">Sveukupni cilj projekta je:</span>{" "}
                                Poboljšanje kvaliteta života učenika kroz fizički, mentalni i socijalni razvoj.
                            </p>
                            <p className="text-[var(--text-secondary)] leading-relaxed">
                                <span className="underline font-semibold text-[var(--text-primary)]">Specifični cilj projekta:</span>{" "}
                                Razvijanje zdravih stilova života za učenike, sa posebnim akcentom na učenike sa poteškoćama.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

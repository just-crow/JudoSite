import { getCompetitors } from "@/actions/competitors";
import CompetitorsList from "@/components/CompetitorsList";
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Takmičari | Judo Klub Željezničar",
    description: "Upoznajte naše takmičare - ponos našeg kluba.",
};

export default async function TakmicariPage() {
    const competitors = await getCompetitors();

    return (
        <div className="min-h-screen bg-[var(--background-alt)]">
            {/* Header */}
            <section className="bg-[var(--primary)] text-white py-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10" />
                <div className="container relative z-10 text-center">
                    <h1 className="text-4xl lg:text-5xl font-bold mb-4">Naši Takmičari</h1>
                    <p className="text-xl opacity-90 max-w-2xl mx-auto">
                        Upoznajte šampione koji predstavljaju boje Željezničara na domaćim i međunarodnim borilištima.
                    </p>
                </div>
            </section>

            {/* Content using Client Component for Filtering */}
            <section className="section">
                <div className="container">
                    <CompetitorsList competitors={competitors} />
                </div>
            </section>
        </div>
    );
}

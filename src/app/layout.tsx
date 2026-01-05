import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  title: "Judo Klub Sarajevo | Zvanična internet stranica",
  description: "Zvanična internet stranica Judo Kluba Sarajevo. Od 1952. godine razvijamo judo kulturu i sportsku izvrsnost.",
  keywords: "judo, sarajevo, klub, borilačke vještine, sport, djeca, takmičenja",
  openGraph: {
    title: "Judo Klub Sarajevo",
    description: "Zvanična internet stranica Judo Kluba Sarajevo",
    type: "website",
    locale: "bs_BA",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bs">
      <body className={`${inter.variable} antialiased bg-white`}>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

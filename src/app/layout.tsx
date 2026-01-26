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
  metadataBase: new URL('https://judoklubzeljeznicar.ba'),
  title: "Judo Klub Željezničar | Zvanična internet stranica",
  description: "Zvanična internet stranica Judo Kluba Željezničar. Od 1952. godine razvijamo judo kulturu i sportsku izvrsnost.",
  keywords: ["judo", "sarajevo", "klub", "željezničar", "borilačke vještine", "sport", "djeca", "takmičenja"],
  authors: [{ name: 'Judo Klub Željezničar' }],
  publisher: 'Judo Klub Željezničar',
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Judo Klub Željezničar",
    description: "Zvanična internet stranica Judo Kluba Željezničar",
    type: "website",
    locale: "bs_BA",
    siteName: "Judo Klub Željezničar",
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

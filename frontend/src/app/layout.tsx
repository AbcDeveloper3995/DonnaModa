import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Donna Moda | Boutique de Moda Femenina y Estilo Premium",
  description: "Descubre la colección exclusiva de Donna Moda. Ropa de mujer, vestidos elegantes, outfits casuales y las últimas tendencias de temporada. Visítanos en Puerto Morelos.",
  keywords: ["moda femenina", "boutique", "ropa de mujer", "vestidos", "tendencias", "Puerto Morelos", "Donna Moda", "fashion"],
  openGraph: {
    title: "Donna Moda | Boutique Inmersiva",
    description: "Tu estilo comienza aquí. Colección exclusiva y atención cercana en Puerto Morelos.",
    url: "https://donnamoda.com",
    siteName: "Donna Moda",
    images: [
      {
        url: "/multimedia/5.jpg",
        width: 1200,
        height: 630,
        alt: "Donna Moda Colección",
      },
    ],
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Donna Moda | Tu estilo comienza aquí",
    description: "Descubre prendas que hagan match con tu personalidad. Colecciones premium.",
    images: ["/multimedia/5.jpg"],
  },
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${playfair.variable} antialiased dark`}>
      <body className="min-h-screen flex flex-col bg-zinc-950 text-zinc-50 overflow-x-hidden selection:bg-zinc-800 selection:text-white">
        {children}
      </body>
    </html>
  );
}

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
  title: "DonnaModa | Boutique Inmersiva",
  description: "Descubre la nueva colección de DonnaModa en una experiencia inmersiva.",
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

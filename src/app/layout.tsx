import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display, Great_Vibes } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const greatVibes = Great_Vibes({
  variable: "--font-great-vibes",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Timmayya | AutoCAD Commercial & Interior Designer",
  description: "Professional AutoCAD Commercial Designer based in Bengaluru. Specialized in commercial layouts, interior planning, hotel kitchen designs, and architectural drawings. Expert in restaurant layouts, kitchen equipment planning, and working drawings.",
  keywords: ["AutoCAD", "Commercial Design", "Interior Design", "Hotel Kitchen Design", "Architectural Drawings", "Bengaluru", "Restaurant Layout", "Space Planning"],
  authors: [{ name: "Timmayya" }],
  icons: {
    icon: "/tn-logo.png",
  },
  openGraph: {
    title: "Timmayya | AutoCAD Commercial & Interior Designer",
    description: "Professional AutoCAD Commercial Designer - Restaurant layouts, Kitchen equipment planning, Interior design, Working drawings",
    url: "https://timmayya.com",
    siteName: "Timmayya",
    type: "website",
    images: ["/tn-logo.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Timmayya | AutoCAD Commercial & Interior Designer",
    description: "Professional AutoCAD Commercial Designer based in Bengaluru",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} ${greatVibes.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}

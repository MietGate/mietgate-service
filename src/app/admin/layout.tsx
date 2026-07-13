import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
 metadataBase: new URL("https://service.mietgate.de"),

  title: "MietGate – Der neue Standard für Mietbewerbungen",

  description:
    "MietGate übernimmt deine Mietbewerbungen. Erstelle dein Suchprofil und erhalte schneller Besichtigungstermine – ohne Bewerbungsstress.",

  keywords: [
    "Mietbewerbung",
    "Wohnung finden",
    "Wohnung mieten",
    "MietGate",
    "Wohnungssuche",
    "Besichtigung",
    "Mietservice",
    "Mietbewerbungen",
  ],

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "MietGate – Der neue Standard für Mietbewerbungen",
    description:
      "Wohnung finden. Ohne Bewerbungsstress. MietGate übernimmt deine Mietbewerbungen.",
    url: "https://service.mietgate.de",
    siteName: "MietGate",
    locale: "de_DE",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "MietGate – Der neue Standard für Mietbewerbungen",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "MietGate – Der neue Standard für Mietbewerbungen",
    description:
      "Wohnung finden. Ohne Bewerbungsstress.",
    images: ["/og-image.png"],
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="de"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}
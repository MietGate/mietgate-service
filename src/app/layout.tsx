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
  title: "MietGate | Dein Mietbewerbungsservice",
  description:
    "MietGate übernimmt deine Mietbewerbungen. Erstelle dein Suchprofil und erhalte passende Besichtigungstermine für deine nächste Wohnung.",

  metadataBase: new URL("https://service.mietgate.de"),

  openGraph: {
    title: "MietGate | Dein Mietbewerbungsservice",
    description:
      "Mietbewerbungen einfach verwalten. Der neue Standard für Mietbewerbungen.",
    url: "https://service.mietgate.de",
    siteName: "MietGate",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "MietGate",
      },
    ],
    locale: "de_DE",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "MietGate | Dein Mietbewerbungsservice",
    description:
      "Mietbewerbungen einfach verwalten.",
    images: ["/og-image.png"],
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
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}



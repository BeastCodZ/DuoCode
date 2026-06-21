import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DuoCode | Duolingo for LeetCode",
  metadataBase: new URL("https://duocodz.vercel.app"),
  description: "LeetCode. Every developer starts here. Not every developer is seen again. The last person who forgot their streak disappeared under mysterious circumstances. We found his keyboard. Nothing else. Maintain your streak. Ignore the scratching behind the Medium questions. Programa o desaparece. The Owl sends his regards.",
  keywords: ["LeetCode", "coding", "gamified", "competition", "stats", "friends", "DuoCode", "BeastCodZ"],
  authors: [{ name: "BeastCodZ" }],
  openGraph: {
    title: "DuoCode | Duolingo for LeetCode",
    description: "LeetCode. Every developer starts here. Not every developer is seen again. The last person who forgot their streak disappeared under mysterious circumstances. We found his keyboard. Nothing else. Maintain your streak. Ignore the scratching behind the Medium questions. Programa o desaparece. The Owl sends his regards.",
    type: "website",
    url: "https://duocodz.vercel.app",
    siteName: "DuoCode",
    images: [
      {
        url: "/opengraph.png",
        alt: "DuoCode | Duolingo for LeetCode",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DuoCode | Duolingo for LeetCode",
    description: "LeetCode. Every developer starts here. Not every developer is seen again. The last person who forgot their streak disappeared under mysterious circumstances. We found his keyboard. Nothing else. Maintain your streak. Ignore the scratching behind the Medium questions. Programa o desaparece. The Owl sends his regards.",
    images: ["/opengraph.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <body className={`${nunito.className} ${nunito.variable} min-h-full font-sans`}>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "UniLeet - Duolingo for LeetCode",
  description: "Compare your LeetCode stats with friends in a vibrant, gamified interface.",
  keywords: ["LeetCode", "coding", "gamified", "competition", "stats", "friends", "UniLost", "BeastCodZ"],
  authors: [{ name: "BeastCodZ" }],
  openGraph: {
    title: "UniLeet - Duolingo for LeetCode",
    description: "Compare your LeetCode stats with friends in a vibrant, gamified interface.",
    type: "website",
    url: "https://unileet.com",
    siteName: "UniLeet",
    images: [
      {
        url: "/opengraph.jpg",
        alt: "UniLeet - Gamified LeetCode Competition",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "UniLeet - Duolingo for LeetCode",
    description: "Compare your LeetCode stats with friends in a vibrant, gamified interface.",
    images: ["/opengraph.jpg"],
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
      className={`${nunito.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}

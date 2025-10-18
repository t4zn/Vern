import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Vern – AI Game Builder",
  description: "Build games through conversation. Create browser games using powerful AI models with simple text prompts.",
  keywords: ["AI", "game builder", "OpenRouter", "GPT", "Claude", "game development", "browser games", "minimal"],
  authors: [{ name: "Vern AI" }],
  openGraph: {
    title: "Vern – AI Game Builder",
    description: "Build games through conversation",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vern – AI Game Builder",
    description: "Build games through conversation",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}

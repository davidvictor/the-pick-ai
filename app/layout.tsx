import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from "next/font/google";
import { UserProvider } from '@/lib/auth';
import { ThemeProvider as NextThemesProvider } from "next-themes";
//import type { ThemeProviderProps } from "next-themes";
import { getUser } from '@/lib/db/queries';
import "../styles/font-override.css";
import "../styles/markdown.css";
import "../styles/custom.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The Pick",
  description: "AI powerered bets that win",
  openGraph: {
    title: "The Pick – AI-Powered Sports Betting Predictions",
    description:
      "Harness the power of AI to elevate your betting strategy. The Pick delivers cutting-edge, data-backed predictions for smarter sports wagering.",
    url: "https://thepick.ai",
    siteName: "The Pick",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Pick – AI-Powered Sports Betting Predictions",
    description: "Experience data-driven sports betting insights and winning predictions powered by advanced AI. Bet smarter with The Pick.",
    images: "/og-image.png",
  },
};

export const viewport: Viewport = {
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let userPromise = getUser();

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
          <UserProvider userPromise={userPromise}>{children}</UserProvider>
        </NextThemesProvider>
      </body>
    </html>
  );
}

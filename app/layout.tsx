import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from "next/font/google";
import { UserProvider } from '@/lib/auth';
import { ThemeProvider as NextThemesProvider } from "next-themes";
import HomeLayoutWrapper from './layout-wrapper';
import "../styles/font-override.css";
import "../styles/markdown.css";
import "../styles/marquee.css";
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
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'),
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

// Apply our dynamic rendering wrapper to the RootLayout
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Use a null Promise for userPromise - components that need auth
  // will get it from our auth context which uses headers
  const userPromise = Promise.resolve(null);

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
          <UserProvider userPromise={userPromise}>
            <HomeLayoutWrapper>
              {children}
            </HomeLayoutWrapper>
          </UserProvider>
        </NextThemesProvider>
      </body>
    </html>
  );
}

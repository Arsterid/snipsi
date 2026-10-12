import type { Metadata, Viewport } from "next";
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

const siteTitle = "SnipSI - Same video. Cleaner link.";

const siteDescription =
  "A tiny, friendly tool that removes the extra si parameter from YouTube share links while keeping the rest of the link intact.";

export const metadata: Metadata = {
  title: {
    default: siteTitle,
    template: "%s | SnipSI",
  },
  description: siteDescription,
  applicationName: "SnipSI",
  openGraph: {
    type: "website",
    siteName: "SnipSI",
    title: siteTitle,
    description: siteDescription,
  },
  twitter: {
    card: "summary",
    title: siteTitle,
    description: siteDescription,
  },
};

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    {
      media: "(prefers-color-scheme: light)",
      color: "#f7f8fb",
    },
    {
      media: "(prefers-color-scheme: dark)",
      color: "#101116",
    },
  ],
};

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>{children}</body>
    </html>
  );
}

import { Metadata } from 'next';
import { Silkscreen, Zen_Dots } from 'next/font/google';
import * as React from 'react';

import '../styles/globals.css';

import { cn } from '@/lib/utils';

import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';
import { TailwindIndicator } from '@/components/tailwind-indicator';

import { siteConfig } from '@/constant/config';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.title}`,
  },
  description: siteConfig.description,
  robots: { index: true, follow: true },
  // !STARTERCONF this is the default favicon, you can generate your own from https://realfavicongenerator.net/
  // ! copy to /favicon folder
  icons: {
    icon: '/favicon/favicon.ico',
    shortcut: '/favicon/favicon-16x16.png',
    apple: '/favicon/apple-touch-icon.png',
  },
  manifest: `/favicon/site.webmanifest`,
  openGraph: {
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.title,
    images: [`${siteConfig.url}/images/og.jpg`],
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    images: [`${siteConfig.url}/images/og.jpg`],
    // creator: '@th_clarence',
  },
  // authors: [
  //   {
  //     name: 'Theodorus Clarence',
  //     url: 'https://theodorusclarence.com',
  //   },
  // ],
};

const silkscreen = Silkscreen({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-silkscreen',
});

const zenDots = Zen_Dots({
  weight: ['400'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-zen-dots',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body
        className={cn(
          'bg-background font-zenDots flex min-h-screen flex-col justify-between overflow-x-hidden antialiased',
          zenDots.variable,
          silkscreen.variable
        )}
      >
        <Header />
        {children}
        <TailwindIndicator />
        <Footer />
      </body>
    </html>
  );
}

import { Analytics } from '@vercel/analytics/react';
import { Inter, Oswald } from 'next/font/google';
import type { Metadata } from 'next';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const oswald = Oswald({ subsets: ['latin'], variable: '--font-oswald' });

export const metadata: Metadata = {
  title: 'FTC Game Manual AI',
  description: 'Get cited AI answers to questions about the FTC Game Manual.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${oswald.variable}`}>
      <head>
        <link rel="icon" href="/first.png" />
      </head>
      <body>
        {children}
        <Analytics />
        <script defer={true} src="https://acrobatservices.adobe.com/view-sdk/viewer.js" />
      </body>
    </html>
  );
}

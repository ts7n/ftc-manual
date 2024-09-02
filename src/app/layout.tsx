import type { Metadata } from 'next';
import { Inter, Oswald } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const oswald = Oswald({ subsets: ['latin'], variable: '--font-oswald' });

export const metadata: Metadata = {
  title: 'FTC Game Manual AI',
  description: 'Chat with the FTC Game Manual for cited questions.',
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
        <script defer={true} src="https://acrobatservices.adobe.com/view-sdk/viewer.js" />
      </body>
    </html>
  );
}

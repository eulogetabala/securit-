import './globals.css';
import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-montserrat',
});

export const metadata: Metadata = {
  title: 'Congo Shield Security',
  description: 'Sécurité privée haut de gamme au Congo, protection 24/7, surveillance et gardiennage professionnelle.'
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${montserrat.variable}`}>
      <body className="bg-slate-950 text-slate-100 font-sans antialiased">{children}</body>
    </html>
  );
}

import './globals.css';

import { Inter, Space_Grotesk } from 'next/font/google';
import { Providers } from '@/components/providers';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

export const metadata = {
  title: 'ВетКлиника | Заботимся о ваших питомцах',
  description: 'Современная ветеринарная клиника в Москве. Профессиональная диагностика, лечение, вакцинация и стерилизация животных.',
  keywords: 'ветеринарная клиника, лечение животных, вакцинация, диагностика, стерилизация, Москва',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="min-h-screen bg-neutral-50 text-neutral-900 antialiased">
        <Providers>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
import '../globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Mealplan - Get your weekly food sorted',
  description: 'Mealplan is an app that helps you figure out what to eat this week.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-background text-foreground`}>
        <Header />
        <main className="px-10 py-2 min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

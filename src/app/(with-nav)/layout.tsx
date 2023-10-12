import '../globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import HeaderWithNav from '@/components/layout/HeaderWithNav';
import Footer from '@/components/layout/Footer';
import { SideNav } from '@/components/layout/SideNav';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Mealplan - Get your weekly food sorted',
  description: 'Mealplan is an app that helps you figure out what to eat this week.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-background text-foreground grid md:grid-cols-[repeat(2,fit_content(100%))]`}>
        <HeaderWithNav headerClassName="px-4 md:px-10 col-span-2" navClassName="hidden md:block row-span-2" />
        <div className="col-span-2 md:col-span-1">
          <main className="px-4 md:px-10 py-2 min-h-screen">{children}</main>
          <Footer className="px-4 md:px-10" />
        </div>
      </body>
    </html>
  );
}

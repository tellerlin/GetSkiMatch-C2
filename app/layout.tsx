import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Breadcrumb from '@/components/layout/Breadcrumb';

// 配置 Inter 字体
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Ski Resort Finder',
  description: 'Find your perfect ski resort based on your preferences and current conditions',
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#ffffff',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body className={`${inter.className} antialiased bg-background min-h-screen`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Breadcrumb />
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}

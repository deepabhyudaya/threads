import { cn } from '@/lib/utils';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from './providers';
import { ThemeProvider } from '@/components/theme-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Hangton's Threads",
  description: 'Threads Clone By Hangton',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <html lang="en">
        <body
          className={cn(
            inter.className,
            'w-screen flex justify-center bg-slate-50'
          )}
        >
          <main className="h-full w-full max-w-md bg-black overflow-auto md:py-2">
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange
            >
              {children}
            </ThemeProvider>
          </main>
        </body>
      </html>
    </Providers>
  );
}

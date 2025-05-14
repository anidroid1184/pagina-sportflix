
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google'; // Changed from Inter to Poppins
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { AuthProvider } from '@/context/AuthContext';
import { Toaster } from "@/components/ui/toaster";
import { cn } from '@/lib/utils';

// Configure Poppins font
const poppins = Poppins({ 
  subsets: ['latin'], 
  variable: "--font-sans",
  weight: ['300', '400', '500', '600', '700'] // Include desired weights
});

export const metadata: Metadata = {
  title: 'SPORTFLIX - Tu Equipo para el Éxito Deportivo',
  description: 'En SPORTFLIX, encuentra la mejor ropa y accesorios deportivos. Tu comodidad, tu deporte, tu estilo.',
  icons: {
    icon: '/images/favicon.ico', 
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={cn(
          "min-h-screen font-sans antialiased bg-gradient-to-br from-background via-background to-primary/20",
          poppins.variable
        )}
      >
        <AuthProvider>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}

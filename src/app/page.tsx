
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/products/ProductCard';
import { products as allProducts } from '@/data/products';
import type { Product } from '@/types';
import { ArrowRight, Info, Sparkles, ShoppingCart as ShoppingCartIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Helper to get top N rated products as trending
const getFeaturedTrendingProducts = (count: number): Product[] => {
  return [...allProducts]
    .sort((a, b) => (b.rating || 0) - (a.rating || 0)) // Sort by rating descending
    .slice(0, count);
};

export default function HomePage() {
  const featuredProducts = getFeaturedTrendingProducts(4); // Show 4 featured products

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] md:h-[70vh] md:min-h-[500px] flex items-center justify-center text-center text-white bg-gradient-to-br from-primary via-primary/80 to-accent/60">
        <Image
          src="https://picsum.photos/seed/homehero/1600/900"
          alt="Ropa deportiva de alta calidad"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 z-0 opacity-30"
          priority
          data-ai-hint="sports fashion"
        />
        <div className="relative z-10 p-6 container mx-auto motion-safe:animate-fade-in-down">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 drop-shadow-lg">
            Bienvenido a SPORFLIX
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-2 text-primary-foreground/90 drop-shadow-md">
            Tu tienda de ropa deportiva favorita.
          </p>
          <p className="text-xl sm:text-2xl md:text-3xl font-semibold mb-8 text-primary-foreground drop-shadow-md">
            Tu comodidad, tu deporte, tu estilo.
          </p>
          <Button size="lg" asChild className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-xl transform transition-transform hover:scale-105 text-lg px-8 py-6">
            <Link href="/catalog">
              Explorar Catálogo <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* About Us Snippet */}
      <section className="py-12 md:py-16 bg-background motion-safe:animate-fade-in-up">
        <div className="container mx-auto px-4 text-center">
          <Info className="mx-auto h-12 w-12 text-primary mb-4" />
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Conócenos Mejor</h2>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto mb-8">
            En SPORFLIX, nos apasiona el deporte y el bienestar. Ofrecemos prendas de alta calidad que combinan funcionalidad, estilo y comodidad para inspirarte a alcanzar tus metas.
          </p>
          <Button variant="outline" size="lg" asChild className="border-primary text-primary hover:bg-primary/10">
            <Link href="/about">
              Más Sobre Nosotros <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Trending Products Section */}
      {featuredProducts.length > 0 && (
        <section className="py-12 md:py-16 bg-muted/50 motion-safe:animate-fade-in-up">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <Sparkles className="mx-auto h-12 w-12 text-accent mb-4" />
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-2">Productos Destacados</h2>
              <p className="text-lg text-foreground/80">Échale un vistazo a lo que está en tendencia.</p>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <div className="text-center mt-10">
              <Button size="lg" asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Link href="/trending">
                  Ver Todas las Tendencias <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Final CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-accent/70 to-primary/70 text-white motion-safe:animate-fade-in-up">
        <div className="container mx-auto px-4 text-center">
          <ShoppingCartIcon className="mx-auto h-12 w-12 mb-4" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">¿Listo para Equiparte?</h2>
          <p className="text-lg md:text-xl max-w-xl mx-auto mb-8 text-primary-foreground/90">
            Encuentra todo lo que necesitas para tu próxima aventura deportiva en nuestro catálogo completo.
          </p>
          <Button size="lg" variant="outline" asChild className="bg-background text-foreground hover:bg-background/90 border-transparent text-lg px-8 py-6 shadow-lg">
            <Link href="/catalog">
              Ir al Catálogo Ahora
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}

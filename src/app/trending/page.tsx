
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Zap, ArrowUpRight, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { products } from '@/data/products'; // Assuming products data is available
import type { Product } from '@/types';
import { Button } from '@/components/ui/button';

// Helper to get top N rated products as trending
const getTrendingProducts = (count: number): Product[] => {
  return [...products]
    .sort((a, b) => (b.rating || 0) - (a.rating || 0)) // Sort by rating descending
    .slice(0, count);
};

export default function TrendingPage() {
  const trendingProducts = getTrendingProducts(6); // Get top 6 trending products

  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <header className="mb-12 text-center">
        <Zap className="mx-auto h-16 w-16 text-accent mb-4" />
        <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl lg:text-6xl">
          Tendencias Sporflix
        </h1>
        <p className="mt-4 text-xl text-foreground/80 max-w-2xl mx-auto">
          Descubre los productos más populares y las últimas novedades que están marcando la pauta en el mundo deportivo.
        </p>
      </header>

      {trendingProducts.length > 0 ? (
        <section className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {trendingProducts.map((product, index) => (
            <Card key={product.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group flex flex-col">
              <Link href={`/products/${product.slug}`} className="block">
                <div className="relative h-72 w-full">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-500 group-hover:scale-105"
                    data-ai-hint={`${product.category} ${product.colors[0]}`}
                  />
                  {index < 3 && (
                     <div className="absolute top-3 right-3 bg-accent text-accent-foreground px-3 py-1.5 rounded-full text-xs font-semibold shadow-md">
                        Top {index + 1}
                    </div>
                  )}
                </div>
              </Link>
              <CardHeader className="p-6">
                <Link href={`/products/${product.slug}`} className="block">
                    <CardTitle className="text-2xl font-semibold text-primary group-hover:text-accent transition-colors">
                    {product.name}
                    </CardTitle>
                </Link>
                <p className="text-sm text-muted-foreground mt-1">{product.brand}</p>
              </CardHeader>
              <CardContent className="p-6 pt-0 flex-grow">
                <p className="text-foreground/80 line-clamp-3 mb-3">{product.description}</p>
                <div className="flex items-center justify-between">
                    <p className="text-2xl font-bold text-primary">
                    {product.price.toLocaleString('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                    </p>
                    {product.rating && (
                        <div className="flex items-center gap-1 text-sm text-amber-500">
                        <Star className="h-5 w-5 fill-current" />
                        <span>{product.rating.toFixed(1)}</span>
                        <span className="text-muted-foreground text-xs">({product.numReviews} reseñas)</span>
                        </div>
                    )}
                </div>
              </CardContent>
              <div className="p-6 pt-0 border-t mt-auto">
                <Button asChild size="lg" className="w-full mt-4 bg-primary text-primary-foreground hover:bg-primary/90 group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                    <Link href={`/products/${product.slug}`} className="flex items-center justify-center">
                        Ver Producto <ArrowUpRight className="ml-2 h-5 w-5" />
                    </Link>
                </Button>
              </div>
            </Card>
          ))}
        </section>
      ) : (
        <div className="text-center py-10">
          <p className="text-xl text-muted-foreground">
            Actualmente no hay productos destacados en tendencias. ¡Vuelve pronto!
          </p>
        </div>
      )}

      <section className="mt-16 text-center py-10 bg-muted/50 rounded-lg shadow-md">
        <h2 className="text-3xl font-semibold text-primary mb-3">¿Buscas algo más?</h2>
        <p className="text-lg text-foreground/80 max-w-2xl mx-auto mb-6">
          Explora nuestro catálogo completo para encontrar exactamente lo que necesitas para tu próxima aventura deportiva.
        </p>
        <Button size="lg" asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
          <Link href="/">Explorar Catálogo</Link>
        </Button>
      </section>
    </div>
  );
}

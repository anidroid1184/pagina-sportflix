
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Tag, Percent, ShoppingCart, Clock } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { products } from '@/data/products'; // Assuming products data is available
import type { Product } from '@/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// Helper to simulate discounted products
const getDiscountedProducts = (count: number): (Product & { discountPercentage: number; originalPrice: number })[] => {
  return [...products]
    .sort(() => 0.5 - Math.random()) // Shuffle products
    .slice(0, count)
    .map(product => {
      const discountPercentage = Math.floor(Math.random() * 31) + 10; // 10% to 40% discount
      const originalPrice = product.price;
      const discountedPrice = Math.round(originalPrice * (1 - discountPercentage / 100) / 1000) * 1000; // Round to nearest 1000 COP
      return {
        ...product,
        price: discountedPrice, // Set price to discounted price
        originalPrice,
        discountPercentage,
      };
    });
};

export default function DiscountsPage() {
  const discountedProducts = getDiscountedProducts(6); // Get 6 discounted products

  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <header className="mb-12 text-center">
        <Tag className="mx-auto h-16 w-16 text-accent mb-4" />
        <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl lg:text-6xl">
          Ofertas Imperdibles en Sporflix
        </h1>
        <p className="mt-4 text-xl text-foreground/80 max-w-2xl mx-auto">
          ¡Aprovecha nuestros descuentos especiales! Equipamiento de primera calidad a precios que no podrás resistir.
        </p>
      </header>

      {discountedProducts.length > 0 ? (
        <section className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {discountedProducts.map(product => (
            <Card key={product.id} className="overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group flex flex-col border-accent/30 hover:border-accent">
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
                  <Badge variant="secondary" className="absolute top-3 left-3 text-base px-3 py-1.5 shadow-lg">
                    <Percent className="mr-1.5 h-5 w-5" /> {product.discountPercentage}% OFF
                  </Badge>
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
                <p className="text-foreground/80 line-clamp-3 mb-4">{product.description}</p>
                <div className="flex items-baseline gap-2 mb-2">
                  <p className="text-3xl font-bold text-accent">
                    {product.price.toLocaleString('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                  </p>
                  <p className="text-lg text-muted-foreground line-through">
                    {product.originalPrice.toLocaleString('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                  </p>
                </div>
                <div className="flex items-center text-sm text-green-600 dark:text-green-500">
                    <Clock className="h-4 w-4 mr-1.5" />
                    Oferta por tiempo limitado
                </div>
              </CardContent>
              <CardFooter className="p-6 pt-0 border-t mt-auto">
                <Button asChild size="lg" className="w-full mt-4 bg-accent text-accent-foreground hover:bg-accent/90 transition-colors">
                  <Link href={`/products/${product.slug}`} className="flex items-center justify-center">
                    <ShoppingCart className="mr-2 h-5 w-5" /> ¡Lo Quiero!
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </section>
      ) : (
        <div className="text-center py-10">
          <p className="text-xl text-muted-foreground">
            Actualmente no hay productos con descuento. ¡Vuelve pronto para ver nuestras ofertas!
          </p>
        </div>
      )}

       <section className="mt-16 text-center py-10 bg-muted/50 rounded-lg shadow-md">
        <h2 className="text-3xl font-semibold text-primary mb-3">¿No encontraste lo que buscabas en oferta?</h2>
        <p className="text-lg text-foreground/80 max-w-2xl mx-auto mb-6">
          Nuestro catálogo completo está lleno de productos increíbles. ¡Seguro encuentras algo que te encante!
        </p>
        <Button size="lg" asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Link href="/catalog">Ver Catálogo Completo</Link>
        </Button>
      </section>
    </div>
  );
}

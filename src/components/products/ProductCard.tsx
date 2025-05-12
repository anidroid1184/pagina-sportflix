import Link from 'next/link';
import Image from 'next/image';
import type { Product } from '@/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const formattedPrice = product.price.toLocaleString('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return (
    <Card className={cn(
        "flex h-full flex-col overflow-hidden rounded-lg border shadow-lg transition-shadow duration-300 hover:shadow-xl",
        "motion-safe:animate-scale-in"
      )}>
      <CardHeader className="p-0">
        <Link href={`/products/${product.slug}`} className="block">
          <div className="aspect-square overflow-hidden">
            <Image
              src={product.images[0]}
              alt={product.name}
              width={400}
              height={400}
              className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
              data-ai-hint={`${product.category} ${product.colors[0]}`}
            />
          </div>
        </Link>
      </CardHeader>
      <CardContent className="flex-grow p-4">
        <Link href={`/products/${product.slug}`}>
          <CardTitle className="mb-2 line-clamp-2 text-lg font-semibold hover:text-primary">{product.name}</CardTitle>
        </Link>
        <p className="mb-2 text-sm text-muted-foreground">{product.brand}</p>
        <div className="mb-3 flex items-center justify-between">
          <p className="text-xl font-bold text-primary">{formattedPrice}</p>
          {product.rating && (
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Star className="h-4 w-4 fill-accent text-accent" />
              <span>{product.rating.toFixed(1)}</span>
              {product.numReviews && <span className="ml-0.5">({product.numReviews})</span>}
            </div>
          )}
        </div>
        <div className="flex flex-wrap gap-1">
          {product.colors.slice(0, 3).map(color => (
             <Badge key={color} variant="outline" className="px-2 py-0.5 text-xs">{color}</Badge>
          ))}
          {product.colors.length > 3 && <Badge variant="outline" className="px-2 py-0.5 text-xs">+{product.colors.length - 3} más</Badge>}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button asChild className="w-full bg-primary text-primary-foreground hover:bg-primary/90" variant="default">
          <Link href={`/products/${product.slug}`}>Ver Detalles</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

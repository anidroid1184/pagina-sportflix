import Link from 'next/link';
import Image from 'next/image';
import type { Product } from '@/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="flex h-full flex-col overflow-hidden transition-shadow duration-300 hover:shadow-xl">
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
        <div className="mb-3 flex items-center gap-2">
          <p className="text-xl font-bold text-primary">${product.price.toFixed(2)}</p>
          {product.rating && (
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Star className="h-4 w-4 fill-accent text-accent" />
              <span>{product.rating.toFixed(1)}</span>
              {product.numReviews && <span>({product.numReviews})</span>}
            </div>
          )}
        </div>
        <div className="flex flex-wrap gap-1">
          {product.colors.slice(0, 3).map(color => (
             <Badge key={color} variant="outline" className="text-xs">{color}</Badge>
          ))}
          {product.colors.length > 3 && <Badge variant="outline" className="text-xs">+{product.colors.length - 3} more</Badge>}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button asChild className="w-full bg-primary hover:bg-primary/90" variant="default">
          <Link href={`/products/${product.slug}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

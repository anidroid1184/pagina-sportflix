'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getProductBySlug, products as allProducts } from '@/data/products';
import type { Product, ProductSize } from '@/types';
import { ImageGallery } from '@/components/products/ImageGallery';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star, ShoppingCart, Heart, ChevronLeft, Check } from 'lucide-react'; // Added Check icon
import Link from 'next/link';
import { ProductCard } from '@/components/products/ProductCard';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';

export default function ProductDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const slug = typeof params.slug === 'string' ? params.slug : '';
  
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<ProductSize | ''>('');
  const [selectedColor, setSelectedColor] = useState<string | ''>('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (slug) {
      const foundProduct = getProductBySlug(slug);
      if (foundProduct) {
        setProduct(foundProduct);
        if (foundProduct.sizes.length > 0 && foundProduct.category !== "Accessories") setSelectedSize(foundProduct.sizes[0]);
        if (foundProduct.colors.length > 0) setSelectedColor(foundProduct.colors[0]);
      } else {
        router.push('/');
      }
    }
  }, [slug, router]);

  if (!product) {
    return (
      <div className="container mx-auto flex min-h-[calc(100vh-8rem)] items-center justify-center py-12">
        <div className="animate-pulse text-xl font-semibold text-primary">Cargando detalles del producto...</div>
      </div>
    );
  }

  const formattedPrice = product.price.toLocaleString('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  const relatedProducts = allProducts
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  const handleAddToCart = () => {
    if (product.category !== "Accessories" && product.sizes.length > 0 && !selectedSize) {
        toast({ title: "Por favor, selecciona una talla.", variant: "destructive", description: "Elige una de las tallas disponibles para este producto." });
        return;
    }
    if (product.colors.length > 0 && !selectedColor) {
        toast({ title: "Por favor, selecciona un color.", variant: "destructive", description: "Elige uno de los colores disponibles para este producto." });
        return;
    }
    toast({
        title: "¡Añadido al carrito!",
        description: `${product.name} ${selectedSize ? `(${selectedSize}, ${selectedColor})` : `(${selectedColor})`} x ${quantity} ha sido añadido a tu carrito.`,
        className: "bg-primary text-primary-foreground",
    });
  };
  
  const handleWishlist = () => {
     toast({
        title: "¡Añadido a la lista de deseos!",
        description: `${product.name} ha sido añadido a tu lista de deseos.`,
        className: "border-accent text-accent-foreground bg-accent/10", // Note: this might not render as intended with current theme vars, adjust if needed
    });
  }

  return (
    <div className="container mx-auto py-8 md:py-12">
      <Button variant="outline" onClick={() => router.back()} className="mb-6 text-sm">
        <ChevronLeft className="mr-2 h-4 w-4" /> Volver a Productos
      </Button>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12">
        <ImageGallery images={product.images} altText={product.name} />
        <div className="flex flex-col">
          <Card className="flex-grow shadow-lg">
            <CardHeader>
              <p className="mb-1 text-sm font-medium text-primary">{product.brand}</p>
              <CardTitle className="text-3xl font-bold tracking-tight lg:text-4xl">{product.name}</CardTitle>
              {product.rating && (
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={cn("h-5 w-5", i < Math.round(product.rating!) ? "fill-accent text-accent" : "text-muted-foreground/30")} />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">({product.numReviews} reseñas)</span>
                </div>
              )}
              <p className="mt-4 text-4xl font-extrabold text-primary">{formattedPrice}</p>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base leading-relaxed text-foreground/80">{product.longDescription || product.description}</CardDescription>
              <Separator className="my-6" />
              
              {product.category !== "Accessories" && product.sizes.length > 0 && (
                <div className="mb-4">
                  <label htmlFor="size-select" className="mb-2 block text-sm font-medium text-foreground/90">Talla:</label>
                  <Select value={selectedSize} onValueChange={(value) => setSelectedSize(value as ProductSize)}>
                    <SelectTrigger id="size-select" className="w-full rounded-md md:w-[200px]">
                      <SelectValue placeholder="Seleccionar talla" />
                    </SelectTrigger>
                    <SelectContent>
                      {product.sizes.map(size => (
                        <SelectItem key={size} value={size}>{size}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {product.colors.length > 0 && (
                 <div className="mb-6">
                    <label htmlFor="color-select" className="mb-2 block text-sm font-medium text-foreground/90">Color:</label>
                    <div className="flex flex-wrap gap-3">
                    {product.colors.map(color => (
                        <Button 
                        key={color} 
                        variant="outline"
                        onClick={() => setSelectedColor(color)}
                        className={cn(
                            "h-10 w-10 rounded-full p-0 border-2 transition-all duration-150 ease-in-out",
                            selectedColor === color ? 'ring-2 ring-primary ring-offset-2' : 'hover:opacity-80'
                        )}
                        style={{ 
                            backgroundColor: color.toLowerCase(), 
                            borderColor: color.toLowerCase() === 'white' || color.toLowerCase() === '#ffffff' ? 'hsl(var(--border))' : color.toLowerCase()
                        }}
                        aria-label={`Seleccionar color ${color}`}
                        >
                         {selectedColor === color && <Check className="h-5 w-5 text-white mix-blend-difference" />}
                        </Button>
                    ))}
                    </div>
                </div>
              )}
              
              <div className="mb-6 flex items-center gap-4">
                <label htmlFor="quantity" className="text-sm font-medium text-foreground/90">Cantidad:</label>
                <div className="flex items-center rounded-md border">
                    <Button variant="ghost" size="icon" onClick={() => setQuantity(Math.max(1, quantity -1))} className="h-10 w-10 rounded-r-none border-r hover:bg-secondary">
                        <span className="text-xl">-</span>
                    </Button>
                    <Input 
                        type="number" 
                        id="quantity" 
                        value={quantity} 
                        onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                        className="h-10 w-16 rounded-none border-none text-center focus-visible:ring-0"
                        min="1"
                    />
                    <Button variant="ghost" size="icon" onClick={() => setQuantity(quantity + 1)} className="h-10 w-10 rounded-l-none border-l hover:bg-secondary">
                        <span className="text-xl">+</span>
                    </Button>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Button size="lg" className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90 shadow-md hover:shadow-lg transition-shadow" onClick={handleAddToCart}>
                  <ShoppingCart className="mr-2 h-5 w-5" /> Añadir al Carrito
                </Button>
                <Button size="lg" variant="outline" className="flex-1 shadow-sm hover:shadow-md transition-shadow" onClick={handleWishlist}>
                  <Heart className="mr-2 h-5 w-5" /> Añadir a Lista de Deseos
                </Button>
              </div>
              
              <div className="mt-6 space-y-2 text-sm">
                  <p><Badge variant="secondary" className="text-xs">Categoría:</Badge> <span className="text-foreground/80">{product.category}</span></p>
                  <p><Badge variant="secondary" className="text-xs">Disponibles:</Badge> <span className="text-foreground/80">{product.stock > 0 ? `${product.stock} unidades disponibles` : 'Agotado'}</span></p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <section className="mt-12 md:mt-16">
          <h2 className="mb-6 text-2xl font-bold text-primary md:text-3xl">Productos Relacionados</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedProducts.map(relatedProduct => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

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
import { Star, ShoppingCart, Heart, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { ProductCard } from '@/components/products/ProductCard';
import { useToast } from '@/hooks/use-toast';

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
        if (foundProduct.sizes.length > 0) setSelectedSize(foundProduct.sizes[0]);
        if (foundProduct.colors.length > 0) setSelectedColor(foundProduct.colors[0]);
      } else {
        // Handle product not found, e.g., redirect or show 404
        // For now, let's redirect to home. In a real app, a proper 404 page is better.
        router.push('/');
      }
    }
  }, [slug, router]);

  if (!product) {
    return (
      <div className="container mx-auto flex min-h-[calc(100vh-8rem)] items-center justify-center py-12">
        <div className="animate-pulse text-xl font-semibold">Loading product details...</div>
      </div>
    );
  }

  const relatedProducts = allProducts
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  const handleAddToCart = () => {
    if (!selectedSize && product.category !== "Accessories") {
        toast({ title: "Please select a size.", variant: "destructive" });
        return;
    }
    if (!selectedColor) {
        toast({ title: "Please select a color.", variant: "destructive" });
        return;
    }
    // Logic to add to cart (mock)
    toast({
        title: "Added to Cart!",
        description: `${product.name} (${selectedSize}, ${selectedColor}) x ${quantity} has been added to your cart.`,
    });
  };
  
  const handleWishlist = () => {
     toast({
        title: "Added to Wishlist!",
        description: `${product.name} has been added to your wishlist.`,
    });
  }

  return (
    <div className="container mx-auto py-8 md:py-12">
      <Button variant="outline" onClick={() => router.back()} className="mb-6">
        <ChevronLeft className="mr-2 h-4 w-4" /> Back to Products
      </Button>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12">
        <ImageGallery images={product.images} altText={product.name} />
        <div className="flex flex-col">
          <Card className="flex-grow">
            <CardHeader>
              <p className="mb-1 text-sm font-medium text-primary">{product.brand}</p>
              <CardTitle className="text-3xl font-bold tracking-tight lg:text-4xl">{product.name}</CardTitle>
              {product.rating && (
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={cn("h-5 w-5", i < Math.round(product.rating!) ? "fill-accent text-accent" : "text-muted-foreground/50")} />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">({product.numReviews} reviews)</span>
                </div>
              )}
              <p className="mt-4 text-4xl font-extrabold text-primary">${product.price.toFixed(2)}</p>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base leading-relaxed">{product.longDescription || product.description}</CardDescription>
              <Separator className="my-6" />
              
              {product.category !== "Accessories" && product.sizes.length > 0 && (
                <div className="mb-4">
                  <label htmlFor="size-select" className="mb-2 block text-sm font-medium">Size:</label>
                  <Select value={selectedSize} onValueChange={(value) => setSelectedSize(value as ProductSize)}>
                    <SelectTrigger id="size-select" className="w-full md:w-[200px]">
                      <SelectValue placeholder="Select size" />
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
                    <label htmlFor="color-select" className="mb-2 block text-sm font-medium">Color:</label>
                    <div className="flex flex-wrap gap-2">
                    {product.colors.map(color => (
                        <Button 
                        key={color} 
                        variant={selectedColor === color ? "default" : "outline"} 
                        onClick={() => setSelectedColor(color)}
                        className="h-10 w-10 p-0 border-2"
                        style={{ backgroundColor: selectedColor === color ? color.toLowerCase() : 'transparent', borderColor: color.toLowerCase() }}
                        aria-label={`Select color ${color}`}
                        >
                        {/* For better visibility of color name if background color is too light/dark */}
                        {/* <span className={cn("mix-blend-difference", selectedColor === color ? 'text-white' : 'text-current')}>{color.substring(0,1)}</span> */}
                        </Button>
                    ))}
                    </div>
                </div>
              )}
              
              <div className="mb-6 flex items-center gap-4">
                <label htmlFor="quantity" className="text-sm font-medium">Quantity:</label>
                <div className="flex items-center rounded-md border">
                    <Button variant="ghost" size="icon" onClick={() => setQuantity(Math.max(1, quantity -1))} className="h-10 w-10 rounded-r-none border-r">
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
                    <Button variant="ghost" size="icon" onClick={() => setQuantity(quantity + 1)} className="h-10 w-10 rounded-l-none border-l">
                        <span className="text-xl">+</span>
                    </Button>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Button size="lg" className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90" onClick={handleAddToCart}>
                  <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
                </Button>
                <Button size="lg" variant="outline" className="flex-1" onClick={handleWishlist}>
                  <Heart className="mr-2 h-5 w-5" /> Add to Wishlist
                </Button>
              </div>
              
              <div className="mt-6 space-y-2 text-sm">
                  <p><Badge variant="secondary">Category:</Badge> {product.category}</p>
                  <p><Badge variant="secondary">Stock:</Badge> {product.stock > 0 ? `${product.stock} items available` : 'Out of Stock'}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <section className="mt-12 md:mt-16">
          <h2 className="mb-6 text-2xl font-bold md:text-3xl">Related Products</h2>
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

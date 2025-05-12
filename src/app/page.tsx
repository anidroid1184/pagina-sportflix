
// @ts-nocheck
'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { ProductCard } from '@/components/products/ProductCard';
import { ProductFilter, type Filters } from '@/components/products/ProductFilter';
import { products as allProducts } from '@/data/products';
import { Input } from "@/components/ui/input";
import { Search, PackageX } from 'lucide-react';
import type { Product } from '@/types';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function HomePage() {
  const [filters, setFilters] = useState<Filters>({
    category: 'all',
    size: 'all',
    color: 'all',
    searchTerm: '',
  });

  const handleFilterChange = (newFilters: Filters) => {
    setFilters(newFilters);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({ ...prev, searchTerm: event.target.value }));
  };

  const filteredProducts = useMemo(() => {
    return allProducts.filter((product: Product) => {
      const categoryMatch = filters.category === 'all' || product.category === filters.category;
      const sizeMatch = filters.size === 'all' || product.sizes.includes(filters.size);
      const colorMatch = filters.color === 'all' || product.colors.includes(filters.color);
      const searchTermMatch = filters.searchTerm === '' || 
        product.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(filters.searchTerm.toLowerCase());
      
      return categoryMatch && sizeMatch && colorMatch && searchTermMatch;
    });
  }, [filters]);

  return (
    <div className="container mx-auto py-8 md:py-12">
      <div className="mb-8 md:mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-primary md:text-5xl">Bienvenido al catálogo de Sporflix</h1>
        <p className="mt-3 text-lg text-foreground md:text-xl">
          Tu tienda de ropa deportiva favorita.<br/>Tu comodidad, tu deporte, tu estilo.
        </p>
      </div>

      {/* Banner Section */}
      <div className="mb-10 md:mb-12 rounded-lg overflow-hidden shadow-2xl">
        <div 
          className="relative h-64 md:h-80 lg:h-96 w-full bg-cover bg-center group"
          style={{ backgroundImage: "url('https://picsum.photos/seed/sportbanner/1200/400')" }}
          data-ai-hint="sports banner"
        >
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300 flex flex-col items-center justify-center text-center p-4">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 md:mb-4">¡Nuevas Colecciones!</h2>
            <p className="text-base md:text-lg lg:text-xl text-primary-foreground/90 mb-6 md:mb-8 max-w-xl">
              Descubre lo último en moda deportiva. Rendimiento y estilo en cada prenda.
            </p>
            <Button size="lg" asChild className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg transform transition-transform group-hover:scale-105">
              <Link href="#product-grid">Explorar Ahora</Link>
            </Button>
          </div>
        </div>
      </div>
      
      <div className="mb-8 md:mb-10 flex justify-center px-4">
        <div className="relative w-full max-w-2xl">
          <Input 
            type="search"
            placeholder="Buscar productos, marcas o palabras clave..."
            value={filters.searchTerm}
            onChange={handleSearchChange}
            className="h-12 rounded-full pl-12 text-base shadow-lg focus-visible:ring-primary/80 bg-card text-card-foreground placeholder:text-muted-foreground"
            aria-label="Buscar productos"
          />
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        </div>
      </div>

      <div id="product-grid" className="flex flex-col gap-8 md:flex-row md:gap-10 px-2 sm:px-0">
        <ProductFilter filters={filters} onFilterChange={handleFilterChange} />
        <main className="flex-1">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted bg-card p-8 text-center shadow-sm">
              <PackageX className="mb-6 h-20 w-20 text-muted-foreground/70" />
              <h2 className="text-2xl font-semibold text-foreground">No Se Encontraron Productos</h2>
              <p className="mt-2 max-w-sm text-muted-foreground">
                No pudimos encontrar productos que coincidan con tus filtros o término de búsqueda. Intenta ajustarlos o explora todos los productos.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

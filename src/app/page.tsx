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

      <div className="mb-8 flex justify-center">
        <Link href="/" className="group">
          <Image 
            src="https://picsum.photos/seed/sportflixlogo/150/150" 
            alt="Sporflix Logo" 
            width={100} 
            height={100} 
            className="rounded-full shadow-lg transition-all duration-300 ease-in-out group-hover:scale-110 group-hover:shadow-2xl mb-6"
            data-ai-hint="logo brand"
            priority
          />
        </Link>
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

      <div className="flex flex-col gap-8 md:flex-row md:gap-10 px-2 sm:px-0">
        <ProductFilter filters={filters} onFilterChange={handleFilterChange} />
        <main className="flex-1">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
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

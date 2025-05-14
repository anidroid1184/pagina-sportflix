
'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { ProductCard } from '@/components/products/ProductCard';
import { products as allProducts } from '@/data/products';
import { Input } from "@/components/ui/input";
import { Search, PackageX, Filter as FilterIcon } from 'lucide-react';
import type { Product, Filters } from '@/types'; 
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ProductFilterContent } from '@/components/products/ProductFilterContent';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { useIsMobile } from '@/hooks/use-mobile';

export default function CatalogPage() {
  const [filters, setFilters] = useState<Filters>({
    category: 'all',
    size: 'all',
    color: 'all',
    searchTerm: '',
  });

  const isMobile = useIsMobile();
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false);

  const handleFilterChange = (newFilters: Filters) => {
    setFilters(newFilters);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({ ...prev, searchTerm: event.target.value }));
  };
  
  const clearAllFiltersAndSearch = () => {
    setFilters({ category: 'all', size: 'all', color: 'all', searchTerm: '' });
    if (isMobile) setIsFilterSheetOpen(false);
  };

  const resetDisplayFiltersOnly = () => { 
    setFilters(prev => ({ ...prev, category: 'all', size: 'all', color: 'all' }));
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

  const filterContentComponent = (
    <ProductFilterContent 
      filters={filters}
      onFilterChange={handleFilterChange} 
      onResetFilters={resetDisplayFiltersOnly}
    />
  );

  if (isMobile === undefined) {
      return (
          <div className="container mx-auto py-8 md:py-12">
              <div className="animate-pulse">
                  <div className="h-24 bg-muted rounded-md mb-8"></div> 
                  <div className="h-64 bg-muted rounded-lg mb-10"></div> 
                  <div className="h-12 bg-muted rounded-full w-full max-w-2xl mx-auto mb-8"></div>
                  
                  <div className="md:hidden h-10 bg-muted rounded-md mb-6 w-full"></div>

                  <div className="flex flex-col md:flex-row gap-8 md:gap-10 px-2 sm:px-0">
                      <div className="hidden md:block w-72 lg:w-80 h-96 bg-muted rounded-lg"></div>
                      <main className="flex-1 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                          {[...Array(4)].map((_, i) => (
                              <div key={i} className="h-80 bg-muted rounded-lg">
                                  <div className="h-48 bg-muted/50 rounded-t-lg"></div>
                                  <div className="p-4 space-y-2">
                                      <div className="h-6 bg-muted/50 rounded"></div>
                                      <div className="h-4 bg-muted/50 rounded w-3/4"></div>
                                      <div className="h-8 bg-muted/50 rounded w-1/2"></div>
                                  </div>
                              </div>
                          ))}
                      </main>
                  </div>
              </div>
          </div>
      )
  }

  return (
    <div className="container mx-auto py-8 md:py-12">
      <div className="mb-8 md:mb-12 text-center motion-safe:animate-fade-in-down">
        <h1 className="text-4xl font-bold tracking-tight text-primary md:text-5xl">Catálogo de Productos SPORFLIX</h1>
        <p className="mt-3 text-lg text-foreground md:text-xl">
          Encuentra el equipamiento perfecto para tu estilo de vida activo.
        </p>
      </div>

      <div className="mb-10 md:mb-12 rounded-lg overflow-hidden shadow-2xl">
        <div 
          className="relative h-64 md:h-80 lg:h-96 w-full bg-cover bg-center group"
          style={{ backgroundImage: "url('https://picsum.photos/seed/sportbanner/1200/400')" }}
          data-ai-hint="sports banner"
        >
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300 flex flex-col items-center justify-center text-center p-4 motion-safe:animate-fade-in-up">
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
      
      <div className="mb-8 md:mb-10 flex justify-center px-4 motion-safe:animate-fade-in">
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

      {isMobile && (
        <div className="mb-6 px-2 sm:px-0 motion-safe:animate-fade-in">
          <Sheet open={isFilterSheetOpen} onOpenChange={setIsFilterSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" className="w-full">
                <FilterIcon className="mr-2 h-5 w-5" />
                Mostrar Filtros
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[340px] overflow-y-auto flex flex-col p-0">
              <SheetHeader className="p-6 mb-0 border-b">
                <SheetTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-xl font-semibold text-primary">
                    <FilterIcon className="h-5 w-5" />
                    Filtros
                  </span>
                  <Button variant="ghost" size="sm" onClick={clearAllFiltersAndSearch} className="text-xs text-muted-foreground hover:text-destructive">
                    Limpiar Todo
                  </Button>
                </SheetTitle>
              </SheetHeader>
              <div className="flex-grow p-6 overflow-y-auto">
                {filterContentComponent}
              </div>
              <div className="p-6 border-t mt-auto">
                <SheetClose asChild>
                  <Button variant="default" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">Aplicar Filtros</Button>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      )}

      <div id="product-grid" className="flex flex-col gap-8 md:flex-row md:gap-10 px-2 sm:px-0">
        {!isMobile && (
          <aside className="w-full rounded-lg border bg-card p-6 shadow-lg md:w-72 lg:w-80 self-start sticky top-20 motion-safe:animate-fade-in">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="flex items-center gap-2 text-xl font-semibold text-primary">
                <FilterIcon className="h-5 w-5" />
                Filtros
              </h3>
              <Button variant="ghost" size="sm" onClick={clearAllFiltersAndSearch} className="text-xs text-muted-foreground hover:text-destructive">
                  Limpiar Todo
              </Button>
            </div>
            {filterContentComponent}
          </aside>
        )}
        
        <main className="flex-1">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted bg-card p-8 text-center shadow-sm motion-safe:animate-fade-in-up">
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

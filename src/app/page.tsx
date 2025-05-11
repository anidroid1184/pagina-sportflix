'use client';

import React, { useState, useMemo } from 'react';
import { ProductCard } from '@/components/products/ProductCard';
import { ProductFilter, type Filters } from '@/components/products/ProductFilter';
import { products as allProducts } from '@/data/products';
import { Input } from "@/components/ui/input";
import { Search } from 'lucide-react';
import type { Product } from '@/types';

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
    <div className="container mx-auto py-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-primary">Explore Our Collection</h1>
        <p className="mt-2 text-lg text-muted-foreground">Find the perfect gear to elevate your performance.</p>
      </div>
      
      <div className="mb-8 flex justify-center">
        <div className="relative w-full max-w-xl">
          <Input 
            type="search"
            placeholder="Search products, brands, or keywords..."
            value={filters.searchTerm}
            onChange={handleSearchChange}
            className="h-12 rounded-full pl-12 text-base shadow-sm"
          />
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        </div>
      </div>

      <div className="flex flex-col gap-8 md:flex-row">
        <ProductFilter filters={filters} onFilterChange={handleFilterChange} />
        <main className="flex-1">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="flex h-full min-h-[400px] flex-col items-center justify-center rounded-lg border border-dashed bg-card p-8 text-center">
              <Search className="mb-4 h-16 w-16 text-muted-foreground" />
              <h2 className="text-2xl font-semibold">No Products Found</h2>
              <p className="mt-2 text-muted-foreground">
                Try adjusting your filters or search term.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

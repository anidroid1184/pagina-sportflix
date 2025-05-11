'use client';

import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { productCategories, productSizes, productColors } from '@/data/products';
import type { ProductCategory, ProductSize } from '@/types';
import { Button } from '@/components/ui/button';
import { X, Filter } from 'lucide-react';

export interface Filters {
  category: ProductCategory | 'all';
  size: ProductSize | 'all';
  color: string | 'all';
  searchTerm?: string;
}

interface ProductFilterProps {
  filters: Filters;
  onFilterChange: (newFilters: Filters) => void;
}

const categoryTranslations: Record<ProductCategory | 'all', string> = {
  "T-Shirts": "Camisetas",
  "Shorts": "Pantalonetas",
  "Hoodies": "Sudaderas",
  "Jackets": "Chaquetas",
  "Leggings": "Leggings",
  "Bikers": "Bikers",
  "Footwear": "Calzado",
  "Accessories": "Accesorios",
  "Sets": "Conjuntos",
  "all": "Todas las Categorías"
};


export function ProductFilter({ filters, onFilterChange }: ProductFilterProps) {
  const handleCategoryChange = (value: string) => {
    onFilterChange({ ...filters, category: value as ProductCategory | 'all' });
  };

  const handleSizeChange = (value: string) => {
    onFilterChange({ ...filters, size: value as ProductSize | 'all' });
  };

  const handleColorChange = (value: string) => {
    onFilterChange({ ...filters, color: value });
  };

  const resetFilters = () => {
    onFilterChange({ category: 'all', size: 'all', color: 'all', searchTerm: filters.searchTerm }); // Keep search term
  };
  
  const clearAll = () => {
    onFilterChange({ category: 'all', size: 'all', color: 'all', searchTerm: '' });
  }

  return (
    <aside className="w-full rounded-lg border bg-card p-6 shadow-lg md:w-72 lg:w-80">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="flex items-center gap-2 text-xl font-semibold text-primary">
          <Filter className="h-5 w-5" />
          Filtros
        </h3>
        <Button variant="ghost" size="sm" onClick={clearAll} className="text-xs text-muted-foreground hover:text-destructive">
            Limpiar Todo
        </Button>
      </div>
      <div className="space-y-6">
        <div>
          <label htmlFor="category-filter" className="mb-2 block text-sm font-medium text-foreground/90">Categoría</label>
          <Select value={filters.category} onValueChange={handleCategoryChange}>
            <SelectTrigger id="category-filter" className="rounded-md">
              <SelectValue placeholder="Seleccionar categoría" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{categoryTranslations['all']}</SelectItem>
              {productCategories.map((category) => (
                <SelectItem key={category} value={category}>{categoryTranslations[category] || category}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label htmlFor="size-filter" className="mb-2 block text-sm font-medium text-foreground/90">Talla</label>
          <Select value={filters.size} onValueChange={handleSizeChange}>
            <SelectTrigger id="size-filter" className="rounded-md">
              <SelectValue placeholder="Seleccionar talla" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas las Tallas</SelectItem>
              {productSizes.map((size) => (
                <SelectItem key={size} value={size}>{size}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label htmlFor="color-filter" className="mb-2 block text-sm font-medium text-foreground/90">Color</label>
          <Select value={filters.color} onValueChange={handleColorChange}>
            <SelectTrigger id="color-filter" className="rounded-md">
              <SelectValue placeholder="Seleccionar color" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los Colores</SelectItem>
              {productColors.map((color) => (
                <SelectItem key={color} value={color}>{color}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <Button 
          variant="outline" 
          onClick={resetFilters} 
          className="w-full rounded-md shadow-sm hover:shadow-md transition-shadow py-3 h-auto"
        >
          <div className="flex items-center justify-center w-full">
            <X className="mr-2 h-4 w-4 flex-shrink-0" />
            <span className="text-center leading-tight">
              Restablecer Filtros
              <br />
              (Mantener Búsqueda)
            </span>
          </div>
        </Button>
      </div>
    </aside>
  );
}

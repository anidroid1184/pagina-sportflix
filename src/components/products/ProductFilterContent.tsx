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
import type { ProductCategory, ProductSize, Filters } from '@/types'; // Import Filters from types
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface ProductFilterContentProps {
  filters: Filters;
  onFilterChange: (newFilters: Filters) => void;
  onResetFilters: () => void; // This will be the "Restablecer Filtros (Mantener Búsqueda)" action
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

export function ProductFilterContent({ 
  filters, 
  onFilterChange,
  onResetFilters
}: ProductFilterContentProps) {

  const handleCategoryChange = (value: string) => {
    onFilterChange({ ...filters, category: value as ProductCategory | 'all' });
  };

  const handleSizeChange = (value: string) => {
    onFilterChange({ ...filters, size: value as ProductSize | 'all' });
  };

  const handleColorChange = (value: string) => {
    onFilterChange({ ...filters, color: value });
  };

  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="category-filter-content" className="mb-2 block text-sm font-medium text-foreground/90">Categoría</label>
        <Select value={filters.category} onValueChange={handleCategoryChange}>
          <SelectTrigger id="category-filter-content" className="rounded-md">
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
        <label htmlFor="size-filter-content" className="mb-2 block text-sm font-medium text-foreground/90">Talla</label>
        <Select value={filters.size} onValueChange={handleSizeChange}>
          <SelectTrigger id="size-filter-content" className="rounded-md">
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
        <label htmlFor="color-filter-content" className="mb-2 block text-sm font-medium text-foreground/90">Color</label>
        <Select value={filters.color} onValueChange={handleColorChange}>
          <SelectTrigger id="color-filter-content" className="rounded-md">
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
        onClick={onResetFilters} // This is "Restablecer Filtros (Mantener Búsqueda)"
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
  );
}

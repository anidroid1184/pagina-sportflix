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
import { X } from 'lucide-react';

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
    onFilterChange({ category: 'all', size: 'all', color: 'all', searchTerm: '' });
  };

  return (
    <aside className="w-full rounded-lg border bg-card p-6 shadow-sm md:w-72 lg:w-80">
      <h3 className="mb-6 text-xl font-semibold">Filters</h3>
      <div className="space-y-6">
        <div>
          <label htmlFor="category-filter" className="mb-2 block text-sm font-medium">Category</label>
          <Select value={filters.category} onValueChange={handleCategoryChange}>
            <SelectTrigger id="category-filter">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {productCategories.map((category) => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label htmlFor="size-filter" className="mb-2 block text-sm font-medium">Size</label>
          <Select value={filters.size} onValueChange={handleSizeChange}>
            <SelectTrigger id="size-filter">
              <SelectValue placeholder="Select size" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Sizes</SelectItem>
              {productSizes.map((size) => (
                <SelectItem key={size} value={size}>{size}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label htmlFor="color-filter" className="mb-2 block text-sm font-medium">Color</label>
          <Select value={filters.color} onValueChange={handleColorChange}>
            <SelectTrigger id="color-filter">
              <SelectValue placeholder="Select color" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Colors</SelectItem>
              {productColors.map((color) => (
                <SelectItem key={color} value={color}>{color}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <Button variant="outline" onClick={resetFilters} className="w-full">
          <X className="mr-2 h-4 w-4" /> Reset Filters
        </Button>
      </div>
    </aside>
  );
}

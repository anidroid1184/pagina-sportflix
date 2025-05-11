'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';

interface ImageGalleryProps {
  images: string[];
  altText: string;
}

export function ImageGallery({ images, altText }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  if (!images || images.length === 0) {
    return (
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="aspect-square w-full bg-muted flex items-center justify-center">
            <p className="text-muted-foreground">No image available</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <Card className="overflow-hidden shadow-lg">
        <CardContent className="p-0">
          <div className="aspect-square w-full">
            <Image
              src={selectedImage}
              alt={altText}
              width={600}
              height={600}
              className="h-full w-full object-cover transition-opacity duration-300"
              priority // Prioritize loading the main image
              data-ai-hint="product photo"
            />
          </div>
        </CardContent>
      </Card>
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-2 sm:grid-cols-5 md:grid-cols-6">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(image)}
              className={cn(
                'overflow-hidden rounded-md border-2 aspect-square focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
                selectedImage === image ? 'border-primary' : 'border-transparent hover:border-muted-foreground/50'
              )}
              aria-label={`View image ${index + 1} of ${images.length}`}
            >
              <Image
                src={image}
                alt={`${altText} - thumbnail ${index + 1}`}
                width={100}
                height={100}
                className="h-full w-full object-cover"
                data-ai-hint="product thumbnail"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

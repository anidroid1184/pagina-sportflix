// src/components/icons/SporflixLogo.tsx
import Image from 'next/image';
import type { HTMLAttributes } from 'react';

interface SporflixLogoProps extends HTMLAttributes<HTMLDivElement> {
  width?: number;
  height?: number;
  alt?: string;
}

export function SporflixLogo({ width = 28, height = 28, alt = "SPORFLIX Logo", className, ...props }: SporflixLogoProps) {
  return (
    <div className={className} {...props} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
      <Image
        src="/images/logo.png"
        alt={alt}
        width={width}
        height={height}
      />
    </div>
  );
}

// src/components/icons/SporflixLogo.tsx
import Image from 'next/image';
import type { HTMLAttributes } from 'react';

interface SPORTFLIXLogoProps extends HTMLAttributes<HTMLDivElement> {
  width?: number;
  height?: number;
  alt?: string;
}

export function SPORTFLIXLogo({ width = 100, height = 100, alt = "SPORTFLIX Logo", className, ...props }: SPORTFLIXLogoProps) {
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

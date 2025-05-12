// src/components/icons/SporflixLogo.tsx
import type { SVGProps } from 'react';

export function SporflixLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100" // Assuming a square viewBox, adjust if needed
      fill="currentColor"
      {...props}
    >
      <path d="M85.39,14.61L14.61,85.39L14.61,75.73C14.61,75.73 20.12,64.75 30.82,60.56C41.52,56.37 50.67,58.48 50.67,58.48L50.67,49.33C50.67,49.33 43.63,41.95 38.27,30.82C32.92,19.69 34.31,14.61 34.31,14.61L49.33,14.61L49.33,41.52C49.33,41.52 56.37,44.36 61.73,50.67C67.08,56.98 65.69,69.18 65.69,69.18L65.69,85.39L85.39,85.39L85.39,14.61Z" />
    </svg>
  );
}


'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the catalog page, which has the search bar and filtering.
    router.push('/catalog');
  }, [router]);

  return (
    <div className="container mx-auto flex min-h-[calc(100vh-8rem)] flex-col items-center justify-center py-12 text-center">
      <h1 className="mb-4 text-3xl font-bold text-primary">Redirigiendo a la búsqueda...</h1>
      <p className="text-muted-foreground">Serás redirigido a nuestra página de catálogo donde podrás buscar productos.</p>
      <div className="mt-8 h-12 w-12 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
    </div>
  );
}

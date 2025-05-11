'use client' // Error components must be Client Components
 
import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { AlertTriangle } from 'lucide-react'
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])
 
  return (
    <div className="container mx-auto flex min-h-[calc(100vh-8rem)] flex-col items-center justify-center py-12 text-center">
      <AlertTriangle className="mb-6 h-20 w-20 text-destructive" />
      <h1 className="mb-4 text-3xl font-bold text-destructive">Something went wrong!</h1>
      <p className="mb-6 max-w-md text-muted-foreground">
        We apologize for the inconvenience. An unexpected error occurred. Please try again, or contact support if the problem persists.
      </p>
      <p className="mb-6 text-sm text-muted-foreground">
        Error details: {error.message}
      </p>
      <div className="flex gap-4">
        <Button
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
          variant="destructive"
          size="lg"
        >
          Try again
        </Button>
        <Button asChild variant="outline" size="lg">
            <a href="/">Go to Homepage</a>
        </Button>
      </div>
    </div>
  )
}

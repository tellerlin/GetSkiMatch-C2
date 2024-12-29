'use client';

import { Alert, AlertDescription, AlertTitle } from 'components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { ReactNode, useState } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

export default function ErrorBoundary({ children }: ErrorBoundaryProps) {
  const [error, setError] = useState<Error | null>(null);

  if (error) {
    return (
      <Alert variant="destructive" className="m-4">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Something went wrong</AlertTitle>
        <AlertDescription>
          {error.message || 'An unexpected error occurred'}
        </AlertDescription>
      </Alert>
    );
  }

  try {
    return <>{children}</>;
  } catch (err) {
    console.group('Error Boundary Caught Error');
    console.error('Error:', err);
    console.groupEnd();
    
    if (err instanceof Error) {
      setError(err);
    } else {
      setError(new Error('An unknown error occurred'));
    }
    
    return null;
  }
}

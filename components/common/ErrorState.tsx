'use client';

import { Alert, AlertDescription, AlertTitle } from 'components/ui/alert';
import { AlertCircle } from 'lucide-react';

interface ErrorStateProps {
  errors: Record<string, string>;
  title?: string;
}

export default function ErrorState({ 
  errors, 
  title = 'Error Loading Data' 
}: ErrorStateProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Alert variant="destructive" className="max-w-md">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>
          {Object.entries(errors).map(([key, message]) => (
            <div key={key} className="mt-1">
              <strong className="capitalize">{key}:</strong> {message}
            </div>
          ))}
        </AlertDescription>
      </Alert>
    </div>
  );
}

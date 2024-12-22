import { AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { format } from 'date-fns';

interface WeatherAlertProps {
  alert: {
    event: string;
    description: string;
    start: number;
    end: number;
  };
}

export default function WeatherAlert({ alert }: WeatherAlertProps) {
  return (
    <Alert variant="destructive" className="mb-4">
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>{alert.event}</AlertTitle>
      <AlertDescription>
        <p className="mt-2">{alert.description}</p>
        <div className="mt-2 text-sm">
          <p>From: {format(new Date(alert.start * 1000), 'PPp')}</p>
          <p>To: {format(new Date(alert.end * 1000), 'PPp')}</p>
        </div>
      </AlertDescription>
    </Alert>
  );
}
// ResortFeatures.tsx
import { SkiResort } from '@/lib/types';
import { Card, Badge } from '@/components/ui/card';
import { Moon, Sun, Snowflake } from 'lucide-react';

interface ResortFeaturesProps {
  resort: SkiResort;
}

export default function ResortFeatures({ resort }: ResortFeaturesProps) {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Resort Features</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Badge 
            variant={resort.night_skiing ? "default" : "secondary"}
            className={resort.night_skiing ? "bg-blue-600 hover:bg-blue-700 text-white" : "text-white bg-gray-600 hover:bg-gray-700"}
          >
            <Moon className="h-4 w-4 mr-2" />
            {resort.night_skiing ? "Night Skiing Available" : "No Night Skiing"}
          </Badge>
        </div>
        <div>
          <Badge 
            variant="default"
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Snowflake className="h-4 w-4 mr-2" />
            {resort.snow_parks} Snow Parks
          </Badge>
        </div>
      </div>
    </Card>
  );
}

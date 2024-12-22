import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Mountain, Moon, Trees } from 'lucide-react';
import type { SkiResort } from '@/lib/types';

interface ResortFeaturesProps {
  resort: SkiResort;
}

export default function ResortFeatures({ resort }: ResortFeaturesProps) {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Resort Features</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center gap-3">
          <Mountain className="h-5 w-5 text-blue-600" />
          <div>
            <p className="font-medium">Snow Parks</p>
            <p className="text-sm text-gray-600">
              {resort.features.snowParks} parks available
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Moon className="h-5 w-5 text-blue-600" />
          <div>
            <p className="font-medium">Night Skiing</p>
            <Badge variant={resort.features.nightSkiing ? "default" : "secondary"}>
              {resort.features.nightSkiing ? "Available" : "Not Available"}
            </Badge>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <div className="flex items-center gap-2 mb-2">
          <Trees className="h-5 w-5 text-blue-600" />
          <h3 className="font-medium">Season Information</h3>
        </div>
        <p className="text-sm text-gray-600">
          The resort is typically open from {resort.season.start} to {resort.season.end},
          offering excellent skiing conditions throughout the season.
        </p>
      </div>
    </Card>
  );
}
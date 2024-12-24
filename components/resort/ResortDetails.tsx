import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Snowflake, Mountain, Ski } from 'lucide-react';
import type { SkiResort } from '@/lib/types';

interface ResortDetailsProps {
  resort: SkiResort;
}

export default function ResortDetails({ resort }: ResortDetailsProps) {
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Slope Difficulty</h2>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Beginner</span>
              <span>{resort.beginner_percentage}%</span>
            </div>
            <Progress value={resort.beginner_percentage} className="bg-green-100" />
          </div>

          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Intermediate</span>
              <span>{resort.intermediate_percentage}%</span>
            </div>
            <Progress value={resort.intermediate_percentage} className="bg-blue-100" />
          </div>

          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Advanced</span>
              <span>{resort.advanced_percentage}%</span>
            </div>
            <Progress value={resort.advanced_percentage} className="bg-black/10" />
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Resort Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <Mountain className="h-5 w-5 text-blue-600" />
            <div>
              <p className="font-medium">Snow Parks</p>
              <p className="text-sm text-gray-600">
                {resort.snow_parks} parks available
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Ski className="h-5 w-5 text-blue-600" />
            <div>
              <p className="font-medium">Ski Lifts</p>
              <p className="text-sm text-gray-600">
                {resort.ski_lifts} lifts
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Snowflake className="h-5 w-5 text-blue-600" />
            <div>
              <p className="font-medium">Night Skiing</p>
              <Badge variant={resort.night_skiing ? "default" : "secondary"}>
                {resort.night_skiing ? "Available" : "Not Available"}
              </Badge>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
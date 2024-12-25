// TerrainOverview.tsx
import { SkiResort } from '@/lib/types';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { use } from 'react';

interface TerrainOverviewProps {
  resort: SkiResort;
}

export default function TerrainOverview({ resort }: TerrainOverviewProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Terrain Overview</CardTitle>
        <CardDescription>
          Overview of the terrain and slopes at {resort.name}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span>Beginner Percentage:</span>
            <span>{resort.beginner_percentage}%</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Intermediate Percentage:</span>
            <span>{resort.intermediate_percentage}%</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Advanced Percentage:</span>
            <span>{resort.advanced_percentage}%</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Total Slopes:</span>
            <span>{resort.total_slopes}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import type { SkiResort } from '@/lib/types';

interface TerrainOverviewProps {
  resort: SkiResort;
}

export default function TerrainOverview({ resort }: TerrainOverviewProps) {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Terrain Overview</h2>
      
      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span>Beginner</span>
            <span>{resort.difficulty.beginner}%</span>
          </div>
          <Progress value={resort.difficulty.beginner} className="bg-green-100" />
        </div>

        <div>
          <div className="flex justify-between text-sm mb-1">
            <span>Intermediate</span>
            <span>{resort.difficulty.intermediate}%</span>
          </div>
          <Progress value={resort.difficulty.intermediate} className="bg-blue-100" />
        </div>

        <div>
          <div className="flex justify-between text-sm mb-1">
            <span>Advanced</span>
            <span>{resort.difficulty.advanced}%</span>
          </div>
          <Progress value={resort.difficulty.advanced} className="bg-black/10" />
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 text-center">
        <div className="p-3 bg-gray-50 rounded">
          <p className="text-2xl font-bold text-blue-600">
            {resort.features.totalSlopes}
          </p>
          <p className="text-sm text-gray-600">Total Slopes</p>
        </div>

        <div className="p-3 bg-gray-50 rounded">
          <p className="text-2xl font-bold text-blue-600">
            {resort.features.skiLifts}
          </p>
          <p className="text-sm text-gray-600">Ski Lifts</p>
        </div>
      </div>
    </Card>
  );
}
import { SkiResort } from '../../lib/types/index';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '../../components/ui/card';

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
            <span>Total Slopes:</span>
            <span>{resort.total_slopes}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

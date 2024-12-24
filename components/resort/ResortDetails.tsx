import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import type { SkiResort } from '@/lib/types';
import { Snowflake, CableCar, Moon } from 'lucide-react';

interface ResortDetailsProps {
  resort: SkiResort;
}

export default function ResortDetails({ resort }: ResortDetailsProps) {
  return (
    <div className="space-y-6">
      {/* Slope Difficulty Section */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Slope Difficulty</h2>
        <div className="space-y-4">
          {[
            { label: 'Beginner', percentage: resort.beginner_percentage, color: 'bg-green-500' },
            { label: 'Intermediate', percentage: resort.intermediate_percentage, color: 'bg-blue-500' },
            { label: 'Advanced', percentage: resort.advanced_percentage, color: 'bg-red-500' },
          ].map(({ label, percentage, color }) => (
            <div key={label}>
              <div className="flex justify-between text-sm mb-1">
                <span>{label}</span>
                <span>{percentage}%</span>
              </div>
              <Progress value={percentage} className={color} />
            </div>
          ))}
        </div>
      </Card>

      {/* Resort Features Section */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Resort Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            {
              icon: <Snowflake className="h-5 w-5 text-blue-600" />,
              title: 'Snow Parks',
              description: `${resort.snow_parks} parks available`,
            },
            {
              icon: <CableCar className="h-5 w-5 text-blue-600" />,
              title: 'Ski Lifts',
              description: `${resort.ski_lifts} lifts`,
            },
            {
              icon: <Moon className="h-5 w-5 text-blue-600" />,
              title: 'Night Skiing',
              description: (
                <Badge
                  variant={resort.night_skiing ? 'default' : 'secondary'}
                  className={resort.night_skiing ? 'text-white' : ''}
                >
                  {resort.night_skiing ? 'Available' : 'Not Available'}
                </Badge>
              ),
            },
          ].map(({ icon, title, description }) => (
            <div key={title} className="flex items-center gap-3">
              {icon}
              <div>
                <p className="font-medium">{title}</p>
                <p className="text-sm text-gray-600">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import type { SkiResort } from '@/lib/types';
import { Snowflake, CableCar, Moon } from 'lucide-react';
import { useMemo } from 'react';

interface ResortDetailsProps {
  resort: SkiResort;
}

export default function ResortDetails({ resort }: ResortDetailsProps) {
  // 使用 useMemo 缓存难度数据计算
  const difficultyLevels = useMemo(() => [
    { label: 'Beginner', percentage: resort.beginner_percentage ?? 0, color: 'bg-green-500' },
    { label: 'Intermediate', percentage: resort.intermediate_percentage ?? 0, color: 'bg-blue-500' },
    { label: 'Advanced', percentage: resort.advanced_percentage ?? 0, color: 'bg-red-500' },
  ], [resort]);

  // 使用 useMemo 缓存特征数据计算
  const features = useMemo(() => [
    {
      icon: <Snowflake className="h-5 w-5 text-blue-600" aria-hidden="true" />,
      title: 'Snow Parks',
      description: resort.snow_parks != null 
        ? `${resort.snow_parks} parks available`
        : 'Data unavailable',
    },
    {
      icon: <CableCar className="h-5 w-5 text-blue-600" aria-hidden="true" />,
      title: 'Ski Lifts',
      description: resort.ski_lifts != null 
        ? `${resort.ski_lifts} lifts`
        : 'Data unavailable',
    },
    {
      icon: <Moon className="h-5 w-5 text-blue-600" aria-hidden="true" />,
      title: 'Night Skiing',
      description: (
        <Badge
          variant={resort.night_skiing ? 'default' : 'secondary'}
          className="text-white transition-colors duration-200"
        >
          {resort.night_skiing ? 'Available' : 'Not Available'}
        </Badge>
      ),
    },
  ], [resort]);

  return (
    <div className="space-y-6">
      {/* Slope Difficulty Section */}
      <Card className="p-6 transition-shadow duration-300 hover:shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Slope Difficulty</h2>
        <div className="space-y-4">
          {difficultyLevels.map(({ label, percentage, color }) => (
            <div key={label}>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium">{label}</span>
                <span className="text-gray-600">
                  {percentage !== null ? `${percentage}%` : 'N/A'}
                </span>
              </div>
              <Progress 
                value={percentage} 
                className={`transition-all duration-500 ${color}`}
                aria-label={`${label} difficulty percentage`}
              />
            </div>
          ))}
        </div>
      </Card>

      {/* Resort Features Section */}
      <Card className="p-6 transition-shadow duration-300 hover:shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Resort Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {features.map(({ icon, title, description }) => (
            <div 
              key={title} 
              className="flex items-center gap-3 p-3 rounded-lg transition-colors duration-200 hover:bg-gray-50"
            >
              {icon}
              <div>
                <p className="font-medium">{title}</p>
                <div className="text-sm text-gray-600">{description}</div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

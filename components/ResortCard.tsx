import Image from 'next/image';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Snowflake, Mountain, DollarSign, Wind, Thermometer } from 'lucide-react';
import type { SkiResort } from '@/lib/types';

interface ResortCardProps {
  resort: SkiResort & { matchScore: number };
  weather?: any;
}

export default function ResortCard({ resort, weather }: ResortCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48">
        <Image
          src={resort.imageUrl}
          alt={resort.name}
          fill
          className="object-cover"
        />
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <Badge variant="secondary" className="bg-white/90 text-blue-600">
            {resort.matchScore}% Match
          </Badge>
          {weather && (
            <div className="flex flex-col gap-1">
              <Badge variant="secondary" className="bg-white/90 flex items-center gap-1">
                <Thermometer className="h-3 w-3" />
                {weather.current.temp}°C
              </Badge>
              <Badge variant="secondary" className="bg-white/90 flex items-center gap-1">
                <Wind className="h-3 w-3" />
                {weather.current.wind_speed} m/s
              </Badge>
              {weather.current.weather[0].main.toLowerCase().includes('snow') && (
                <Badge variant="secondary" className="bg-white/90 flex items-center gap-1">
                  <Snowflake className="h-3 w-3" />
                  Snowing
                </Badge>
              )}
            </div>
          )}
        </div>
      </div>
      
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-2">{resort.name}</h2>
        <p className="text-gray-600 mb-4">
          {resort.location.region}, {resort.location.country}
        </p>
        
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Snowflake className="h-5 w-5 text-blue-500" />
            <div className="flex-1">
              <div className="flex justify-between text-sm mb-1">
                <span>Beginner</span>
                <span>{resort.difficulty.beginner}%</span>
              </div>
              <Progress value={resort.difficulty.beginner} />
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Mountain className="h-5 w-5 text-blue-500" />
            <div className="flex-1">
              <div className="flex justify-between text-sm mb-1">
                <span>Advanced</span>
                <span>{resort.difficulty.advanced}%</span>
              </div>
              <Progress value={resort.difficulty.advanced} />
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-blue-500" />
            <span className="text-sm">
              Day Pass: ${resort.pricing.adultDayPass}
            </span>
          </div>
        </div>
        
        <Link
          href={`/ski-resort/${resort.id}`}
          className="mt-6 inline-block w-full text-center bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200"
        >
          View Details
        </Link>
      </div>
    </Card>
  );
}
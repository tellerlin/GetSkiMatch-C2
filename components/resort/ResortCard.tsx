import Image from 'next/image';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Snowflake, Mountain, DollarSign } from 'lucide-react';
import type { SkiResort } from '@/lib/types';

interface ResortCardProps {
  resort: SkiResort;
}

export default function ResortCard({ resort }: ResortCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48">
        <Image
          src={resort.image_url}
          alt={resort.name}
          fill
          className="object-cover"
        />
      </div>
      
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-2">{resort.name}</h2>
        <p className="text-gray-600 mb-4">
          {resort.region}, {resort.country_code}
        </p>
        
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Snowflake className="h-5 w-5 text-blue-500" />
            <div className="flex-1">
              <div className="flex justify-between text-sm mb-1">
                <span>Beginner</span>
                <span>{resort.beginner_percentage}%</span>
              </div>
              <Progress value={resort.beginner_percentage} />
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Mountain className="h-5 w-5 text-blue-500" />
            <div className="flex-1">
              <div className="flex justify-between text-sm mb-1">
                <span>Advanced</span>
                <span>{resort.advanced_percentage}%</span>
              </div>
              <Progress value={resort.advanced_percentage} />
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-blue-500" />
            <span className="text-sm">
              Day Pass: {resort.adult_day_pass} {resort.currency}
            </span>
          </div>

          {resort.night_skiing === 1 && (
            <Badge variant="secondary" className="bg-blue-100">
              Night Skiing Available
            </Badge>
          )}
        </div>
        
        <Link
          href={`/ski-resort/${resort.resort_id}`}
          className="mt-6 inline-block w-full text-center bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200"
        >
          View Details
        </Link>
      </div>
    </Card>
  );
}
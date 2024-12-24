import Image from 'next/image';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Snowflake, Mountain, DollarSign } from 'lucide-react';


interface SkiResort {
  resort_id: string;
  name: string;
  country_code: string;
  region?: string;
  total_slopes: number;
  snow_parks?: number;
  ski_lifts?: number;
  adult_day_pass: number;
  currency?: string;
  night_skiing: 0 | 1;
  image_url?: string;
}


interface ResortCardProps {
  resort: SkiResort;
}


export default function ResortCard({ resort }: ResortCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {resort.image_url && (
        <div className="relative h-48">
          <Image
            src={resort.image_url}
            alt={resort.name}
            fill
            className="object-cover"
          />
        </div>
      )}
      
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-2">{resort.name}</h2>
        <p className="text-gray-600 mb-4">
          {resort.region}, {resort.country_code}
        </p>
        
        <div className="space-y-4">
          {/* 总坡道信息 */}
          <div className="flex items-center gap-2">
            <Snowflake className="h-5 w-5 text-blue-500" />
            <span className="text-sm">
              Total Slopes: {resort.total_slopes}
            </span>
          </div>


          {/* 雪公园 */}
          {resort.snow_parks !== undefined && (
            <div className="flex items-center gap-2">
              <Mountain className="h-5 w-5 text-blue-500" />
              <span className="text-sm">
                Snow Parks: {resort.snow_parks}
              </span>
            </div>
          )}
          
          {/* 缆车 */}
          {resort.ski_lifts !== undefined && (
            <div className="flex items-center gap-2">
              <Mountain className="h-5 w-5 text-blue-500" />
              <span className="text-sm">
                Ski Lifts: {resort.ski_lifts}
              </span>
            </div>
          )}


          {/* 日票价格 */}
          <div className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-blue-500" />
            <span className="text-sm">
              Day Pass: {resort.adult_day_pass} {resort.currency || 'USD'}
            </span>
          </div>


          {/* 夜间滑雪 */}
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
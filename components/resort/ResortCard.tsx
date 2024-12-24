import Image from 'next/image';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Snowflake, Mountain, DollarSign, Moon, CableCar } from 'lucide-react';

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
      <div className="relative h-48">
        <Image
          src={resort.image_url || '/images/placeholder.jpg'}
          alt={resort.name}
          fill
          className="object-cover"
        />
      </div>

      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-1">{resort.name}</h2>
        <p className="text-gray-500 mb-4">
          {resort.region ? `${resort.region}, ` : ''}
          {resort.country_code}
        </p>

        <div className="space-y-3">
          {/* Total Slopes */}
          <div className="flex items-center gap-2">
            <Snowflake className="h-5 w-5 text-blue-500" aria-label="Total Slopes" />
            <span className="text-sm">
              Total Slopes: {resort.total_slopes || 'N/A'}
            </span>
          </div>

          {/* Snow Parks */}
          <div className="flex items-center gap-2">
            <Mountain className="h-5 w-5 text-green-500" aria-label="Snow Parks" />
            <span className="text-sm">
              Snow Parks: {resort.snow_parks !== undefined ? resort.snow_parks : 'N/A'}
            </span>
          </div>

          {/* Ski Lifts */}
          <div className="flex items-center gap-2">
            <CableCar className="h-5 w-5 text-red-500" aria-label="Ski Lifts" />
            <span className="text-sm">
              Ski Lifts: {resort.ski_lifts !== undefined ? resort.ski_lifts : 'N/A'}
            </span>
          </div>

          {/* Day Pass Price */}
          <div className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-yellow-500" aria-label="Day Pass Price" />
            <span className="text-sm">
              Day Pass: {resort.adult_day_pass} {resort.currency || 'USD'}
            </span>
          </div>

          {/* Night Skiing */}
          {resort.night_skiing === 1 && (
            <div className="flex items-center gap-2">
              <Moon className="h-5 w-5 text-purple-500" aria-label="Night Skiing" />
              <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                Night Skiing Available
              </Badge>
            </div>
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

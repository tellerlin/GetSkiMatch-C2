'use client';

import Link from 'next/link';
import { Card } from 'components/ui/card';
import { memo } from 'react';
import ResortImage from './ResortImage';
import ResortInfo from './ResortInfo';
import NightSkiingBadge from './NightSkiingBadge';

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
  night_skiing: number;
  image_url?: string;
}

interface ResortCardProps {
  resort: SkiResort;
  weather?: any;
}

const ResortCard = memo(function ResortCard({ resort, weather }: ResortCardProps) {
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: resort.currency || 'USD',
  }).format(resort.adult_day_pass);

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 focus-within:ring-2 focus-within:ring-blue-400 h-full flex flex-col">
      <ResortImage imageUrl={resort.image_url || ''} name={resort.name} />

      <div className="p-6 flex flex-col flex-grow">
        <div className="h-[76px]">
          <h2 className="text-2xl font-semibold mb-1 text-gray-900 line-clamp-1">
            <span className="hover:text-blue-600 transition-colors duration-200">
              {resort.name}
            </span>
          </h2>
          <p className="text-gray-600 text-sm line-clamp-2">
            {resort.region ? `${resort.region}, ` : ''}
            {resort.country_code}
          </p>
        </div>

        <div className="flex-grow">
          <ResortInfo
            totalSlopes={resort.total_slopes}
            snowParks={resort.snow_parks}
            skiLifts={resort.ski_lifts}
            price={formattedPrice}
            weather={weather}
          />

          {resort.night_skiing === 1 && (
            <div className="mt-4">
              <NightSkiingBadge />
            </div>
          )}
        </div>

        <div className="mt-6">
          <Link
            href={`/ski-resort/${resort.resort_id}`}
            className="inline-block w-full text-center bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            View Details
          </Link>
        </div>
      </div>
    </Card>
  );
});

export default ResortCard;

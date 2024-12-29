'use client';

import Link from 'next/link';
import { Card } from 'components/ui/card';
import { Badge } from 'components/ui/badge';
import { memo } from 'react';
import ResortImage from './ResortImage';
import { Thermometer, CloudSnow } from 'lucide-react';

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
  slopes_description?: string;
  season_start?: string;
  season_end?: string;
  weather_agency?: string;
  currentWeather?: {
    temperature: number;
    weather_description: string;
  };
}

interface ResortCardProps {
  resort: SkiResort;
}

const ResortCard = memo(function ResortCard({ resort }: ResortCardProps) {
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
          {resort.currentWeather && (
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="secondary" className="flex items-center gap-1">
                <Thermometer className="h-4 w-4" />
                {Math.round(resort.currentWeather.temperature)}°C
              </Badge>
              <Badge variant="secondary" className="capitalize">
                {resort.currentWeather.weather_description}
              </Badge>
            </div>
          )}
        </div>

        <div className="flex-grow">
          {resort.slopes_description && (
            <div className="bg-gray-50 p-3 rounded-lg mb-4">
              <p className="text-sm text-gray-700 line-clamp-3">
                {resort.slopes_description}
              </p>
            </div>
          )}
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-sm text-gray-600">Total Slopes</p>
              <p className="font-medium">{resort.total_slopes}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Ski Lifts</p>
              <p className="font-medium">{resort.ski_lifts}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Snow Parks</p>
              <p className="font-medium">{resort.snow_parks}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Day Pass</p>
              <p className="font-medium">{formattedPrice}</p>
            </div>
          </div>

          <div className="text-sm text-gray-600 mb-4">
            Season: {resort.season_start} - {resort.season_end}
          </div>

          {resort.weather_agency && (
            <div className="text-xs text-gray-500 mb-4">
              Weather data by {resort.weather_agency}
            </div>
          )}
        </div>

        <Link
          href={`/ski-resort/${resort.resort_id}`}
          className="inline-block w-full text-center bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          View Details
        </Link>
      </div>
    </Card>
  );
});

export default ResortCard;
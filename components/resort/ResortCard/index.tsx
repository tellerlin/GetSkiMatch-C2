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
          {resort.currentWeather && (
            <div className="flex items-center gap-1 mt-1">
              <span className="text-sm font-medium">
                {Math.round(resort.currentWeather.temperature)}°C
              </span>
              <span className="text-sm text-gray-600">
                {resort.currentWeather.weather_description}
              </span>
            </div>
          )}
        </div>

        <div className="flex-grow">
          <div className="space-y-2">
            {resort.slopes_description && (
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-700 leading-relaxed">
                  {resort.slopes_description}
                </p>
              </div>
            )}
            <div className="flex flex-wrap gap-2 text-sm">
              <div className="bg-gray-100 px-2 py-1 rounded">
                {resort.total_slopes} slopes
              </div>
              {resort.snow_parks && (
                <div className="bg-gray-100 px-2 py-1 rounded">
                  {resort.snow_parks} snow parks
                </div>
              )}
              {resort.ski_lifts && (
                <div className="bg-gray-100 px-2 py-1 rounded">
                  {resort.ski_lifts} ski lifts
                </div>
              )}
            </div>
            <div className="text-sm text-gray-600">
              Season: {resort.season_start} - {resort.season_end}
            </div>
            {resort.weather_agency && (
              <div className="text-sm text-gray-600">
                Weather data by {resort.weather_agency}
              </div>
            )}
            <div className="font-medium">
              {formattedPrice} / day
            </div>
          </div>

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

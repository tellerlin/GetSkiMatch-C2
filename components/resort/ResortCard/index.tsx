'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Card } from 'components/ui/card';
import { Badge } from 'components/ui/badge';
import { memo, useState } from 'react';
import { Thermometer, CloudSnow, Mountain, DollarSign, Moon, CableCar } from 'lucide-react';

import { SkiResort } from 'lib/types';

interface WeatherData {
  temperature: number;
  weather_description: string;
}

interface ResortCardProps {
  resort: SkiResort;
  weather?: WeatherData;
}

const ResortCard = memo(function ResortCard({ resort, weather }: ResortCardProps) {
  const [imageError, setImageError] = useState(false);
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: resort.currency || 'USD',
  }).format(resort.adult_day_pass);

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 focus-within:ring-2 focus-within:ring-blue-400 h-full flex flex-col">
      <div className="relative h-48 bg-gray-200">
        <Image
          src={imageError ? '/images/placeholder.jpg' : (resort.image_url || '/images/placeholder.jpg')}
          alt={`View of ${resort.name} ski resort`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-opacity duration-300"
          loading="lazy"
          onError={() => setImageError(true)}
        />
      </div>

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
          {(weather || resort.currentWeather) && (
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="secondary" className="flex items-center gap-1">
                <Thermometer className="h-4 w-4" />
                {Math.round((weather?.temperature || resort.currentWeather?.temperature) as number)}°C
              </Badge>
              <Badge variant="secondary" className="capitalize">
                {weather?.weather_description || resort.currentWeather?.weather_description}
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

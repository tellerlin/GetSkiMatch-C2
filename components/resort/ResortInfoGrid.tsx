'use client';

import { Snowflake, Mountain, CableCar, DollarSign } from 'lucide-react';
import { SkiResort } from 'lib/types';

interface ResortInfoGridProps {
  resort: SkiResort;
}

export default function ResortInfoGrid({ resort }: ResortInfoGridProps) {
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-3">
      {/* Slopes */}
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <Snowflake className="h-5 w-5 text-blue-500 flex-shrink-0" />
          <span className="text-sm text-gray-500">Slopes:</span>
        </div>
        <span className="text-sm font-medium pl-7">
          {resort.total_slopes || 'N/A'}
        </span>
      </div>

      {/* Parks */}
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <Mountain className="h-5 w-5 text-green-500 flex-shrink-0" />
          <span className="text-sm text-gray-500">Parks:</span>
        </div>
        <span className="text-sm font-medium pl-7">
          {resort.snow_parks !== undefined ? resort.snow_parks : 'N/A'}
        </span>
      </div>

      {/* Lifts */}
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <CableCar className="h-5 w-5 text-red-500 flex-shrink-0" />
          <span className="text-sm text-gray-500">Lifts:</span>
        </div>
        <span className="text-sm font-medium pl-7">
          {resort.ski_lifts !== undefined ? resort.ski_lifts : 'N/A'}
        </span>
      </div>

      {/* Price */}
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <DollarSign className="h-5 w-5 text-yellow-500 flex-shrink-0" />
          <span className="text-sm text-gray-500">Price:</span>
        </div>
        <span className="text-sm font-medium pl-7">
          {new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: resort.currency || 'USD',
          }).format(resort.adult_day_pass)}
        </span>
      </div>
    </div>
  );
}

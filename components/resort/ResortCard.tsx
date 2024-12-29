'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Card } from 'components/ui/card';
import { Badge } from 'components/ui/badge';
import ResortInfoGrid from './ResortInfoGrid';
import NightSkiingBadge from './NightSkiingBadge';
import { memo } from 'react';
import { imageLoader } from 'lib/utils/image-loader';

import type { SkiResort } from 'lib/types';

interface ResortCardProps {
  resort: SkiResort;
  className?: string;
}

const ResortCard = memo(function ResortCard({ resort, className }: ResortCardProps) {
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: resort.currency || 'USD',
  }).format(resort.adult_day_pass);

  const { mobile, tablet } = imageLoader.getResponsiveSizes();

  return (
    <Card className={`overflow-hidden hover:shadow-lg transition-shadow duration-300 focus-within:ring-2 focus-within:ring-blue-400 h-full flex flex-col group animate-fade-in ${className}`}>
        {/* Image Section */}
        <div className="relative h-48 bg-gray-200">
          <Image
            src={resort.image_url || '/images/placeholder.jpg'}
            alt={`View of ${resort.name} ski resort`}
            fill
            sizes={`(max-width: 640px) ${mobile}px, (max-width: 1024px) ${tablet}px, 100vw`}
            className="object-cover transition-opacity duration-300 group-hover:scale-105"
            loading="lazy"
            placeholder="blur"
            blurDataURL={imageLoader.getBlurDataURL(700, 475)}
          />
        </div>

        <div className="p-6 flex flex-col flex-grow">
          {/* Title Section */}
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

          {/* Info Grid */}
          <div className="flex-grow">
            <ResortInfoGrid resort={resort} />

            {/* Night Skiing Badge */}
            {resort.night_skiing === 1 && <NightSkiingBadge className="mt-4" />}
          </div>

          {/* Button Section */}
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

ResortCard.displayName = 'ResortCard';

export default ResortCard;

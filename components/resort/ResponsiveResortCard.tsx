'use client';

import Image from 'next/image';
import { imageLoader } from '../../lib/utils/image-loader';
import { FadeIn } from '../../components/ui/animations';
import { SkiResort } from '../../lib/types/index';

interface ResponsiveResortCardProps {
  resort: SkiResort;
}

export default function ResponsiveResortCard({ resort }: ResponsiveResortCardProps) {
  const { mobile, tablet } = imageLoader.getResponsiveSizes();
  
  return (
    <FadeIn>
      <div className="resort-card group">
        <div className="resort-card-image">
          {resort.image_url && (
            <Image
              src={resort.image_url}
              alt={resort.name}
              fill
              sizes={`(max-width: 640px) ${mobile}px, (max-width: 1024px) ${tablet}px, 100vw`}
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              placeholder="blur"
              blurDataURL={imageLoader.getBlurDataURL(700, 475)}
              priority={false}
            />
          )}
        </div>
        
        <div className="resort-card-content">
          <h3 className="text-xl font-semibold mb-2 line-clamp-2">
            {resort.name}
          </h3>
          
          <div className="space-y-2">
            <p className="text-sm text-gray-600">
              <span className="font-medium">Total Slopes:</span> {resort.total_slopes}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Day Pass:</span> {resort.adult_day_pass} {resort.currency}
            </p>
          </div>
        </div>
      </div>
    </FadeIn>
  );
}

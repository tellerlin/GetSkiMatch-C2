import Image from 'next/image';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Snowflake, Mountain, DollarSign, Moon, CableCar } from 'lucide-react';
import { memo } from 'react';

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


const ResortCard = memo(function ResortCard({ resort }: ResortCardProps) {
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: resort.currency || 'USD',
  }).format(resort.adult_day_pass);

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 focus-within:ring-2 focus-within:ring-blue-400 h-full flex flex-col">
      {/* 图片部分 */}
      <div className="relative h-48 bg-gray-200">
        <Image
          src={resort.image_url || '/images/placeholder.jpg'}
          alt={`View of ${resort.name} ski resort`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-opacity duration-300"
          loading="lazy"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,..."
        />
      </div>

      <div className="p-6 flex flex-col flex-grow">
        {/* 标题部分 - 固定高度 */}
        <div className="h-[76px]"> {/* 根据实际需要调整高度 */}
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

        {/* 信息网格 */}
        <div className="flex-grow">
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
              <span className="text-sm font-medium pl-7">{formattedPrice}</span>
            </div>
          </div>

          {/* Night Skiing Badge */}
          {resort.night_skiing === 1 && (
            <div className="mt-4">
              <div className="flex items-center gap-2">
                <Moon className="h-5 w-5 text-purple-500 flex-shrink-0" />
                <Badge 
                  variant="secondary" 
                  className="bg-purple-100 text-purple-800 font-medium"
                >
                  Night Skiing Available
                </Badge>
              </div>
            </div>
          )}
        </div>

        {/* 按钮区域 */}
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
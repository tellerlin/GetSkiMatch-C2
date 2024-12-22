import Image from 'next/image';
import { Calendar, DollarSign } from 'lucide-react';
import { Card } from '@/components/ui/card';
import type { SkiResort } from '@/lib/types';

interface ResortHeaderProps {
  resort: SkiResort;
}

export default function ResortHeader({ resort }: ResortHeaderProps) {
  return (
    <div className="relative h-[400px]">
      <Image
        src={resort.imageUrl}
        alt={resort.name}
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      
      <div className="absolute bottom-0 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            {resort.name}
          </h1>
          <p className="text-xl text-white/90 mb-6">
            {resort.location.region}, {resort.location.country}
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card className="bg-white/90 backdrop-blur p-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-sm font-medium">Season</p>
                  <p className="text-gray-600">
                    {resort.season.start} to {resort.season.end}
                  </p>
                </div>
              </div>
            </Card>
            
            <Card className="bg-white/90 backdrop-blur p-4">
              <div className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-sm font-medium">Day Pass</p>
                  <p className="text-gray-600">
                    ${resort.pricing.adultDayPass} {resort.pricing.currency}
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
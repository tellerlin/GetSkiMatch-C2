import { SkiResort } from '@/lib/types';
import { Card } from '@/components/ui/card';
import { Calendar, DollarSign, Mountain } from 'lucide-react';

interface ResortHeaderProps {
  resort: SkiResort;
}

export default function ResortHeader({ resort }: ResortHeaderProps) {
  return (
    <div className="bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          {resort.name}
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          {resort.region}, {resort.country_code}
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <Mountain className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium">Total Slopes</p>
                <p className="text-gray-600">{resort.total_slopes}</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium">Season</p>
                <p className="text-gray-600">
                  {resort.season_start} to {resort.season_end}
                </p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <DollarSign className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium">Day Pass</p>
                <p className="text-gray-600">
                  {resort.adult_day_pass} {resort.currency}
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
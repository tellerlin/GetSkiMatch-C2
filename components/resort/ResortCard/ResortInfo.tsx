import { Snowflake, Mountain, CableCar, DollarSign, Thermometer } from 'lucide-react';

interface ResortInfoProps {
  totalSlopes: number;
  snowParks?: number;
  skiLifts?: number;
  price: string;
  weather?: any;
}

export default function ResortInfo({ totalSlopes, snowParks, skiLifts, price, weather }: ResortInfoProps) {
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-3">
      {weather && (
        <InfoItem
          icon={<Thermometer className="h-5 w-5 text-blue-500" />}
          label="Temp"
          value={`${weather.current.temp}°C`}
        />
      )}
      <InfoItem
        icon={<Snowflake className="h-5 w-5 text-blue-500" />}
        label="Slopes"
        value={totalSlopes}
      />
      <InfoItem
        icon={<Mountain className="h-5 w-5 text-green-500" />}
        label="Parks"
        value={snowParks}
      />
      <InfoItem
        icon={<CableCar className="h-5 w-5 text-red-500" />}
        label="Lifts"
        value={skiLifts}
      />
      <InfoItem
        icon={<DollarSign className="h-5 w-5 text-yellow-500" />}
        label="Price"
        value={price}
        isPrice
      />
    </div>
  );
}

interface InfoItemProps {
  icon: React.ReactNode;
  label: string;
  value: number | string | undefined;
  isPrice?: boolean;
}

function InfoItem({ icon, label, value, isPrice }: InfoItemProps) {
  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-2">
        {icon}
        <span className="text-sm text-gray-500">{label}:</span>
      </div>
      <span className="text-sm font-medium pl-7">
        {value !== undefined ? value : 'N/A'}
      </span>
    </div>
  );
}

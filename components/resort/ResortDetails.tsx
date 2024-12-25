// components/resort/ResortDetails.tsx
import { SkiResort } from '@/lib/types';
import { WeatherData } from '@/lib/types';
import { Card } from '@/components/ui/card';
import { 
  Mountain, 
  ArrowUp, 
  ArrowDown, 
  Wind, 
  Thermometer, 
  CloudSnow,
  Sun,
  Cloud, 
} from 'lucide-react';

interface ResortDetailsProps {
  resort: SkiResort | null;
  weather: WeatherData | null;
}

export default function ResortDetails({ resort, weather }: ResortDetailsProps) {
  if (!resort) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight">Resort Details</h2>
        <Card className="p-6">
          <div className="text-center text-gray-500">
            <Mountain className="h-12 w-12 mx-auto mb-2" />
            <p>Resort information is currently unavailable</p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold tracking-tight">Resort Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ElevationInfo resort={resort} />
        <CurrentConditions weather={weather} />
      </div>
    </div>
  );
}

const ElevationInfo = ({ resort }: { resort: SkiResort }) => {
  if (!resort.elevation?.summit || !resort.elevation?.base) {
    return (
      <Card className="p-6">
        <div className="text-center text-gray-500">
          <Mountain className="h-12 w-12 mx-auto mb-2" />
          <p>Elevation information is not available</p>
        </div>
      </Card>
    );
  }

  const verticalDrop = resort.elevation.summit - resort.elevation.base;

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Mountain className="h-6 w-6 text-blue-600" />
          <h3 className="text-lg font-semibold">Elevation Details</h3>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="flex items-center space-x-2 text-gray-600">
              <ArrowUp className="h-4 w-4" />
              <span className="text-sm">Summit</span>
            </div>
            <p className="font-semibold">{resort.elevation.summit.toLocaleString()}m</p>
          </div>
          
          <div>
            <div className="flex items-center space-x-2 text-gray-600">
              <ArrowDown className="h-4 w-4" />
              <span className="text-sm">Base</span>
            </div>
            <p className="font-semibold">{resort.elevation.base.toLocaleString()}m</p>
          </div>
          
          <div className="col-span-2">
            <div className="flex items-center space-x-2 text-gray-600">
              <Mountain className="h-4 w-4" />
              <span className="text-sm">Vertical Drop</span>
            </div>
            <p className="font-semibold">{verticalDrop.toLocaleString()}m</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

const CurrentConditions = ({ weather }: { weather: WeatherData | null }) => {
  if (!weather?.currentWeather) {
    return (
      <Card className="p-6">
        <div className="text-center text-gray-500">
          <CloudSnow className="h-12 w-12 mx-auto mb-2" />
          <p>Weather information is currently unavailable</p>
        </div>
      </Card>
    );
  }

  const { currentWeather } = weather;

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <CloudSnow className="h-6 w-6 text-blue-600" />
          <h3 className="text-lg font-semibold">Current Conditions</h3>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="flex items-center space-x-2 text-gray-600">
              <Thermometer className="h-4 w-4" />
              <span className="text-sm">Temperature</span>
            </div>
            <p className="font-semibold">
              {currentWeather.temperature}°C
              <span className="block text-sm text-gray-500">
                Feels like {currentWeather.feels_like}°C
              </span>
            </p>
          </div>

          <div>
            <div className="flex items-center space-x-2 text-gray-600">
              <Wind className="h-4 w-4" />
              <span className="text-sm">Wind</span>
            </div>
            <p className="font-semibold">
              {currentWeather.wind_speed} m/s
              {currentWeather.wind_gust && (
                <span className="block text-sm text-gray-500">
                  Gusts up to {currentWeather.wind_gust} m/s
                </span>
              )}
            </p>
          </div>

          <div>
            <div className="flex items-center space-x-2 text-gray-600">
              <Cloud className="h-4 w-4" />
              <span className="text-sm">Conditions</span>
            </div>
            <p className="font-semibold">{currentWeather.weather_description}</p>
          </div>

          <div>
            <div className="flex items-center space-x-2 text-gray-600">
              <Sun className="h-4 w-4" />
              <span className="text-sm">UV Index</span>
            </div>
            <p className="font-semibold">{currentWeather.uv_index}</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

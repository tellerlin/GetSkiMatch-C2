import { SkiResort } from '@/lib/types';
import { WeatherData } from '@/lib/utils/weather-service';
import { Card } from '@/components/ui/card';
import { 
  Mountain, 
  ArrowUp, 
  ArrowDown, 
  Wind, 
  Thermometer, 
  CloudSnow,
  Compass,
  Sun,
  Loader2,
} from 'lucide-react';

interface ResortDetailsProps {
  resort: SkiResort | null;
  weather: WeatherData | null;
  isLoading?: boolean;
}

function ResortDetails({ resort, weather, isLoading = false }: ResortDetailsProps) {
  if (isLoading) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight">Resort Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6">
            <div className="flex items-center justify-center h-48">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            </div>
          </Card>
        </div>
      </div>
    );
  }

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
        <SnowConditions weather={weather} />
      </div>
    </div>
  );
}

interface ElevationInfoProps {
  resort: SkiResort;
}

const ElevationInfo = ({ resort }: ElevationInfoProps) => {
  if (!resort.elevation || 
      typeof resort.elevation.summit === 'undefined' || 
      typeof resort.elevation.base === 'undefined') {
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
          
          <div>
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

interface SnowConditionsProps {
  weather: WeatherData | null;
}


const SnowConditions = ({ weather }: SnowConditionsProps) => {
  if (!weather || !weather.currentWeather) {
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
              {currentWeather.temperature.current}°C
              <span className="text-sm text-gray-500 ml-1">
                (Feels like {currentWeather.temperature.feels_like}°C)
              </span>
            </p>
          </div>

          <div>
            <div className="flex items-center space-x-2 text-gray-600">
              <Wind className="h-4 w-4" />
              <span className="text-sm">Wind</span>
            </div>
            <p className="font-semibold">
              {currentWeather.wind.speed} m/s
              <span className="text-sm text-gray-500 ml-1">
                ({currentWeather.wind.direction}°)
              </span>
            </p>
          </div>

          <div>
            <div className="flex items-center space-x-2 text-gray-600">
              <Cloud className="h-4 w-4" />
              <span className="text-sm">Conditions</span>
            </div>
            <p className="font-semibold">{currentWeather.conditions.main}</p>
            <p className="text-sm text-gray-500">{currentWeather.conditions.description}</p>
          </div>

          <div>
            <div className="flex items-center space-x-2 text-gray-600">
              <CloudSnow className="h-4 w-4" />
              <span className="text-sm">Snow</span>
            </div>
            <p className="font-semibold">{currentWeather.conditions.snowAmount}mm</p>
          </div>
        </div>
      </div>
    </Card>
  );
};


export default ResortDetails;

import { SkiResort, WeatherData } from '@/lib/types';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Mountain, 
  ArrowUp, 
  ArrowDown, 
  Wind, 
  Thermometer, 
  CloudSnow,
  Sun,
  Cloud,
  MapPin,
  Calendar,
  DollarSign
} from 'lucide-react';

interface ResortDetailsProps {
  resort: SkiResort;
  weather: WeatherData | null;
}

export default function ResortDetails({ resort, weather }: ResortDetailsProps) {
  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold tracking-tight">Resort Details</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Location Info */}
        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <MapPin className="h-6 w-6 text-blue-600" />
              <h3 className="text-lg font-semibold">Location</h3>
            </div>
            <div className="grid gap-4">
              <div>
                <p className="text-sm text-gray-600">Coordinates</p>
                <p className="font-medium">
                  {resort.latitude.toFixed(4)}°N, {resort.longitude.toFixed(4)}°W
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Region</p>
                <p className="font-medium">{resort.region}, {resort.country_code}</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Season & Pricing */}
        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-6 w-6 text-blue-600" />
              <h3 className="text-lg font-semibold">Season & Pricing</h3>
            </div>
            <div className="grid gap-4">
              <div>
                <p className="text-sm text-gray-600">Season</p>
                <p className="font-medium">
                  {resort.season_start} to {resort.season_end}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Adult Day Pass</p>
                <p className="font-medium">
                  {formatCurrency(resort.adult_day_pass, resort.currency)}
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Terrain Distribution */}
        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Mountain className="h-6 w-6 text-blue-600" />
              <h3 className="text-lg font-semibold">Terrain Distribution</h3>
            </div>
            <div className="grid gap-4">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Beginner</p>
                  <p className="font-medium">{resort.beginner_percentage}%</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Intermediate</p>
                  <p className="font-medium">{resort.intermediate_percentage}%</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Advanced</p>
                  <p className="font-medium">{resort.advanced_percentage}%</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Total Slopes</p>
                  <p className="font-medium">{resort.total_slopes}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Ski Lifts</p>
                  <p className="font-medium">{resort.ski_lifts}</p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Current Weather */}
        {weather && (
          <Card className="p-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <CloudSnow className="h-6 w-6 text-blue-600" />
                <h3 className="text-lg font-semibold">Current Weather</h3>
              </div>
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Temperature</p>
                    <p className="font-medium">
                      {weather.currentWeather.temperature.toFixed(1)}°C
                      <span className="block text-sm text-gray-500">
                        Feels like {weather.currentWeather.feels_like.toFixed(1)}°C
                      </span>
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Wind</p>
                    <p className="font-medium">
                      {weather.currentWeather.wind_gust.toFixed(1)} m/s
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Conditions</p>
                  <p className="font-medium capitalize">
                    {weather.currentWeather.weather_description}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Humidity</p>
                    <p className="font-medium">{weather.currentWeather.humidity}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">UV Index</p>
                    <p className="font-medium">{weather.currentWeather.uv_index}</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        )}
      </div>

      {/* Features */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Resort Features</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <Badge 
              variant={resort.night_skiing ? "default" : "secondary"}
              className={resort.night_skiing ? "bg-blue-600 hover:bg-blue-700 text-white" : ""}
            >
              {resort.night_skiing ? "Night Skiing Available" : "No Night Skiing"}
            </Badge>
          </div>
          <div>
            <Badge 
              variant="default"
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              {resort.snow_parks} Snow Parks
            </Badge>
          </div>
        </div>
      </Card>
    </div>
  );
}
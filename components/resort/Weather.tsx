import React from 'react';
import { Card } from 'components/ui/card';
import { Badge } from 'components/ui/badge';
import { 
  Cloud, Thermometer, Wind, Sun, Droplets 
} from 'lucide-react';
import { format, parseISO } from 'date-fns';


// 添加 WeatherForecastProps 接口
interface WeatherForecastProps {
  weather: {
    currentWeather: {
      temperature: number;
      feels_like: number;
      weather_description: string;
      icon_id: string;
    };
    forecast: Array<{
      forecast_date: string;
      temperature_max: number;
      temperature_min: number;
      wind_speed: number;
      wind_gust: number;
      precipitation_probability: number;
      uv_index: number;
      conditions: {
        description: string;
        icon_id: string;
      };
    }>;
  };
}

const formatTemperature = (temp: number) => Math.round(temp * 10) / 10;


const getConditionBadge = (conditions: {
  description: string;
}) => {
  if (conditions.description.toLowerCase().includes('snow')) return { label: 'Snow', color: 'bg-blue-600 text-white' };
  if (conditions.description.toLowerCase().includes('rain')) return { label: 'Rain', color: 'bg-yellow-500 text-white' };
  return { label: 'Fair', color: 'bg-gray-500 text-white' };
};


const getWeatherIcon = (icon_id: string) => {
  return <img 
    src={`https://openweathermap.org/img/wn/${icon_id}@2x.png`}
    alt="Weather icon"
    className="h-12 w-12"
  />;
};


const formatDateSafely = (dateString: string, formatString: string = 'EEE, MMM d'): string => {
  try {
    const parsedDate = parseISO(dateString);
    return format(parsedDate, formatString);
  } catch (error) {
    console.error('Date formatting error:', error);
    return 'Invalid Date';
  }
};


const WeatherMetric = ({ icon, label, value, subValue }: {
  icon: React.ReactNode;
  label: string;
  value: string;
  subValue?: string;
}) => (
  <div className="flex items-center gap-3">
    {icon}
    <div>
      <p className="text-sm text-gray-600">{label}</p>
      <p className="font-medium">{value}</p>
      {subValue && <p className="text-sm text-gray-500">{subValue}</p>}
    </div>
  </div>
);


// 使用默认导出
const Weather: React.FC<WeatherForecastProps> = ({ weather }) => {
  const ForecastSection = () => {
    if (!weather?.forecast || weather.forecast.length === 0) {
      return (
        <div className="text-center text-gray-500 py-6">
          <Cloud className="h-8 w-8 mx-auto mb-2" />
          <p>Forecast data is unavailable</p>
        </div>
      );
    }


    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-3">8-Day Forecast</h3>
          <div className="space-y-4">
            {weather.forecast.map((day, index) => {
              const conditionBadge = getConditionBadge(day.conditions);
              const formattedDate = formatDateSafely(day.forecast_date);


              return (
                <Card key={index} className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">{formattedDate}</span>
                    <Badge className={conditionBadge.color}>
                      {conditionBadge.label}
                    </Badge>
                  </div>


                  <div className="flex items-center gap-4 mb-4">
                    {getWeatherIcon(day.conditions.icon_id)}
                    <div>
                      <p className="font-medium capitalize">{day.conditions.description}</p>
                      <p className="text-sm text-gray-600">Conditions</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <WeatherMetric
                      icon={<Thermometer className="h-4 w-4" />}
                      label="Temperature"
                      value={`${formatTemperature(day.temperature_max)}°C / ${formatTemperature(day.temperature_min)}°C`}
                    />
                    <WeatherMetric
                      icon={<Wind className="h-4 w-4" />}
                      label="Wind"
                      value={`${day.wind_speed} m/s`}
                      subValue={`Gusts ${day.wind_gust} m/s`}
                    />
                    <WeatherMetric
                      icon={<Droplets className="h-4 w-4" />}
                      label="Precipitation"
                      value={`${(day.precipitation_probability * 100).toFixed(0)}%`}
                    />
                    <WeatherMetric
                      icon={<Sun className="h-4 w-4" />}
                      label="UV Index"
                      value={day.uv_index ? day.uv_index.toString() : 'N/A'}
                    />
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    );
  };


  return (
    <section className="w-full">
      <Card className="p-6">
        <ForecastSection />
      </Card>
    </section>
  );
};


// 添加默认导出
export default Weather;
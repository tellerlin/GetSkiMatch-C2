import { Cloud, Snowflake, Sun, CloudRain } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface WeatherBadgeProps {
  temp: number;
  conditions?: string;
  className?: string;
}

export default function WeatherBadge({ temp, conditions, className }: WeatherBadgeProps) {
  const getWeatherIcon = () => {
    if (!conditions) return <Sun className="h-4 w-4" />;
    
    const condition = conditions.toLowerCase();
    if (condition.includes('snow')) return <Snowflake className="h-4 w-4" />;
    if (condition.includes('rain')) return <CloudRain className="h-4 w-4" />;
    if (condition.includes('cloud')) return <Cloud className="h-4 w-4" />;
    return <Sun className="h-4 w-4" />;
  };

  return (
    <Badge variant="secondary" className={`flex items-center gap-1 ${className}`}>
      {getWeatherIcon()}
      <span>{temp}°C</span>
    </Badge>
  );
}
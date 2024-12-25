import { memo } from 'react';

interface WeatherMetricProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  subValue?: string;
}

const WeatherMetric = memo(({ icon, label, value, subValue }: WeatherMetricProps) => (
  <div className="flex items-center gap-3" role="group" aria-label={label}>
    {icon}
    <div>
      <p className="text-sm text-gray-600">{label}</p>
      <p className="font-medium">{value}</p>
      {subValue && <p className="text-sm text-gray-500">{subValue}</p>}
    </div>
  </div>
));

WeatherMetric.displayName = 'WeatherMetric';

export default WeatherMetric;
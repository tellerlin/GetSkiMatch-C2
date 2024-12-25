'use client';

import { Card } from '@/components/ui/card';
import { format } from 'date-fns';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import ChartTooltip from './ChartTooltip';

interface WeatherChartProps {
  forecast: Array<{
    forecast_date: string;
    temperature_max: number;
    temperature_min: number;
    snow_amount: number;
  }>;
}

export default function WeatherChart({ forecast }: WeatherChartProps) {
  if (!forecast?.length) return null;

  const data = forecast.map(day => ({
    date: format(new Date(day.forecast_date), 'MMM dd'),
    max: Math.round(day.temperature_max),
    min: Math.round(day.temperature_min),
    snow: day.snow_amount
  }));

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-6">Temperature & Snowfall Forecast</h2>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis yAxisId="temp" name="Temperature (°C)" />
            <YAxis yAxisId="snow" orientation="right" name="Snowfall (cm)" />
            <Tooltip content={<ChartTooltip />} />
            <Legend />
            <Line
              yAxisId="temp"
              type="monotone"
              dataKey="max"
              stroke="#ff4444"
              name="Max Temp (°C)"
            />
            <Line
              yAxisId="temp"
              type="monotone"
              dataKey="min"
              stroke="#2196f3"
              name="Min Temp (°C)"
            />
            <Line
              yAxisId="snow"
              type="monotone"
              dataKey="snow"
              stroke="#4caf50"
              name="Snowfall (cm)"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
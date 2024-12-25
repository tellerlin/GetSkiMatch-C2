import { format } from 'date-fns';

interface TooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

export default function ChartTooltip({ active, payload, label }: TooltipProps) {
  if (!active || !payload) return null;

  return (
    <div className="bg-white p-3 shadow-lg rounded-lg border">
      <p className="font-medium mb-2">{format(new Date(label), 'MMM dd')}</p>
      {payload.map((entry, index) => (
        <p key={index} className="text-sm" style={{ color: entry.color }}>
          {entry.name}: {entry.value}
          {entry.name.includes('Temp') ? '°C' : 'cm'}
        </p>
      ))}
    </div>
  );
}
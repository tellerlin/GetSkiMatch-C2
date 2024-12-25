import { Moon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function NightSkiingBadge() {
  return (
    <div className="flex items-center gap-2">
      <Moon className="h-5 w-5 text-purple-500" />
      <Badge variant="secondary" className="bg-purple-100 text-purple-800 font-medium">
        Night Skiing Available
      </Badge>
    </div>
  );
}
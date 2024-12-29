'use client';

import { Moon } from 'lucide-react';
import { Badge } from 'components/ui/badge';

interface NightSkiingBadgeProps {
  className?: string;
}

export default function NightSkiingBadge({ className }: NightSkiingBadgeProps) {
  return (
    <div className={className}>
      <div className="flex items-center gap-2">
        <Moon className="h-5 w-5 text-purple-500 flex-shrink-0" />
        <Badge 
          variant="secondary" 
          className="bg-purple-100 text-purple-800 font-medium"
        >
          Night Skiing Available
        </Badge>
      </div>
    </div>
  );
}

import ResortCard from './ResortCard';
import { SkiResort } from '@/lib/types';

interface ResortListProps {
  resorts: SkiResort[];
}

export default function ResortList({ resorts }: ResortListProps) {
  if (!resorts.length) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">No resorts found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {resorts.map(resort => (
        <ResortCard key={resort.resort_id} resort={resort} />
      ))}
    </div>
  );
}
import { Suspense } from 'react';
import ResortContent from '@/components/resort/ResortContent';
import { Loader2 } from 'lucide-react';
import { getResortById } from '@/lib/utils/resort-service';

// This is required for static site generation with `output: export`
export async function generateStaticParams() {
  // Get the list of all resort IDs from your mock data
  const resortIds = ['whistler-blackcomb', 'zermatt', 'niseko-united'];
  
  return resortIds.map((id) => ({
    id: id,
  }));
}

export default function ResortDetailPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    }>
      <ResortContent />
    </Suspense>
  );
}
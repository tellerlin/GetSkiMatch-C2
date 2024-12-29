'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import ResortCard from './ResortCard';
import { SkiResort } from '@/lib/types';
import { Loader2 } from 'lucide-react';
import Pagination from '../filters/Pagination';

export default function ResortList() {
  const [resorts, setResorts] = useState<Array<SkiResort>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 12,
    total_pages: 0
  });

  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchResorts = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams(searchParams?.toString() || '');
        
        if (!params.has('page')) params.set('page', '1');
        if (!params.has('limit')) params.set('limit', '12');

        const response = await fetch(`https://ski-query-worker.3we.org/resorts?${params.toString()}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch resorts');
        }

        const data = await response.json();
        console.log('API Response:', data); // 添加日志以检查API响应

        if (data.resorts && Array.isArray(data.resorts)) {
          // 获取每个滑雪场的详细信息
          const detailedResorts = await Promise.all(
            data.resorts.map(async (resort: SkiResort) => {
              try {
                const detailResponse = await fetch(`https://ski-query-worker.3we.org/resort?id=${resort.resort_id}`);
                const detailData = await detailResponse.json();
                console.log('Detail Response for', resort.resort_id, ':', detailData); // 添加日志
                
                return {
                  ...resort,
                  slopes_description: detailData.resort?.slopes_description,
                  weather_agency: detailData.resort?.weather_agency,
                  currentWeather: detailData.currentWeather
                };
              } catch (error) {
                console.error('Error fetching resort details:', error);
                return resort;
              }
            })
          );

          setResorts(detailedResorts);
          setPagination({
            total: data.pagination.total,
            page: data.pagination.page,
            limit: data.pagination.limit,
            total_pages: data.pagination.total_pages
          });
        }
      } catch (err) {
        console.error('Error fetching resorts:', err);
        setError(err instanceof Error ? err.message : 'An error occurred while fetching resorts');
        setResorts([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResorts();
  }, [searchParams]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 py-8">
        {error}
      </div>
    );
  }

  if (resorts.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="bg-blue-50 rounded-lg p-6 inline-block">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">No Results Found</h3>
          <p className="text-blue-600">
            Try adjusting your filters or removing some criteria to see more results.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resorts.map(resort => (
          <ResortCard key={resort.resort_id} resort={resort} />
        ))}
      </div>

      {pagination.total_pages > 1 && (
        <Pagination 
          pagination={pagination}
          onPageChange={(page) => {
            const params = new URLSearchParams(searchParams?.toString() || '');
            params.set('page', page.toString());
            window.history.pushState(null, '', `?${params.toString()}`);
          }}
        />
      )}

      <div className="text-center text-gray-600 mt-4">
        Showing {resorts.length} of {pagination.total} resorts
      </div>
    </div>
  );
}
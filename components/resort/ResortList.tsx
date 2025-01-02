'use client';

import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import ResortCard from './ResortCard';
import { SkiResort } from '../../lib/types/index';
import { Loader2 } from 'lucide-react';
import Pagination from '../filters/Pagination';

export default function ResortList() {
  const [resorts, setResorts] = useState<Array<SkiResort>>([]);
  const resortsRef = useRef<Array<SkiResort>>([]);
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
        console.log('Search Parameters:', Object.fromEntries(params.entries()));
        
        if (!params.has('page')) params.set('page', '1');
        if (!params.has('limit')) params.set('limit', '12');
  
  
        const apiUrl = `https://ski-query-worker.3we.org/resorts?${params.toString()}`;
        console.log('API Request URL:', apiUrl);
        
        const response = await fetch(apiUrl);
        console.log('API Response Status:', response.status);
        
        if (!response.ok) {
          const errorData = await response.json();
          console.error('API Error Response:', errorData);
          throw new Error(errorData.message || 'Failed to fetch resorts');
        }
  
  
        const responseData = await response.json();
        console.log('Full API Response:', responseData);
  
  
        // 修改这部分代码
        const resortsData = responseData.resorts || [];
        console.log('Checking resorts data:', resortsData);
  
  
        if (resortsData && Array.isArray(resortsData)) {
          console.log('Resorts data is valid array, length:', resortsData.length);
          
          // 获取每个滑雪场的详细信息
          const detailedResorts = await Promise.all(
            resortsData.map(async (resort: any) => {
              try {
                const detailResponse = await fetch(`https://ski-query-worker.3we.org/resort?id=${resort.resort_id}`);
                const detailData = await detailResponse.json();
                console.log('Detail Response for', resort.resort_id, ':', detailData);
                
                // Convert night_skiing to 0 | 1
                const nightSkiing = resort.night_skiing ? 1 : 0;
                
                const convertedResort = {
                  ...resort,
                  night_skiing: nightSkiing,
                  slopes_description: detailData.resort?.slopes_description,
                  weather_agency: detailData.resort?.weather_agency,
                  currentWeather: detailData.currentWeather
                };
  
  
                return convertedResort;
              } catch (error) {
                console.error('Error fetching resort details:', error);
                return resort;
              }
            })
          );
  
  
          console.log('Detailed Resorts:', detailedResorts);
          setResorts(detailedResorts);
          resortsRef.current = detailedResorts;
          
          // 使用 responseData.pagination 设置分页信息
          setPagination({
            total: responseData.pagination.total,
            page: responseData.pagination.page,
            limit: responseData.pagination.limit,
            total_pages: responseData.pagination.total_pages
          });
          
          console.log('Resorts state after set:', detailedResorts);
        } else {
          // 如果没有数据，设置空数组
          setResorts([]);
          setPagination({
            total: 0,
            page: 1,
            limit: 12,
            total_pages: 0
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

  console.log('Rendering resorts:', resorts);
  if (resorts.length === 0) {
    console.log('No resorts found, showing empty state');
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
        {resorts.map((resort, index) => (
          <ResortCard key={`${resort.resort_id}-${index}`} resort={resort} />
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

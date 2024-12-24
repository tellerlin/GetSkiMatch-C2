'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import ResortCard from './ResortCard';
import { SkiResort } from '@/lib/types';
import { Loader2 } from 'lucide-react';
import Pagination from '../filters/Pagination';

export default function ResortList() {
  const [resorts, setResorts] = useState<SkiResort[]>([]);
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
        // 构建查询参数
        const params = new URLSearchParams(searchParams?.toString() || '');
        
        // 确保分页参数存在
        if (!params.has('page')) params.set('page', '1');
        if (!params.has('limit')) params.set('limit', '12');

        const response = await fetch(`https://ski-query-worker.3we.org/resorts?${params.toString()}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch resorts');
        }

        const data = await response.json();
        
        if (data.resorts && Array.isArray(data.resorts)) {
          setResorts(data.resorts);
          setPagination({
            total: data.pagination.total,
            page: data.pagination.page,
            limit: data.pagination.limit,
            total_pages: data.pagination.total_pages
          });
        } else {
          setResorts([]);
          setPagination({
            total: 0,
            page: 1,
            limit: 12,
            total_pages: 0
          });
        }
      } catch (err) {
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
          pagination={{
            page: pagination.page,
            total_pages: pagination.total_pages
          }}
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
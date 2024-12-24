'use client';


import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import ResortCard from './ResortCard';
import { SkiResort, PaginationInfo } from '@/lib/types';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';


export default function ResortList() {
  const [resorts, setResorts] = useState<SkiResort[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<PaginationInfo>({
    total: 0,
    page: 1,
    limit: 12,
    total_pages: 0
  });


  const searchParams = useSearchParams();
  const router = useRouter();


  useEffect(() => {
    const fetchResorts = async () => {
      // 安全地处理 searchParams
      const params: Record<string, string> = {};
      
      if (searchParams) {
        searchParams.forEach((value, key) => {
          params[key] = value;
        });
      }


      // 确保始终有分页参数
      params.page = params.page || '1';
      params.limit = params.limit || '12';


      const queryString = new URLSearchParams(params).toString();


      setIsLoading(true);
      setError(null);


      try {
        const response = await fetch(`https://ski-query-worker.3we.org/resorts?${queryString}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch resorts');
        }


        const data = await response.json();
        
        setResorts(data.resorts || []);
        
        setPagination({
          total: data.pagination.total,
          page: data.pagination.page,
          limit: data.pagination.limit,
          total_pages: data.pagination.total_pages
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        setResorts([]);
      } finally {
        setIsLoading(false);
      }
    };


    // 修改判断条件
    if (searchParams && searchParams.toString().length > 0) {
      fetchResorts();
    }
  }, [searchParams]);


  const handlePageChange = (newPage: number) => {
    // 安全地处理现有参数
    const currentParams: Record<string, string> = {};
    
    if (searchParams) {
      searchParams.forEach((value, key) => {
        currentParams[key] = value;
      });
    }


    const updatedParams = { ...currentParams, page: newPage.toString() };
    
    router.push(`/resorts?${new URLSearchParams(updatedParams).toString()}`);
  };


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
      <div className="text-center text-gray-600 py-8">
        No resorts found. Try adjusting your search criteria.
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


      {/* 内置分页组件 */}
      {pagination.total_pages > 1 && (
        <div className="flex justify-center mt-6">
          <Pagination 
            currentPage={pagination.page}
            totalPages={pagination.total_pages}
            onPageChange={handlePageChange}
          />
        </div>
      )}


      <div className="text-center text-gray-600 mt-4">
        Showing {resorts.length} of {pagination.total} resorts
      </div>
    </div>
  );
}


// 内置 Pagination 组件
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}


function Pagination({ 
  currentPage, 
  totalPages, 
  onPageChange 
}: PaginationProps) {
  return (
    <div className="flex items-center space-x-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </Button>
      
      <span className="text-sm">
        Page {currentPage} of {totalPages}
      </span>
      
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </Button>
    </div>
  );
}
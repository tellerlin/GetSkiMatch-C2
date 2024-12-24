'use client';

import { useState, useEffect } from 'react';
import { getFilteredResorts } from '@/lib/utils/resort-service';
import { getCountries } from '@/lib/utils/resort-service';
import FilterForm from '@/components/filters/FilterForm';
import Pagination from '@/components/filters/Pagination';
import ResortList from '@/components/resort/ResortList';
import { ResortFilters } from '@/lib/types/filters';
import { Loader2 } from 'lucide-react';

export default function ResortsPage() {
  const [loading, setLoading] = useState(true);
  const [resorts, setResorts] = useState([]);
  const [countries, setCountries] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [filters, setFilters] = useState<ResortFilters>({
    page: 1,
    limit: 12
  });

  useEffect(() => {
    loadResorts();
    loadCountries();
  }, []);

  const loadResorts = async () => {
    setLoading(true);
    try {
      const { resorts, pagination } = await getFilteredResorts(filters);
      setResorts(resorts);
      setPagination(pagination);
    } catch (error) {
      console.error('Error loading resorts:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadCountries = async () => {
    try {
      const countriesData = await getCountries();
      setCountries(countriesData);
    } catch (error) {
      console.error('Error loading countries:', error);
    }
  };

  const handleFilter = async (newFilters: ResortFilters) => {
    const updatedFilters = {
      ...newFilters,
      page: 1,
      limit: filters.limit
    };
    setFilters(updatedFilters);
    await loadResorts();
  };

  const handlePageChange = async (page: number) => {
    const updatedFilters = { ...filters, page };
    setFilters(updatedFilters);
    await loadResorts();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Find Ski Resorts
          </h1>
          <p className="text-gray-600">
            Filter and explore ski resorts worldwide
          </p>
        </div>

        <FilterForm onFilter={handleFilter} countries={countries} />

        <div className="mt-8">
          <ResortList resorts={resorts} />
        </div>

        {pagination && (
          <Pagination
            pagination={pagination}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </main>
  );
}
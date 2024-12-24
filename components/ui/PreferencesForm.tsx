'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search } from 'lucide-react';
import type { ResortFilters, Country } from '@/lib/types/filters';

export default function PreferencesForm() {
  const router = useRouter();
  const [countries, setCountries] = useState<Country[]>([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://ski-query-worker.3we.org/countries');
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        console.error('Failed to fetch countries:', error);
      }
    };
    fetchCountries();
  }, []);

  const { register, handleSubmit, setValue, watch, getValues, formState: { errors } } = useForm<ResortFilters>({
    defaultValues: {
      total_slopes_min: 0,
      total_slopes_max: 500,
      snow_parks_min: 0,
      snow_parks_max: 100,
      ski_lifts_min: 0,
      ski_lifts_max: 50,
      adult_day_pass_min: 0,
      adult_day_pass_max: 500,
    },
  });

  const onSubmit = (data: ResortFilters) => {
    const filteredData = Object.fromEntries(
      Object.entries(data).filter(([_, v]) => v !== undefined && v !== '')
    );
    const queryParams = new URLSearchParams(
      Object.entries(filteredData).map(([k, v]) => [k, String(v)])
    );
    router.push(`/resorts?${queryParams.toString()}`);
  };

  const resetForm = () => {
    Object.keys(getValues()).forEach(key => {
      setValue(key as keyof ResortFilters, undefined);
    });
  };

  const validateNumberInput = (value: number, min: number, max: number) => {
    return (value >= min && value <= max) || 
           `Value must be between ${min} and ${max}`;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="space-y-4">
        <Label>Resort Name</Label>
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search resorts..."
            className="pl-9"
            {...register('name')}
          />
        </div>
      </div>

      <div className="space-y-4">
        <Label>Countries</Label>
        <Select 
          onValueChange={(value) => setValue('country_code', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Country" />
          </SelectTrigger>
          <SelectContent>
            {countries.map((country) => (
              <SelectItem 
                key={country.country_code} 
                value={country.country_code}
              >
                {country.name} ({country.total_resorts} resorts)
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        <Label>Total Slopes Range</Label>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Input
              type="number"
              placeholder="Min slopes"
              {...register('total_slopes_min', { 
                valueAsNumber: true,
                validate: (value) => validateNumberInput(value, 0, 500)
              })}
            />
            {errors.total_slopes_min && (
              <p className="text-red-500 text-sm mt-1">
                {errors.total_slopes_min.message}
              </p>
            )}
          </div>
          <div>
            <Input
              type="number"
              placeholder="Max slopes"
              {...register('total_slopes_max', { 
                valueAsNumber: true,
                validate: (value) => validateNumberInput(value, 0, 500)
              })}
            />
            {errors.total_slopes_max && (
              <p className="text-red-500 text-sm mt-1">
                {errors.total_slopes_max.message}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="flex space-x-4">
        <Button 
          type="submit" 
          className="flex-1"
        >
          Find Resorts
        </Button>
        <Button 
          type="button" 
          variant="outline" 
          onClick={resetForm}
          className="flex-1"
        >
          Reset Filters
        </Button>
      </div>
    </form>
  );
}

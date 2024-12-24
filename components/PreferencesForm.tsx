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
import type { ResortFilters } from '@/lib/types/filters';
import type { Country } from '@/lib/types/filters';


export default function PreferencesForm() {
  const router = useRouter();
  const [countries, setCountries] = useState<Country[]>([]);
  
  useEffect(() => {
    // 获取国家列表
    fetch('https://ski-query-worker.3we.org/countries')
      .then(response => response.json())
      .then(data => setCountries(data))
      .catch(error => console.error('Error fetching countries:', error));
  }, []);


  const { register, handleSubmit, setValue, watch } = useForm<ResortFilters>({
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
    const queryParams = new URLSearchParams();
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== '') {
        queryParams.append(key, value.toString());
      }
    });
    router.push(`/resorts?${queryParams.toString()}`);
  };


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Resort Name */}
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


      {/* Countries */}
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


      {/* Total Slopes Range */}
      <div className="space-y-4">
        <Label>Total Slopes Range</Label>
        <div className="grid grid-cols-2 gap-4">
          <Input
            type="number"
            placeholder="Min slopes"
            {...register('total_slopes_min', { valueAsNumber: true })}
          />
          <Input
            type="number"
            placeholder="Max slopes"
            {...register('total_slopes_max', { valueAsNumber: true })}
          />
        </div>
      </div>


      {/* Snow Parks Range */}
      <div className="space-y-4">
        <Label>Snow Parks Range</Label>
        <div className="grid grid-cols-2 gap-4">
          <Input
            type="number"
            placeholder="Min snow parks"
            {...register('snow_parks_min', { valueAsNumber: true })}
          />
          <Input
            type="number"
            placeholder="Max snow parks"
            {...register('snow_parks_max', { valueAsNumber: true })}
          />
        </div>
      </div>


      {/* Ski Lifts Range */}
      <div className="space-y-4">
        <Label>Ski Lifts Range</Label>
        <div className="grid grid-cols-2 gap-4">
          <Input
            type="number"
            placeholder="Min ski lifts"
            {...register('ski_lifts_min', { valueAsNumber: true })}
          />
          <Input
            type="number"
            placeholder="Max ski lifts"
            {...register('ski_lifts_max', { valueAsNumber: true })}
          />
        </div>
      </div>


      {/* Adult Day Pass Range */}
      <div className="space-y-4">
        <Label>Adult Day Pass Range</Label>
        <div className="grid grid-cols-2 gap-4">
          <Input
            type="number"
            placeholder="Min price"
            {...register('adult_day_pass_min', { valueAsNumber: true })}
          />
          <Input
            type="number"
            placeholder="Max price"
            {...register('adult_day_pass_max', { valueAsNumber: true })}
          />
        </div>
      </div>


      {/* Night Skiing */}
      <div className="space-y-4">
        <Label>Night Skiing</Label>
        <Select 
          onValueChange={(value) => setValue('night_skiing', value === '1' ? 1 : 0)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Night Skiing" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">Available</SelectItem>
            <SelectItem value="0">Not Available</SelectItem>
          </SelectContent>
        </Select>
      </div>


      <Button type="submit" className="w-full">
        Find Resorts
      </Button>
    </form>
  );
}
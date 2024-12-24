'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { Slider } from '@/components/ui/slider';
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
import { Card } from '@/components/ui/card';
import { Search, Globe2 } from 'lucide-react';
import type { ResortFilters } from '@/lib/types/filters';

export default function PreferencesForm() {
  const router = useRouter();
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  
  const { register, handleSubmit, setValue, watch } = useForm<ResortFilters>({
    defaultValues: {
      total_slopes_min: 0,
      total_slopes_max: 500,
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

      <div className="space-y-4">
        <Label>Day Pass Budget Range</Label>
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

      <Button type="submit" className="w-full">
        Find Resorts
      </Button>
    </form>
  );
}
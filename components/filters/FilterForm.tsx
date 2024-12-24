'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ResortFilters } from '@/lib/types/filters';

interface FilterFormProps {
  onFilter: (filters: ResortFilters) => void;
  countries: Array<{ country_code: string; name: string }>;
}

export default function FilterForm({ onFilter, countries }: FilterFormProps) {
  const { register, handleSubmit, setValue, watch } = useForm<ResortFilters>();
  const [selectedCountry, setSelectedCountry] = useState<string>('');

  const onSubmit = (data: ResortFilters) => {
    onFilter(data);
  };

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label>Resort Name</Label>
            <Input
              placeholder="Search by name"
              {...register('name')}
            />
          </div>

          <div>
            <Label>Country</Label>
            <Select
              onValueChange={(value) => {
                setSelectedCountry(value);
                setValue('country_code', value);
              }}
              value={selectedCountry}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a country" />
              </SelectTrigger>
              <SelectContent>
                {countries.map((country) => (
                  <SelectItem key={country.country_code} value={country.country_code}>
                    {country.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Total Slopes</Label>
            <div className="grid grid-cols-2 gap-2">
              <Input
                type="number"
                placeholder="Min"
                {...register('total_slopes_min', { valueAsNumber: true })}
              />
              <Input
                type="number"
                placeholder="Max"
                {...register('total_slopes_max', { valueAsNumber: true })}
              />
            </div>
          </div>

          <div>
            <Label>Adult Day Pass</Label>
            <div className="grid grid-cols-2 gap-2">
              <Input
                type="number"
                placeholder="Min"
                {...register('adult_day_pass_min', { valueAsNumber: true })}
              />
              <Input
                type="number"
                placeholder="Max"
                {...register('adult_day_pass_max', { valueAsNumber: true })}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button type="submit">Apply Filters</Button>
        </div>
      </form>
    </Card>
  );
}
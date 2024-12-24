'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ResortFilters, Country } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';

interface FilterFormProps {
  onFilter: (filters: ResortFilters) => void;
  countries: Country[];
}

export default function FilterForm({ onFilter, countries }: FilterFormProps) {
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const { register, handleSubmit, setValue, watch } = useForm<ResortFilters>();

  const onSubmit = (data: ResortFilters) => {
    const filters = {
      ...data,
      country_code: selectedCountries.length > 0 ? selectedCountries : undefined
    };
    onFilter(filters);
  };

  const handleCountrySelect = (code: string) => {
    if (!selectedCountries.includes(code)) {
      setSelectedCountries([...selectedCountries, code]);
    }
  };

  const removeCountry = (code: string) => {
    setSelectedCountries(selectedCountries.filter(c => c !== code));
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
            <Label>Countries</Label>
            <Select onValueChange={handleCountrySelect}>
              <SelectTrigger>
                <SelectValue placeholder="Select countries" />
              </SelectTrigger>
              <SelectContent>
                {countries.map((country) => (
                  <SelectItem key={country.country_code} value={country.country_code}>
                    {country.name} ({country.total_resorts} resorts)
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {selectedCountries.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {selectedCountries.map(code => {
                  const country = countries.find(c => c.country_code === code);
                  return (
                    <Badge key={code} variant="secondary" className="flex items-center gap-1">
                      {country?.name}
                      <X 
                        className="h-3 w-3 cursor-pointer" 
                        onClick={() => removeCountry(code)}
                      />
                    </Badge>
                  );
                })}
              </div>
            )}
          </div>

          <div>
            <Label>Total Slopes Range</Label>
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
            <Label>Snow Parks Range</Label>
            <div className="grid grid-cols-2 gap-2">
              <Input
                type="number"
                placeholder="Min"
                {...register('snow_parks_min', { valueAsNumber: true })}
              />
              <Input
                type="number"
                placeholder="Max"
                {...register('snow_parks_max', { valueAsNumber: true })}
              />
            </div>
          </div>

          <div>
            <Label>Ski Lifts Range</Label>
            <div className="grid grid-cols-2 gap-2">
              <Input
                type="number"
                placeholder="Min"
                {...register('ski_lifts_min', { valueAsNumber: true })}
              />
              <Input
                type="number"
                placeholder="Max"
                {...register('ski_lifts_max', { valueAsNumber: true })}
              />
            </div>
          </div>

          <div>
            <Label>Adult Day Pass Range</Label>
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

          <div>
            <Label>Night Skiing</Label>
            <Select onValueChange={(value) => setValue('night_skiing', Number(value))}>
              <SelectTrigger>
                <SelectValue placeholder="Select option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Available</SelectItem>
                <SelectItem value="0">Not Available</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex justify-end">
          <Button type="submit">Apply Filters</Button>
        </div>
      </form>
    </Card>
  );
}

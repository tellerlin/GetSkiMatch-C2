import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Card } from 'components/ui/card';
import { Input } from 'components/ui/input';
import { Label } from 'components/ui/label';
import { Button } from 'components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'components/ui/select';
import { ResortFilters } from 'lib/types/filters';
import { Country } from 'lib/types/filters';
import { Badge } from 'components/ui/badge';
import { X, Search, Mountain, CableCar, Moon, DollarSign } from 'lucide-react';

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
        {/* 搜索框 */}
        <div>
          <Label>Resort Name</Label>
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search by name"
              className="pl-9"
              {...register('name')}
            />
          </div>
        </div>

        {/* 国家选择 */}
        <div>
          <Label>Countries</Label>
          <Select onValueChange={handleCountrySelect}>
            <SelectTrigger>
              <SelectValue placeholder="Select countries" />
            </SelectTrigger>
            <SelectContent>
              {countries.map((country) => (
                <SelectItem key={country.country_code} value={country.country_code}>
                  <div className="flex justify-between items-center w-full">
                    <span>{country.name}</span>
                    <span className="text-sm text-gray-500">
                      {country.total_resorts} resorts
                    </span>
                  </div>
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

        {/* 滑雪道数量范围 */}
        <div>
          <Label className="flex items-center gap-2">
            <Mountain className="h-4 w-4" />
            Total Slopes Range
          </Label>
          <div className="grid grid-cols-2 gap-2">
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

        {/* 缆车数量范围 */}
        <div>
          <Label className="flex items-center gap-2">
            <CableCar className="h-4 w-4" />
            Ski Lifts Range
          </Label>
          <div className="grid grid-cols-2 gap-2">
            <Input
              type="number"
              placeholder="Min lifts"
              {...register('ski_lifts_min', { valueAsNumber: true })}
            />
            <Input
              type="number"
              placeholder="Max lifts"
              {...register('ski_lifts_max', { valueAsNumber: true })}
            />
          </div>
        </div>

        {/* 价格范围 */}
        <div>
          <Label className="flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            Day Pass Price Range
          </Label>
          <div className="grid grid-cols-2 gap-2">
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

        {/* 夜间滑雪 */}
        <div>
          <Label className="flex items-center gap-2">
            <Moon className="h-4 w-4" />
            Night Skiing
          </Label>
          <Select onValueChange={(value: '0' | '1') => setValue('night_skiing', Number(value) as 0 | 1)}>
            <SelectTrigger>
              <SelectValue placeholder="Select option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Available</SelectItem>
              <SelectItem value="0">Not Available</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button type="submit" className="w-full">Apply Filters</Button>
      </form>
    </Card>
  );
}
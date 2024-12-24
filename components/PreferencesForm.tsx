'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search } from 'lucide-react';

const initialFilters = {
  name: '',
  country_code: '',
  total_slopes_min: 0,
  total_slopes_max: 200,
  adult_day_pass_min: 0,
  adult_day_pass_max: 500,
  night_skiing: 'any' as 'any' | '1' | '0',
};

export default function PreferencesForm() {
  const router = useRouter();
  const [filters, setFilters] = useState(initialFilters);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const queryParams = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== initialFilters[key as keyof typeof initialFilters]) {
        // 排除默认值，只有当值与初始值不同时才添加到查询参数中
        if (
          (typeof value === 'number' && !isNaN(value)) ||
          (typeof value === 'string' && value !== '')
        ) {
          queryParams.append(key, value.toString());
        }
      }
    });

    router.push(`/resorts?${queryParams.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 搜索框 */}
        <div className="md:col-span-2">
          <Label htmlFor="resort-name">Resort Name</Label>
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              id="resort-name"
              placeholder="Search resorts..."
              className="pl-9"
              value={filters.name}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          </div>
        </div>

        {/* 国家选择 */}
        <div>
          <Label htmlFor="country-select">Country</Label>
          <Select
            value={filters.country_code}
            onValueChange={(value) =>
              setFilters((prev) => ({ ...prev, country_code: value }))
            }
          >
            <SelectTrigger id="country-select">
              <SelectValue placeholder="Select country" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any</SelectItem>
              <SelectItem value="US">United States</SelectItem>
              <SelectItem value="CA">Canada</SelectItem>
              <SelectItem value="FR">France</SelectItem>
              <SelectItem value="CH">Switzerland</SelectItem>
              <SelectItem value="IT">Italy</SelectItem>
              <SelectItem value="AT">Austria</SelectItem>
              <SelectItem value="JP">Japan</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* 夜间滑雪选项 */}
        <div>
          <Label htmlFor="night-skiing-select">Night Skiing</Label>
          <Select
            value={filters.night_skiing}
            onValueChange={(value) =>
              setFilters((prev) => ({
                ...prev,
                night_skiing: value as 'any' | '1' | '0',
              }))
            }
          >
            <SelectTrigger id="night-skiing-select">
              <SelectValue placeholder="Any" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any</SelectItem>
              <SelectItem value="1">Available</SelectItem>
              <SelectItem value="0">Not Available</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* 雪道数量范围滑块 */}
        <div className="md:col-span-2">
          <Label className="mb-2">
            Number of Slopes ({filters.total_slopes_min} -{' '}
            {filters.total_slopes_max})
          </Label>
          <Slider
            min={0}
            max={200}
            step={5}
            value={[filters.total_slopes_min, filters.total_slopes_max]}
            onValueChange={([min, max]) =>
              setFilters((prev) => ({
                ...prev,
                total_slopes_min: min,
                total_slopes_max: max,
              }))
            }
            className="mt-2"
          />
          <div className="flex justify-between text-sm text-gray-500">
            <span>{filters.total_slopes_min}</span>
            <span>{filters.total_slopes_max}</span>
          </div>
        </div>

        {/* 价格范围滑块 */}
        <div className="md:col-span-2">
          <Label className="mb-2">
            Price Range (${filters.adult_day_pass_min} - $
            {filters.adult_day_pass_max})
          </Label>
          <Slider
            min={0}
            max={500}
            step={10}
            value={[filters.adult_day_pass_min, filters.adult_day_pass_max]}
            onValueChange={([min, max]) =>
              setFilters((prev) => ({
                ...prev,
                adult_day_pass_min: min,
                adult_day_pass_max: max,
              }))
            }
            className="mt-2"
          />
          <div className="flex justify-between text-sm text-gray-500">
            <span>${filters.adult_day_pass_min}</span>
            <span>${filters.adult_day_pass_max}</span>
          </div>
        </div>
      </div>

      <Button type="submit" className="w-full text-white">
        Find Resorts
      </Button>
    </form>
  );
}

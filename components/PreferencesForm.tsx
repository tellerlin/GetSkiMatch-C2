'use client';

import { useState, useEffect, useMemo } from 'react';
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
import { debounce } from 'lodash';

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
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 优化：使用 useMemo 缓存国家选项列表
  const countryOptions = useMemo(
    () => [
      { value: 'any', label: 'Any' },
      { value: 'US', label: 'United States' },
      { value: 'CA', label: 'Canada' },
      { value: 'FR', label: 'France' },
      { value: 'CH', label: 'Switzerland' },
      { value: 'JP', label: 'Japan' },
    ],
    []
  );

  // 表单验证函数
  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (filters.total_slopes_min > filters.total_slopes_max) {
      newErrors.total_slopes = 'Minimum slopes cannot be greater than maximum slopes.';
    }

    if (filters.adult_day_pass_min > filters.adult_day_pass_max) {
      newErrors.adult_day_pass = 'Minimum price cannot be greater than maximum price.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 优化：使用 debounce 处理验证
  const debouncedValidate = useMemo(
    () => debounce(() => validate(), 300),
    [filters]
  );

  useEffect(() => {
    debouncedValidate();
    return () => debouncedValidate.cancel();
  }, [filters, debouncedValidate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!validate()) return;

      const queryParams = new URLSearchParams();

      Object.entries(filters).forEach(([key, value]) => {
        if (value !== initialFilters[key as keyof typeof initialFilters]) {
          if (
            (typeof value === 'number' && !isNaN(value)) ||
            (typeof value === 'string' && value !== '')
          ) {
            queryParams.append(key, value.toString());
          }
        }
      });

      router.push(`/resorts?${queryParams.toString()}`);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6" aria-label="Preferences Form">
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
              aria-label="Search Resorts"
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
            <SelectTrigger id="country-select" aria-label="Select Country">
              <SelectValue placeholder="Any" />
            </SelectTrigger>
            <SelectContent>
              {countryOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
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
            <SelectTrigger id="night-skiing-select" aria-label="Night Skiing">
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
            aria-label="Total Slopes Range"
          />
          <div className="flex justify-between text-sm text-gray-500 mt-1">
            <span>{filters.total_slopes_min}</span>
            <span>{filters.total_slopes_max}</span>
          </div>
          {errors.total_slopes && (
            <p className="text-red-500 text-sm mt-1">{errors.total_slopes}</p>
          )}
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
            aria-label="Price Range"
          />
          <div className="flex justify-between text-sm text-gray-500 mt-1">
            <span>${filters.adult_day_pass_min}</span>
            <span>${filters.adult_day_pass_max}</span>
          </div>
          {errors.adult_day_pass && (
            <p className="text-red-500 text-sm mt-1">{errors.adult_day_pass}</p>
          )}
        </div>
      </div>

      <Button 
        type="submit" 
        className="w-full text-white" 
        disabled={Object.keys(errors).length > 0 || isSubmitting}
      >
        {isSubmitting ? 'Searching...' : 'Find Resorts'}
      </Button>
    </form>
  );
}
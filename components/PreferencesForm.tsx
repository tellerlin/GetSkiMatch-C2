'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Card } from '@/components/ui/card';
import { Snowflake, Sun, Globe2 } from 'lucide-react';
import type { UserPreferences, TerrainPreference, SkillLevel } from '@/lib/types';
import countries from '@/data/countries.json';

const terrainOptions: { value: TerrainPreference; label: string }[] = [
  { value: 'groomed', label: 'Groomed Runs' },
  { value: 'powder', label: 'Powder Snow' },
  { value: 'park', label: 'Terrain Park' },
  { value: 'backcountry', label: 'Backcountry' },
];

export default function PreferencesForm() {
  const router = useRouter();
  const allTerrains = terrainOptions.map(option => option.value);
  
  const { register, handleSubmit, setValue, watch } = useForm<UserPreferences>({
    defaultValues: {
      skillLevel: 'beginner',
      budgetRange: { min: 0, max: 500 },
      country: '',
      terrainPreferences: allTerrains,
    },
  });
  
  const [selectedTerrain, setSelectedTerrain] = useState<TerrainPreference[]>(allTerrains);
  const [selectedCountry, setSelectedCountry] = useState<string>('');

  const onSubmit = (data: UserPreferences) => {
    const queryParams = new URLSearchParams({
      preferences: JSON.stringify(data)
    });
    router.push(`/recommendations?${queryParams.toString()}`);
  };

  const handleTerrainChange = (terrain: TerrainPreference) => {
    setSelectedTerrain(prev => {
      const newSelection = prev.includes(terrain)
        ? prev.filter(t => t !== terrain)
        : [...prev, terrain];
      setValue('terrainPreferences', newSelection);
      return newSelection;
    });
  };

  const handleCountryChange = (country: string) => {
    setSelectedCountry(country);
    setValue('country', country);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="space-y-4">
        <Label>Skill Level</Label>
        <Select
          onValueChange={(value: SkillLevel) => setValue('skillLevel', value)}
          defaultValue="beginner"
        >
          <SelectTrigger>
            <SelectValue placeholder="Select your skill level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="beginner">Beginner</SelectItem>
            <SelectItem value="intermediate">Intermediate</SelectItem>
            <SelectItem value="advanced">Advanced</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        <Label>Country</Label>
        <Select
          onValueChange={handleCountryChange}
          value={selectedCountry}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a country" />
          </SelectTrigger>
          <SelectContent>
            {countries.countries.map((country) => (
              <SelectItem key={country.name} value={country.name}>
                <div className="flex items-center justify-between w-full">
                  <span>{country.name}</span>
                  <span className="ml-8 text-sm text-gray-500">
                    {country.resortCount} resorts
                  </span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {selectedCountry && (
          <div className="mt-2 p-3 bg-blue-50 rounded-md">
            <div className="flex items-center gap-2">
              <Globe2 className="h-5 w-5 text-blue-600" />
              <div className="text-sm">
                Selected: <span className="font-medium">{selectedCountry}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="space-y-4">
        <Label>Terrain Preferences (Select all that apply)</Label>
        <div className="grid grid-cols-2 gap-4">
          {terrainOptions.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <Checkbox
                id={option.value}
                checked={selectedTerrain.includes(option.value)}
                onCheckedChange={() => handleTerrainChange(option.value)}
              />
              <Label htmlFor={option.value}>{option.label}</Label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <Label>Day Pass Budget Range (USD)</Label>
        <div className="pt-6">
          <Slider
            defaultValue={[0, 500]}
            min={0}
            max={500}
            step={10}
            onValueChange={([min, max]) => {
              setValue('budgetRange', { min, max });
            }}
          />
          <div className="mt-2 flex justify-between text-sm text-gray-500">
            <span>$0</span>
            <span>$500</span>
          </div>
        </div>
      </div>

      <Button type="submit" className="w-full">
        Find Resorts
      </Button>
    </form>
  );
}
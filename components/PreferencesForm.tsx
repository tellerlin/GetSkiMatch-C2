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
import type { UserPreferences, TerrainPreference, SkillLevel } from '@/lib/types';

const terrainOptions: { value: TerrainPreference; label: string }[] = [
  { value: 'groomed', label: 'Groomed Runs' },
  { value: 'powder', label: 'Powder Snow' },
  { value: 'park', label: 'Terrain Park' },
  { value: 'backcountry', label: 'Backcountry' },
];

export default function PreferencesForm() {
  const router = useRouter();
  const { register, handleSubmit, setValue, watch } = useForm<UserPreferences>();
  const [selectedTerrain, setSelectedTerrain] = useState<TerrainPreference[]>([]);

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

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="space-y-4">
        <Label>Skill Level</Label>
        <Select
          onValueChange={(value: SkillLevel) => setValue('skillLevel', value)}
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
        <Label>Budget Range (USD)</Label>
        <div className="pt-6">
          <Slider
            defaultValue={[50, 200]}
            min={0}
            max={500}
            step={10}
            onValueChange={([min, max]) => {
              setValue('budgetRange', { min, max });
            }}
            thumbClassName="h-4 w-4 bg-black border-2 border-white rounded-full"
          />
          <div className="mt-2 flex justify-between text-sm text-gray-500">
            <span>$0</span>
            <span>$500</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <Label>Maximum Travel Distance (km)</Label>
        <Slider
          defaultValue={[100]}
          min={0}
          max={1000}
          step={50}
          onValueChange={([value]) => {
            setValue('travelDistance', value);
          }}
          thumbClassName="h-4 w-4 bg-black border-2 border-white rounded-full"
        />
        <div className="mt-2 flex justify-between text-sm text-gray-500">
          <span>0 km</span>
          <span>1000 km</span>
        </div>
      </div>

      <Button type="submit" className="w-full">
        Find Resorts
      </Button>
    </form>
  );
}
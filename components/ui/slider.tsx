'use client';

import * as React from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';

import { cn } from '@/lib/utils';

type SliderProps = React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> & {
  thumbClassName?: string;
};

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  SliderProps
>(({ className, thumbClassName, defaultValue, ...props }, ref) => {
  // 确定需要渲染的 Thumb 数量
  const numThumbs = Array.isArray(defaultValue) ? defaultValue.length : 2;

  return (
    <SliderPrimitive.Root
      ref={ref}
      className={cn(
        'relative flex w-full touch-none select-none items-center',
        className
      )}
      defaultValue={defaultValue}
      {...props}
    >
<SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-gray-200">
  <SliderPrimitive.Range className="absolute h-full bg-blue-500" />
        {/* Custom end styles */}
        <div className="absolute -left-2 -top-2 h-6 w-6 rounded-full bg-accent shadow-md" />
        <div className="absolute -right-2 -top-2 h-6 w-6 rounded-full bg-accent shadow-md" />
      </SliderPrimitive.Track>
      {/* 动态渲染 Thumb */}
      {Array.from({ length: numThumbs }).map((_, index) => (
<SliderPrimitive.Thumb
  key={index}
  className={cn(
    'block h-5 w-5 rounded-full border-2 border-blue-500 bg-white ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
    thumbClassName
  )}
/>
      ))}
      {/* Custom thumb styles */}
      {Array.from({ length: numThumbs }).map((_, index) => (
        <div key={index} className="absolute -top-2 h-5 w-5 rounded-full bg-accent shadow-md" />
      ))}
    </SliderPrimitive.Root>
  );
});
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };

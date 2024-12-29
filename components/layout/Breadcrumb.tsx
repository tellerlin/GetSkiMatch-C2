'use client';

import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { usePathname, useSearchParams } from 'next/navigation';

const routeLabels: Record<string, string> = {
  'recommendations': 'Recommendations',
  'resorts': 'Resorts',
  'ski-resort': 'Resort Details'
};

export default function Breadcrumb() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const segments = pathname.split('/').filter(Boolean);
  
  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
      <Link href="/" className="hover:text-blue-600 flex items-center">
        <Home className="h-4 w-4" />
      </Link>
      {segments.map((segment, index) => {
        let path = `/${segments.slice(0, index + 1).join('/')}`;
        if (segment === 'ski-resort' && searchParams) {
          const countryCode = searchParams.get('country_code');
          path = `/resorts${countryCode ? `?country_code=${countryCode}` : ''}`;
        }
        const isLast = index === segments.length - 1;
        const label = routeLabels[segment] || segment;
        
        return (
          <span key={path} className="flex items-center">
            <ChevronRight className="h-4 w-4 mx-1" />
            {isLast ? (
              <span className="text-gray-900 font-medium">{label}</span>
            ) : (
              <Link href={path} className="hover:text-blue-600">
                {label}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}

import { Snowflake, MapPin, Filter } from 'lucide-react';
import PreferencesForm from '@/components/PreferencesForm';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section with Reduced Height */}
      <div className="relative h-[50vh] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1551524559-8af4e6624178"
          alt="Ski Resort"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/70">
          <div className="container mx-auto px-4 h-full flex flex-col justify-center items-center text-white">
            <div className="flex justify-center mb-6">
              <Snowflake className="h-16 w-16 text-white/90" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-center mb-4">
              Find Your Perfect Ski Resort
            </h1>
            <p className="text-lg md:text-xl text-center max-w-2xl mx-auto text-white/90">
              Discover the best ski destinations tailored to your preferences
            </p>
          </div>
        </div>
      </div>

      {/* Search Section - Moved Up */}
      <section className="py-12 bg-gradient-to-b from-gray-900 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-xl p-6 md:p-8 -mt-20 relative z-10">
              <PreferencesForm />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose Our Platform
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<MapPin className="h-8 w-8" />}
              title="Global Coverage"
              description="Access detailed information about ski resorts worldwide"
            />
            <FeatureCard
              icon={<Filter className="h-8 w-8" />}
              title="Smart Filters"
              description="Find resorts that match your exact preferences"
            />
            <FeatureCard
              icon={<Snowflake className="h-8 w-8" />}
              title="Real-time Conditions"
              description="Get up-to-date weather and snow reports"
            />
          </div>
        </div>
      </section>
    </main>
  );
}

function FeatureCard({ icon, title, description }: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 text-blue-600 mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
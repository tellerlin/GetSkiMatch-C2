import { Snowflake } from 'lucide-react';
import PreferencesForm from '@/components/PreferencesForm';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Snowflake className="h-12 w-12 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Find Your Perfect Ski Resort
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Tell us your preferences and we'll match you with the best ski resorts for your style and skill level.
          </p>
        </div>
        
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6 md:p-8">
          <PreferencesForm />
        </div>
      </div>
    </main>
  );
}
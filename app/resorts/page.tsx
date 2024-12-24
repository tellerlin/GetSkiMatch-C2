import ResortList from '@/components/resort/ResortList';
import PreferencesForm from '@/components/PreferencesForm';


export default function ResortsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Ski Resorts Explorer
        </h1>
        <p className="text-gray-600 mt-2">
          Find and filter ski resorts based on your preferences
        </p>
      </div>


      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1">
          <PreferencesForm />
        </div>
        <div className="md:col-span-3">
          <ResortList />
        </div>
      </div>
    </div>
  );
}


// 元数据
export const metadata = {
  title: 'Ski Resorts Explorer',
  description: 'Find and filter ski resorts worldwide',
  keywords: ['ski resorts', 'winter sports', 'skiing', 'snowboarding']
};
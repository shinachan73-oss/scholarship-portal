import { getEducationLevelLabel } from '@/lib/utils'
import ScholarshipList from '@/components/ScholarshipList'
import SearchBar from '@/components/SearchBar'
import FilterBar from '@/components/FilterBar'

interface HomePageProps {
  searchParams: { search?: string; level?: string }
}

export const metadata = {
  title: 'Scholarship Portal - Find Scholarships for Every Student',
  description: 'Discover scholarships for students from Class 1 to PhD. Easy navigation, deadlines, and eligibility criteria.',
}

export default function HomePage({ searchParams }: HomePageProps) {
  const activeLevel = searchParams.level
  const search = searchParams.search

  return (
    <div className="pb-12">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 rounded-3xl p-8 md:p-12 mb-8 text-white relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-coral/20 rounded-full translate-y-1/2 -translate-x-1/2" />

        <div className="relative">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Find Your Perfect{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-coral-light to-coral">
              Scholarship
            </span>
          </h1>
          <p className="text-blue-100 text-lg md:text-xl mb-6 max-w-2xl">
            Discover scholarships for students from Class 1 to PhD. Easy navigation, deadlines, and eligibility criteria all in one place.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap gap-6 text-sm">
            <div className="bg-white/10 backdrop-blur rounded-xl px-4 py-2">
              <span className="font-bold text-2xl">20+</span> Scholarships
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl px-4 py-2">
              <span className="font-bold text-2xl">6</span> Education Levels
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl px-4 py-2">
              <span className="font-bold text-2xl">100%</span> Free
            </div>
          </div>
        </div>
      </div>

      {/* Search & Filter Section */}
      <div className="bg-white rounded-2xl shadow-card-float p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <SearchBar initialValue={search || ''} />
          </div>
        </div>
        <div className="mt-4">
          <FilterBar activeLevel={activeLevel} />
        </div>
      </div>

      {search && (
        <div className="mb-4 text-gray-600">
          Showing results for: <span className="font-medium">&quot;{search}&quot;</span>
        </div>
      )}

      {activeLevel && (
        <div className="mb-4 text-gray-600">
          Filtered by: <span className="font-medium">{getEducationLevelLabel(activeLevel)}</span>
        </div>
      )}

      <ScholarshipList />
    </div>
  )
}

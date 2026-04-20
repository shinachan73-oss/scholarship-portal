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
      <div className="bg-gradient-to-br from-blue-600 via-indigo-700 to-blue-800 rounded-[2.5rem] p-8 md:p-16 mb-12 text-white relative overflow-hidden shadow-2xl shadow-blue-900/20">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-coral/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl" />
        <div className="absolute top-1/4 left-1/3 w-4 h-4 bg-yellow-300 rounded-full animate-ping opacity-50" />

        <div className="relative z-10">
          <div className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-sm font-black mb-6 border border-white/10 tracking-widest uppercase">
            🚀 Empowerment Through Education
          </div>
          <h1 className="text-5xl md:text-7xl font-[900] mb-6 leading-[1.1] tracking-tighter">
            Find Your Perfect{' '}
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-coral-light via-white to-coral drop-shadow-sm">
              Scholarship
            </span>
          </h1>
          <p className="text-blue-50 text-xl md:text-2xl mb-10 max-w-2xl leading-relaxed font-medium opacity-90">
            Empowering Indian students from Class 1 to PhD. Access thousands of opportunities with zero hassle.
          </p>

          <div className="flex flex-wrap items-center gap-4 mb-12">
            <a href="#scholarships" className="px-8 py-4 bg-coral hover:bg-coral-light text-white rounded-2xl font-black text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-coral/40 active:scale-95">
              Browse Scholarships →
            </a>
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-blue-600 bg-blue-100 flex items-center justify-center text-xs font-bold text-blue-600">
                  {String.fromCharCode(64 + i)}
                </div>
              ))}
              <div className="pl-6 text-sm font-bold text-blue-100">Joined by 10k+ students</div>
            </div>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-8">
            <div className="flex flex-col">
              <span className="font-black text-3xl">20+</span>
              <span className="text-blue-200 text-xs font-bold uppercase tracking-wider">Active Programs</span>
            </div>
            <div className="h-10 w-px bg-white/20 hidden sm:block" />
            <div className="flex flex-col">
              <span className="font-black text-3xl">6+</span>
              <span className="text-blue-200 text-xs font-bold uppercase tracking-wider">Education Levels</span>
            </div>
            <div className="h-10 w-px bg-white/20 hidden sm:block" />
            <div className="flex flex-col">
              <span className="font-black text-3xl">100%</span>
              <span className="text-blue-200 text-xs font-bold uppercase tracking-wider">Verified Sources</span>
            </div>
          </div>
        </div>
      </div>

      {/* Search & Filter Section */}
      <div id="scholarships" className="bg-white rounded-3xl shadow-2xl shadow-gray-200/50 p-8 mb-10 border border-gray-100">
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

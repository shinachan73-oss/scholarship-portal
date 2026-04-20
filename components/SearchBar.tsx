'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface SearchBarProps {
  initialValue?: string
}

export default function SearchBar({ initialValue = '' }: SearchBarProps) {
  const [search, setSearch] = useState(initialValue)
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (search) {
      params.set('search', search)
    }
    router.push(`/?${params.toString()}`)
  }

  return (
    <form onSubmit={handleSearch} className="w-full group">
      <div className="relative">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search scholarships by name, provider, or keyword..."
          className="w-full px-6 py-5 pl-16 bg-gray-50 border-2 border-transparent rounded-[1.25rem] focus:outline-none focus:bg-white focus:border-blue-600 focus:ring-8 focus:ring-blue-600/5 transition-all text-gray-800 font-bold placeholder:text-gray-400 placeholder:font-medium"
        />
        <div className="absolute left-5 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center text-gray-400 group-focus-within:text-blue-600 transition-colors">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <button
          type="submit"
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl font-black text-sm transition-all active:scale-95 shadow-lg shadow-blue-600/20"
        >
          Search
        </button>
      </div>
    </form>
  )
}

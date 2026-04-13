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
    <form onSubmit={handleSearch} className="w-full">
      <div className="relative">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search scholarships by name, provider, or keyword..."
          className="w-full px-5 py-4 pl-14 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-coral focus:ring-4 focus:ring-coral/10 transition-all text-gray-700"
        />
        <div className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
          <svg
            className="w-5 h-5 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>
    </form>
  )
}

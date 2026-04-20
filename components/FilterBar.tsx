'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { getEducationLevels, getEducationLevelLabel } from '@/lib/utils'

interface FilterBarProps {
  activeLevel?: string
}

const educationLevels = getEducationLevels()

export default function FilterBar({ activeLevel }: FilterBarProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleFilter = (level: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (level) {
      params.set('level', level)
    } else {
      params.delete('level')
    }
    router.push(`/?${params.toString()}`)
  }

  return (
    <div className="flex flex-wrap gap-3">
      <button
        onClick={() => handleFilter('')}
        className={`px-6 py-3 rounded-2xl text-sm font-black transition-all duration-300 active:scale-95 ${
          !activeLevel
            ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/30 ring-4 ring-blue-600/10'
            : 'bg-gray-50 text-gray-500 hover:bg-gray-100 border border-gray-100'
        }`}
      >
        All Levels
      </button>
      {educationLevels.map((level) => (
        <button
          key={level}
          onClick={() => handleFilter(level)}
          className={`px-6 py-3 rounded-2xl text-sm font-black transition-all duration-300 active:scale-95 ${
            activeLevel === level
              ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/30 ring-4 ring-blue-600/10'
              : 'bg-gray-50 text-gray-500 hover:bg-gray-100 border border-gray-100'
          }`}
        >
          {getEducationLevelLabel(level)}
        </button>
      ))}
    </div>
  )
}

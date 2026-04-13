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
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => handleFilter('')}
        className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 hover:scale-105 ${
          !activeLevel
            ? 'bg-blue-600 text-white shadow-md'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }`}
      >
        All Levels
      </button>
      {educationLevels.map((level) => (
        <button
          key={level}
          onClick={() => handleFilter(level)}
          className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 hover:scale-105 ${
            activeLevel === level
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          {getEducationLevelLabel(level)}
        </button>
      ))}
    </div>
  )
}

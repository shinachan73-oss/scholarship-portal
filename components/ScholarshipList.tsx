'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import ScholarshipCard from './ScholarshipCard'

interface Scholarship {
  id: number
  name: string
  provider: string
  description: string
  eligibility: string
  amount: string
  deadline: string
  website: string
  education_level: string
  created_at: string
}

export default function ScholarshipList() {
  const searchParams = useSearchParams()
  const [scholarships, setScholarships] = useState<Scholarship[]>([])
  const [loading, setLoading] = useState(true)

  const search = searchParams.get('search') || ''
  const level = searchParams.get('level') || ''

  useEffect(() => {
    async function fetchScholarships() {
      setLoading(true)
      const params = new URLSearchParams()
      if (search) params.set('search', search)
      if (level) params.set('level', level)

      const res = await fetch(`/api/scholarships?${params.toString()}`)
      const data = await res.json()
      setScholarships(data)
      setLoading(false)
    }

    fetchScholarships()
  }, [search, level])

  if (loading) {
    return <div className="text-center py-12 text-gray-500">Loading...</div>
  }

  if (scholarships.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p className="text-lg">No scholarships found matching your criteria.</p>
        <p className="text-sm mt-2">Try adjusting your search or filters.</p>
      </div>
    )
  }

  return (
    <>
      <div className="mb-4 text-gray-600 text-sm">
        Found {scholarships.length} scholarship{scholarships.length !== 1 ? 's' : ''}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {scholarships.map((scholarship) => (
          <ScholarshipCard key={scholarship.id} scholarship={scholarship} />
        ))}
      </div>
    </>
  )
}

'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import ScholarshipCard from '@/components/ScholarshipCard'

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

const educationLevelLabels: Record<string, string> = {
  '1-5': 'Class 1-5',
  '6-8': 'Class 6-8',
  '9-12': 'Class 9-12',
  'undergraduate': 'Undergraduate',
  'post-graduation': 'Post-Graduation',
  'phd': 'PhD',
}

function formatDeadline(deadline: string): string {
  return new Date(deadline).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

function isDeadlinePassed(deadline: string): boolean {
  return new Date(deadline) < new Date()
}

export default function ScholarshipDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [data, setData] = useState<{ scholarship: Scholarship; related: Scholarship[] } | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  const id = parseInt(params.id as string)

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`/api/scholarships/${id}`)
        if (!res.ok) {
          setNotFound(true)
          setLoading(false)
          return
        }
        const result = await res.json()
        setData(result)
      } catch {
        setNotFound(true)
      }
      setLoading(false)
    }

    if (id) {
      fetchData()
    }
  }, [id])

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        <p className="mt-4 text-gray-500">Loading scholarship...</p>
      </div>
    )
  }

  if (notFound || !data) {
    return (
      <div className="text-center py-12">
        <div className="text-8xl mb-4">🔍</div>
        <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-6">Scholarship Not Found</p>
        <p className="text-gray-500 mb-6">The scholarship you are looking for does not exist or has been removed.</p>
        <Link href="/" className="inline-flex items-center gap-2 text-coral hover:text-coral-light font-semibold">
          ← Back to Scholarships
        </Link>
      </div>
    )
  }

  const { scholarship, related } = data
  const isExpired = isDeadlinePassed(scholarship.deadline)

  return (
    <div>
      <Link href="/" className="inline-flex items-center gap-2 text-coral hover:text-coral-light mb-6 font-medium">
        ← Back to Scholarships
      </Link>

      <div className="bg-white rounded-2xl shadow-card-float overflow-hidden mb-8">
        {/* Gradient top border */}
        <div className="h-2 bg-gradient-to-r from-blue-600 to-coral" />

        <div className="p-6 md:p-8">
          <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-extrabold text-gray-800 mb-2">{scholarship.name}</h1>
              <p className="text-lg text-gray-500 flex items-center gap-2">
                <span>👔</span> {scholarship.provider}
              </p>
            </div>
            <span className={`px-4 py-2 rounded-full text-sm font-bold badge-active ${
              isExpired ? 'bg-red-100 text-red-600' : 'bg-emerald-100 text-emerald-600'
            }`}>
              {isExpired ? 'Deadline Passed' : 'Active'}
            </span>
          </div>

          <div className="flex flex-wrap gap-3 mb-6">
            <span className="bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-sm font-semibold">
              {educationLevelLabels[scholarship.education_level] || scholarship.education_level}
            </span>
            <span className="bg-coral/10 text-coral px-4 py-1.5 rounded-full text-sm font-semibold">
              {scholarship.amount}
            </span>
          </div>

          <p className="text-gray-700 text-lg mb-8 leading-relaxed">{scholarship.description}</p>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-2xl p-5 border border-blue-200">
              <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                <span>✅</span> Eligibility Criteria
              </h3>
              <p className="text-gray-600 leading-relaxed">{scholarship.eligibility}</p>
            </div>

            <div className="bg-gradient-to-br from-coral/5 to-coral/10 rounded-2xl p-5 border border-coral/20">
              <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                <span>📅</span> Application Deadline
              </h3>
              <p className="text-gray-600 text-lg font-semibold">{formatDeadline(scholarship.deadline)}</p>
              {!isExpired && (
                <p className="text-sm text-coral font-bold mt-2">
                  ✨ {Math.ceil((new Date(scholarship.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days remaining!
                </p>
              )}
            </div>
          </div>

          <a
            href={scholarship.website}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-coral hover:bg-coral-light text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-200 hover:scale-105 shadow-lg shadow-coral/30"
          >
            Visit Official Website
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>

      {related.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <span>📋</span> Related Scholarships
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {related.map((s) => (
              <ScholarshipCard key={s.id} scholarship={s} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

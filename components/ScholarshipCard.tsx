'use client'

import Link from 'next/link'
import { isDeadlinePassed, formatDeadline, getEducationLevelLabel } from '@/lib/utils'

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

interface ScholarshipCardProps {
  scholarship: Scholarship
}

const levelColors: Record<string, string> = {
  '1-5': 'bg-emerald-100 text-emerald-700',
  '6-8': 'bg-blue-100 text-blue-700',
  '9-12': 'bg-purple-100 text-purple-700',
  'undergraduate': 'bg-pink-100 text-pink-700',
  'post-graduation': 'bg-orange-100 text-orange-700',
  'phd': 'bg-teal-100 text-teal-700',
}

export default function ScholarshipCard({ scholarship }: ScholarshipCardProps) {
  const isExpired = isDeadlinePassed(scholarship.deadline)
  const levelColor = levelColors[scholarship.education_level] || 'bg-gray-100 text-gray-700'

  return (
    <Link href={`/scholarship/${scholarship.id}`}>
      <div className="card-float bg-white rounded-2xl p-5 cursor-pointer border border-gray-100 h-full">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-bold text-lg text-gray-800 line-clamp-1">{scholarship.name}</h3>
          <span className={`text-xs px-3 py-1 rounded-full font-semibold badge-active ${
            isExpired ? 'bg-red-100 text-red-600' : 'bg-emerald-100 text-emerald-600'
          }`}>
            {isExpired ? 'Expired' : 'Active'}
          </span>
        </div>
        <p className="text-sm text-gray-500 mb-3 flex items-center gap-1">
          <span>👔</span> {scholarship.provider}
        </p>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{scholarship.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          <span className={`text-xs px-3 py-1.5 rounded-full font-medium ${levelColor}`}>
            {getEducationLevelLabel(scholarship.education_level)}
          </span>
          <span className="text-xs bg-coral/10 text-coral px-3 py-1.5 rounded-full font-medium">
            {scholarship.amount}
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span>📅</span>
          <span className="font-medium">Deadline:</span> {formatDeadline(scholarship.deadline)}
        </div>
      </div>
    </Link>
  )
}

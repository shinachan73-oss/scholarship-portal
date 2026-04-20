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
    <Link href={`/scholarship/${scholarship.id}`} className="group block h-full">
      <div className="card-float bg-white rounded-2xl p-6 cursor-pointer border border-gray-100 h-full flex flex-col transition-all duration-300 group-hover:border-blue-200">
        <div className="flex justify-between items-start mb-4 gap-2">
          <h3 className="font-extrabold text-lg text-gray-800 line-clamp-2 group-hover:text-blue-600 transition-colors leading-snug">
            {scholarship.name}
          </h3>
          <span className={`shrink-0 text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-lg font-black ${
            isExpired ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-emerald-50 text-emerald-600 border border-emerald-100'
          }`}>
            {isExpired ? 'Expired' : 'Active'}
          </span>
        </div>

        <p className="text-sm text-gray-500 mb-4 flex items-center gap-1.5 font-medium">
          <span className="opacity-70 text-base">👔</span>
          <span className="line-clamp-1">{scholarship.provider}</span>
        </p>

        <p className="text-sm text-gray-600 mb-6 line-clamp-3 leading-relaxed flex-grow italic opacity-80">
          &ldquo;{scholarship.description}&rdquo;
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          <span className={`text-[11px] px-3 py-1.5 rounded-xl font-bold uppercase tracking-tight shadow-sm ${levelColor}`}>
            {getEducationLevelLabel(scholarship.education_level)}
          </span>
          <span className="text-[11px] bg-coral/10 text-coral border border-coral/10 px-3 py-1.5 rounded-xl font-bold uppercase tracking-tight shadow-sm">
            {scholarship.amount}
          </span>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-50 mt-auto">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span className="text-base">📅</span>
            <span className="font-bold text-gray-400">DEADLINE:</span>
            <span className="font-black text-gray-700">{formatDeadline(scholarship.deadline)}</span>
          </div>
          <span className="text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity translate-x-2 group-hover:translate-x-0 transform duration-300">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  )
}

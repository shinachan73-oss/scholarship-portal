'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface PendingScholarship {
  id: number
  name: string
  provider: string
  description: string
  eligibility: string
  amount: string
  deadline: string
  website: string
  education_level: string
  source_url: string | null
  scraped_at: string
  status: string
}

interface ScrapeResult {
  scraped: number
  added: number
  duplicates: number
  errors: string[]
}

const levelLabels: Record<string, string> = {
  '1-5': 'Class 1-5',
  '6-8': 'Class 6-8',
  '9-12': 'Class 9-12',
  'undergraduate': 'Undergraduate',
  'post-graduation': 'Post-Graduation',
  'phd': 'PhD',
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export default function AdminPendingPage() {
  const router = useRouter()
  const [pending, setPending] = useState<PendingScholarship[]>([])
  const [loading, setLoading] = useState(true)
  const [scraping, setScraping] = useState(false)
  const [scrapeResult, setScrapeResult] = useState<ScrapeResult | null>(null)

  useEffect(() => {
    fetchPending()
  }, [])

  async function fetchPending() {
    setLoading(true)
    const res = await fetch('/api/admin/pending')
    if (res.ok) {
      const data = await res.json()
      setPending(data)
    }
    setLoading(false)
  }

  async function handleScrape() {
    setScraping(true)
    setScrapeResult(null)
    const res = await fetch('/api/admin/scrape', { method: 'POST' })
    if (res.ok) {
      const result = await res.json()
      setScrapeResult(result)
      await fetchPending()
    }
    setScraping(false)
  }

  async function handleApprove(id: number) {
    const res = await fetch(`/api/admin/pending/${id}/approve`, { method: 'POST' })
    if (res.ok) {
      await fetchPending()
      router.refresh()
    }
  }

  async function handleReject(id: number) {
    if (!confirm('Are you sure you want to reject this scholarship?')) return
    const res = await fetch(`/api/admin/pending/${id}/reject`, { method: 'POST' })
    if (res.ok) {
      await fetchPending()
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/admin" className="text-gray-600 hover:text-gray-900">← Back to Dashboard</Link>
          <button
            onClick={handleScrape}
            disabled={scraping}
            className="bg-coral hover:bg-coral-light text-white px-4 py-2 rounded-lg font-medium disabled:opacity-50 flex items-center gap-2"
          >
            {scraping ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Scraping...
              </>
            ) : (
              <>
                🔍 Fetch New Scholarships
              </>
            )}
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Pending Approvals</h1>
          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
            {pending.length} pending
          </span>
        </div>

        {scrapeResult && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
            <h3 className="font-semibold text-blue-800 mb-2">Scraping Complete</h3>
            <div className="text-sm text-blue-700 space-y-1">
              <p>📥 Scraped: {scrapeResult.scraped}</p>
              <p>✅ Added to pending: {scrapeResult.added}</p>
              <p>⏭️ Duplicates skipped: {scrapeResult.duplicates}</p>
              {scrapeResult.errors.length > 0 && (
                <p className="text-red-600">❌ Errors: {scrapeResult.errors.join(', ')}</p>
              )}
            </div>
          </div>
        )}

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
            <p className="mt-4 text-gray-500">Loading pending scholarships...</p>
          </div>
        ) : pending.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-12 text-center">
            <div className="text-6xl mb-4">📋</div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">No Pending Scholarships</h2>
            <p className="text-gray-500 mb-6">Click &quot;Fetch New Scholarships&quot; to scrape from government portals</p>
            <button
              onClick={handleScrape}
              disabled={scraping}
              className="bg-coral hover:bg-coral-light text-white px-6 py-3 rounded-xl font-semibold disabled:opacity-50"
            >
              🔍 Fetch Scholarships Now
            </button>
          </div>
        ) : (
          <div className="grid gap-4">
            {pending.map((s) => (
              <div key={s.id} className="bg-white rounded-xl shadow-card-float p-6">
                <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">{s.name}</h3>
                    <p className="text-gray-500 flex items-center gap-1">
                      <span>👔</span> {s.provider}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleApprove(s.id)}
                      className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-1"
                    >
                      ✅ Approve
                    </button>
                    <button
                      onClick={() => handleReject(s.id)}
                      className="bg-red-100 hover:bg-red-200 text-red-600 px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-1"
                    >
                      ❌ Reject
                    </button>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4">{s.description}</p>

                <div className="grid md:grid-cols-3 gap-4 mb-4">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <span className="text-xs text-gray-500 block">Eligibility</span>
                    <span className="text-sm text-gray-700">{s.eligibility}</span>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <span className="text-xs text-gray-500 block">Amount</span>
                    <span className="text-sm text-gray-700 font-medium">{s.amount}</span>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <span className="text-xs text-gray-500 block">Deadline</span>
                    <span className="text-sm text-gray-700">{formatDate(s.deadline)}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 text-sm">
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                    {levelLabels[s.education_level] || s.education_level}
                  </span>
                  {s.source_url && (
                    <a
                      href={s.source_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-coral hover:text-coral-light flex items-center gap-1"
                    >
                      🔗 Source
                    </a>
                  )}
                  <span className="text-gray-400">
                    Scraped: {formatDate(s.scraped_at)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

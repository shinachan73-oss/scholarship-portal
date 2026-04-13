'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

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

export default function EditScholarshipPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [scholarship, setScholarship] = useState<Scholarship | null>(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`/api/admin/scholarships/${params.id}`)
      .then(res => res.json())
      .then(data => {
        setScholarship(data)
        setLoading(false)
      })
  }, [params.id])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!scholarship) return

    const formData = new FormData(e.currentTarget)
    const body = {
      name: formData.get('name'),
      provider: formData.get('provider'),
      description: formData.get('description'),
      eligibility: formData.get('eligibility'),
      amount: formData.get('amount'),
      deadline: formData.get('deadline'),
      website: formData.get('website'),
      education_level: formData.get('education_level'),
    }

    const res = await fetch(`/api/admin/scholarships/${params.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })

    if (res.ok) {
      router.push('/admin/scholarships')
    } else {
      setError('Failed to update scholarship')
    }
  }

  async function handleDelete() {
    if (!confirm('Are you sure you want to delete this scholarship?')) return

    const res = await fetch(`/api/admin/scholarships/${params.id}`, {
      method: 'DELETE',
    })

    if (res.ok) {
      router.push('/admin/scholarships')
    } else {
      setError('Failed to delete scholarship')
    }
  }

  if (loading) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">Loading...</div>
  }

  if (!scholarship) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">Scholarship not found</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-xl font-bold">Edit Scholarship</h1>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 py-8">
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow max-w-2xl">
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">{error}</div>
          )}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-gray-700">Name</label>
            <input type="text" name="name" defaultValue={scholarship.name} required className="w-full px-3 py-2 border border-gray-300 rounded-md" />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-gray-700">Provider</label>
            <input type="text" name="provider" defaultValue={scholarship.provider} required className="w-full px-3 py-2 border border-gray-300 rounded-md" />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-gray-700">Description</label>
            <textarea name="description" defaultValue={scholarship.description} required rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-gray-700">Eligibility</label>
            <input type="text" name="eligibility" defaultValue={scholarship.eligibility} required className="w-full px-3 py-2 border border-gray-300 rounded-md" />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-gray-700">Amount</label>
            <input type="text" name="amount" defaultValue={scholarship.amount} required className="w-full px-3 py-2 border border-gray-300 rounded-md" />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-gray-700">Deadline</label>
            <input type="date" name="deadline" defaultValue={scholarship.deadline.split('T')[0]} required className="w-full px-3 py-2 border border-gray-300 rounded-md" />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-gray-700">Website</label>
            <input type="url" name="website" defaultValue={scholarship.website} required className="w-full px-3 py-2 border border-gray-300 rounded-md" />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-1 text-gray-700">Education Level</label>
            <select name="education_level" defaultValue={scholarship.education_level} required className="w-full px-3 py-2 border border-gray-300 rounded-md">
              <option value="1-5">Class 1-5</option>
              <option value="6-8">Class 6-8</option>
              <option value="9-12">Class 9-12</option>
              <option value="undergraduate">Undergraduate</option>
              <option value="post-graduation">Post-Graduation</option>
              <option value="phd">PhD</option>
            </select>
          </div>
          <div className="flex gap-3">
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
              Save Changes
            </button>
            <a href="/admin/scholarships" className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
              Cancel
            </a>
            <button type="button" onClick={handleDelete} className="ml-auto text-red-600 hover:text-red-800">
              Delete
            </button>
          </div>
        </form>
      </main>
    </div>
  )
}

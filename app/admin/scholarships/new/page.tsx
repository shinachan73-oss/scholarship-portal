'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function NewScholarshipPage() {
  const router = useRouter()
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const res = await fetch('/api/admin/scholarships', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: formData.get('name'),
        provider: formData.get('provider'),
        description: formData.get('description'),
        eligibility: formData.get('eligibility'),
        amount: formData.get('amount'),
        deadline: formData.get('deadline'),
        website: formData.get('website'),
        education_level: formData.get('education_level'),
      }),
    })

    if (res.ok) {
      router.push('/admin/scholarships')
    } else {
      setError('Failed to create scholarship')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-xl font-bold">Create New Scholarship</h1>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 py-8">
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow max-w-2xl">
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">{error}</div>
          )}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-gray-700">Name</label>
            <input type="text" name="name" required className="w-full px-3 py-2 border border-gray-300 rounded-md" />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-gray-700">Provider</label>
            <input type="text" name="provider" required className="w-full px-3 py-2 border border-gray-300 rounded-md" />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-gray-700">Description</label>
            <textarea name="description" required rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-gray-700">Eligibility</label>
            <input type="text" name="eligibility" required className="w-full px-3 py-2 border border-gray-300 rounded-md" />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-gray-700">Amount</label>
            <input type="text" name="amount" required placeholder="₹10,000 per annum" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-gray-700">Deadline</label>
            <input type="date" name="deadline" required className="w-full px-3 py-2 border border-gray-300 rounded-md" />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-gray-700">Website</label>
            <input type="url" name="website" required placeholder="https://example.com" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-1 text-gray-700">Education Level</label>
            <select name="education_level" required className="w-full px-3 py-2 border border-gray-300 rounded-md">
              <option value="">Select level</option>
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
              Create Scholarship
            </button>
            <a href="/admin/scholarships" className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
              Cancel
            </a>
          </div>
        </form>
      </main>
    </div>
  )
}

import Link from 'next/link'
import { getScholarshipById } from '@/lib/admin_scholarships'
import { getEducationLevelLabel, formatDeadline } from '@/lib/utils'

export default async function ViewScholarshipPage({ params }: { params: { id: string } }) {
  const scholarship = getScholarshipById(parseInt(params.id))

  if (!scholarship) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Not Found</h1>
          <p className="text-gray-600 mb-6">The scholarship you are looking for does not exist.</p>
          <Link href="/admin/scholarships" className="text-blue-600 hover:text-blue-800">Back to Scholarships</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/admin/scholarships" className="text-gray-600 hover:text-gray-900">← Back to Scholarships</Link>
          <Link href={`/admin/scholarships/${params.id}/edit`} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
            Edit
          </Link>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{scholarship.name}</h1>
          <p className="text-lg text-gray-600 mb-6">{scholarship.provider}</p>

          <div className="flex flex-wrap gap-3 mb-6">
            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
              {getEducationLevelLabel(scholarship.education_level)}
            </span>
            <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
              {scholarship.amount}
            </span>
          </div>

          <p className="text-gray-700 text-lg mb-6">{scholarship.description}</p>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-2">Eligibility Criteria</h3>
              <p className="text-gray-600">{scholarship.eligibility}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-2">Application Deadline</h3>
              <p className="text-gray-600 text-lg">{formatDeadline(scholarship.deadline)}</p>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold text-gray-800 mb-2">Website</h3>
            <a href={scholarship.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
              {scholarship.website}
            </a>
          </div>

          <div className="border-t pt-6">
            <p className="text-sm text-gray-500">ID: {scholarship.id} | Created: {scholarship.created_at}</p>
          </div>
        </div>
      </main>
    </div>
  )
}

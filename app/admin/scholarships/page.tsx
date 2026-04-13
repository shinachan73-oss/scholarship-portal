import Link from 'next/link'
import { getAllScholarships } from '@/lib/scholarships'
import { getEducationLevelLabel } from '@/lib/utils'
import { formatDeadline } from '@/lib/utils'

export default async function AdminScholarshipsPage() {
  const scholarships = getAllScholarships()

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/admin" className="text-gray-600 hover:text-gray-900">← Back to Dashboard</Link>
          <Link href="/admin/scholarships/new" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
            Add New
          </Link>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Manage Scholarships</h1>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Provider</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Level</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Deadline</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {scholarships.map((s) => (
                <tr key={s.id}>
                  <td className="px-6 py-4 font-medium text-gray-900">{s.name}</td>
                  <td className="px-6 py-4 text-gray-600">{s.provider}</td>
                  <td className="px-6 py-4 text-gray-600">{getEducationLevelLabel(s.education_level)}</td>
                  <td className="px-6 py-4 text-gray-600">{formatDeadline(s.deadline)}</td>
                  <td className="px-6 py-4 text-right space-x-3">
                    <Link href={`/admin/scholarships/${s.id}/edit`} className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                      Edit
                    </Link>
                    <Link href={`/scholarship/${s.id}`} target="_blank" className="text-gray-600 hover:text-gray-800 text-sm font-medium">
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  )
}

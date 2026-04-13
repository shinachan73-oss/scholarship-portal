import Link from 'next/link'
import { signOut } from '@/auth'
import { getPendingCount } from '@/lib/admin_pending'

export default async function AdminDashboard() {
  const pendingCount = getPendingCount()

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
          <form action={async () => {
            'use server'
            await signOut({ redirectTo: '/admin/login' })
          }}>
            <button type="submit" className="text-sm text-red-600 hover:text-red-800">Sign Out</button>
          </form>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link href="/admin/scholarships" className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
            <h2 className="text-lg font-semibold mb-2">Manage Scholarships</h2>
            <p className="text-gray-600">Create, edit, and delete scholarship listings</p>
          </Link>
          <Link href="/admin/scholarships/new" className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
            <h2 className="text-lg font-semibold mb-2">Add New Scholarship</h2>
            <p className="text-gray-600">Add a new scholarship to the database</p>
          </Link>
          <Link href="/admin/pending" className="bg-white p-6 rounded-lg shadow hover:shadow-md transition relative">
            <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
              Pending Approvals
              {pendingCount > 0 && (
                <span className="bg-coral text-white text-xs px-2 py-0.5 rounded-full">{pendingCount}</span>
              )}
            </h2>
            <p className="text-gray-600">Review scraped scholarships from government portals</p>
          </Link>
        </div>
      </main>
    </div>
  )
}

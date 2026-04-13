import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="text-center py-12">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-6">Scholarship Not Found</p>
      <p className="text-gray-500 mb-6">The scholarship you are looking for does not exist or has been removed.</p>
      <Link href="/" className="text-blue-600 hover:text-blue-800 font-medium">
        ← Back to Scholarships
      </Link>
    </div>
  )
}

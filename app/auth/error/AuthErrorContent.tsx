'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

export default function AuthErrorContent() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-xl font-bold text-red-600 mb-4">Authentication Error</h1>
        <p className="text-gray-600 mb-4">
          {error || 'An error occurred during authentication.'}
        </p>
        <Link
          href="/admin/login"
          className="block w-full text-center bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Back to Login
        </Link>
      </div>
    </div>
  )
}

import { Suspense } from 'react'
import AuthErrorContent from './AuthErrorContent'

function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <p className="text-gray-600">Loading...</p>
      </div>
    </div>
  )
}

export default function AuthErrorPage() {
  return (
    <Suspense fallback={<Loading />}>
      <AuthErrorContent />
    </Suspense>
  )
}

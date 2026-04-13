import { NextResponse } from 'next/server'
import { getAllScholarships } from '@/lib/scholarships'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const search = searchParams.get('search') || undefined
  const level = searchParams.get('level') || undefined

  const scholarships = getAllScholarships({ search, educationLevel: level })
  return NextResponse.json(scholarships)
}

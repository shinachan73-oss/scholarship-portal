import { NextResponse } from 'next/server'
import { getScholarshipById, getRelatedScholarships } from '@/lib/scholarships'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id)
  const scholarship = getScholarshipById(id)

  if (!scholarship) {
    return NextResponse.json({ error: 'Scholarship not found' }, { status: 404 })
  }

  const related = getRelatedScholarships(id, scholarship.education_level)

  return NextResponse.json({ scholarship, related })
}

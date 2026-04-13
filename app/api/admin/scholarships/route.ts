import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { getAllScholarships } from '@/lib/scholarships'
import { createScholarship } from '@/lib/admin_scholarships'

export const runtime = 'nodejs'

export async function GET() {
  const session = await auth()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const scholarships = getAllScholarships()
  return NextResponse.json(scholarships)
}

export async function POST(request: Request) {
  const session = await auth()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()
  const scholarship = createScholarship(body)
  return NextResponse.json(scholarship, { status: 201 })
}

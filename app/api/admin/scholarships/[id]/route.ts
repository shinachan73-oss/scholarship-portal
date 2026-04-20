import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { getScholarshipById, updateScholarship, deleteScholarship } from '@/lib/admin_scholarships'

export const runtime = 'nodejs'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await auth()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const scholarship = getScholarshipById(parseInt(params.id))
  if (!scholarship) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }
  return NextResponse.json(scholarship)
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await auth()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const id = parseInt(params.id)
  if (isNaN(id)) {
    return NextResponse.json({ error: 'Invalid ID' }, { status: 400 })
  }

  const body = await request.json()

  // Basic validation for updated fields
  const allowedFields = [
    'name', 'provider', 'description', 'eligibility',
    'amount', 'deadline', 'website', 'education_level'
  ]

  for (const [key, value] of Object.entries(body)) {
    if (!allowedFields.includes(key)) {
      return NextResponse.json(
        { error: `Field '${key}' is not allowed` },
        { status: 400 }
      )
    }
    if (value !== undefined && value !== null && typeof value !== 'string') {
      return NextResponse.json(
        { error: `Field '${key}' must be a string` },
        { status: 400 }
      )
    }
  }

  const scholarship = updateScholarship(id, body)
  if (!scholarship) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }
  return NextResponse.json(scholarship)
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await auth()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const id = parseInt(params.id)
  if (isNaN(id)) {
    return NextResponse.json({ error: 'Invalid ID' }, { status: 400 })
  }

  const deleted = deleteScholarship(id)
  if (!deleted) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }
  return NextResponse.json({ success: true })
}

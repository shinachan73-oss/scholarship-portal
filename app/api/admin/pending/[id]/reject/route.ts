import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { rejectPendingScholarship } from '@/lib/admin_pending'

export const runtime = 'nodejs'

export async function POST(
  _request: Request,
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

  const success = rejectPendingScholarship(id)
  if (!success) {
    return NextResponse.json({ error: 'Pending scholarship not found' }, { status: 404 })
  }

  return NextResponse.json({ message: 'Scholarship rejected' })
}

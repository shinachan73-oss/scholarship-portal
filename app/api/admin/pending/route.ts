import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { getPendingScholarships } from '@/lib/admin_pending'

export const runtime = 'nodejs'

export async function GET() {
  const session = await auth()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const pending = getPendingScholarships()
  return NextResponse.json(pending)
}

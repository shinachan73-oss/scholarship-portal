import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { scrapeAndStore } from '@/lib/scrapers/scrape-manager'

export const runtime = 'nodejs'

export async function POST() {
  const session = await auth()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const result = await scrapeAndStore()
  return NextResponse.json(result)
}

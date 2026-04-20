import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

export async function POST(request: Request) {
  // Check for cron secret authorization
  const authHeader = request.headers.get('Authorization')
  const cronSecret = process.env.CRON_SECRET

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { scrapeAndStore } = await import('@/lib/scrapers/scrape-manager')
  const result = await scrapeAndStore()
  return NextResponse.json(result)
}

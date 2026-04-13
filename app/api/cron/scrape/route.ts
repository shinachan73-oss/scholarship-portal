import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

export async function POST() {
  // Cron endpoint - internal only, no auth required
  const { scrapeAndStore } = await import('@/lib/scrapers/scrape-manager')
  const result = await scrapeAndStore()
  return NextResponse.json(result)
}

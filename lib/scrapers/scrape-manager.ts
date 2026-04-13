import {
  scrapeNationalScholarshipPortal,
  isDuplicate,
  isDuplicateInPending,
} from './gov'
import { addToPending } from '../admin_pending'
import type { ScrapedScholarship } from './gov'

export interface ScrapeResult {
  scraped: number
  added: number
  duplicates: number
  errors: string[]
}

export async function scrapeAndStore(): Promise<ScrapeResult> {
  const result: ScrapeResult = {
    scraped: 0,
    added: 0,
    duplicates: 0,
    errors: [],
  }

  try {
    // Scrape from National Scholarship Portal
    const scholarships = await scrapeNationalScholarshipPortal()
    result.scraped = scholarships.length

    for (const scholarship of scholarships) {
      try {
        // Check for duplicates in main table
        if (isDuplicate(scholarship.name, scholarship.provider)) {
          result.duplicates++
          continue
        }

        // Check for duplicates in pending table
        if (isDuplicateInPending(scholarship.name, scholarship.provider)) {
          result.duplicates++
          continue
        }

        // Add to pending
        addToPending(scholarship)
        result.added++
      } catch (err) {
        result.errors.push(`Failed to process: ${scholarship.name}`)
      }
    }
  } catch (err) {
    result.errors.push(`Scraping failed: ${err}`)
  }

  return result
}

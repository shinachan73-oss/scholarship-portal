import { getDb } from './db'
import { createScholarship } from './admin_scholarships'
import type { ScrapedScholarship } from './scrapers/gov'

export interface PendingScholarship {
  id: number
  name: string
  provider: string
  description: string
  eligibility: string
  amount: string
  deadline: string
  website: string
  education_level: string
  source_url: string | null
  scraped_at: string
  status: string
}

export function getPendingScholarships(): PendingScholarship[] {
  const db = getDb()
  const stmt = db.prepare(
    "SELECT * FROM pending_scholarships WHERE status = 'pending' ORDER BY scraped_at DESC"
  )
  return stmt.all() as PendingScholarship[]
}

export function getPendingScholarshipById(id: number): PendingScholarship | undefined {
  const db = getDb()
  const stmt = db.prepare('SELECT * FROM pending_scholarships WHERE id = ?')
  return stmt.get(id) as PendingScholarship | undefined
}

export function addToPending(scholarship: ScrapedScholarship): PendingScholarship {
  const db = getDb()
  const stmt = db.prepare(`
    INSERT INTO pending_scholarships (name, provider, description, eligibility, amount, deadline, website, education_level, source_url)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `)
  const result = stmt.run(
    scholarship.name,
    scholarship.provider,
    scholarship.description,
    scholarship.eligibility,
    scholarship.amount,
    scholarship.deadline,
    scholarship.website,
    scholarship.education_level,
    scholarship.source_url
  )
  return getPendingScholarshipById(result.lastInsertRowid as number)!
}

export function approvePendingScholarship(id: number) {
  const pending = getPendingScholarshipById(id)
  if (!pending) return null

  // Create in main scholarships table
  createScholarship({
    name: pending.name,
    provider: pending.provider,
    description: pending.description,
    eligibility: pending.eligibility,
    amount: pending.amount,
    deadline: pending.deadline,
    website: pending.website,
    education_level: pending.education_level,
  })

  // Mark as approved
  const db = getDb()
  const stmt = db.prepare("UPDATE pending_scholarships SET status = 'approved' WHERE id = ?")
  stmt.run(id)

  return pending
}

export function rejectPendingScholarship(id: number): boolean {
  const db = getDb()
  const stmt = db.prepare('DELETE FROM pending_scholarships WHERE id = ?')
  const result = stmt.run(id)
  return result.changes > 0
}

export function getPendingCount(): number {
  const db = getDb()
  const stmt = db.prepare("SELECT COUNT(*) as count FROM pending_scholarships WHERE status = 'pending'")
  const result = stmt.get() as { count: number }
  return result.count
}

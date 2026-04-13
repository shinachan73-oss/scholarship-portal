import { getDb } from './db'

export interface Scholarship {
  id: number
  name: string
  provider: string
  description: string
  eligibility: string
  amount: string
  deadline: string
  website: string
  education_level: string
  created_at: string
}

export interface ScholarshipFilter {
  search?: string
  educationLevel?: string
}

export function getAllScholarships(filter?: ScholarshipFilter): Scholarship[] {
  const db = getDb()
  let query = 'SELECT * FROM scholarships WHERE 1=1'
  const params: string[] = []

  if (filter?.search) {
    query += ' AND (name LIKE ? OR provider LIKE ? OR description LIKE ?)'
    const searchTerm = `%${filter.search}%`
    params.push(searchTerm, searchTerm, searchTerm)
  }

  if (filter?.educationLevel) {
    query += ' AND education_level = ?'
    params.push(filter.educationLevel)
  }

  query += ' ORDER BY deadline ASC'

  const stmt = db.prepare(query)
  return stmt.all(...params) as Scholarship[]
}

export function getScholarshipById(id: number): Scholarship | undefined {
  const db = getDb()
  const stmt = db.prepare('SELECT * FROM scholarships WHERE id = ?')
  return stmt.get(id) as Scholarship | undefined
}

export function getRelatedScholarships(id: number, educationLevel: string): Scholarship[] {
  const db = getDb()
  const stmt = db.prepare(
    'SELECT * FROM scholarships WHERE education_level = ? AND id != ? ORDER BY deadline ASC LIMIT 4'
  )
  return stmt.all(educationLevel, id) as Scholarship[]
}

export function getEducationLevels(): string[] {
  return ['1-5', '6-8', '9-12', 'undergraduate', 'post-graduation', 'phd']
}

export function isDeadlinePassed(deadline: string): boolean {
  return new Date(deadline) < new Date()
}

export function formatDeadline(deadline: string): string {
  return new Date(deadline).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export function getEducationLevelLabel(level: string): string {
  const labels: Record<string, string> = {
    '1-5': 'Class 1-5',
    '6-8': 'Class 6-8',
    '9-12': 'Class 9-12',
    'undergraduate': 'Undergraduate',
    'post-graduation': 'Post-Graduation',
    'phd': 'PhD',
  }
  return labels[level] || level
}

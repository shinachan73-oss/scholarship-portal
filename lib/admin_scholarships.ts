import { getDb } from './db'
import { Scholarship } from './scholarships'

export interface CreateScholarshipInput {
  name: string
  provider: string
  description: string
  eligibility: string
  amount: string
  deadline: string
  website: string
  education_level: string
}

export interface UpdateScholarshipInput extends Partial<CreateScholarshipInput> {}

export function createScholarship(data: CreateScholarshipInput): Scholarship {
  const db = getDb()
  const stmt = db.prepare(`
    INSERT INTO scholarships (name, provider, description, eligibility, amount, deadline, website, education_level)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `)
  const result = stmt.run(
    data.name, data.provider, data.description, data.eligibility,
    data.amount, data.deadline, data.website, data.education_level
  )
  return getScholarshipById(result.lastInsertRowid as number)!
}

export function updateScholarship(id: number, data: UpdateScholarshipInput): Scholarship | undefined {
  const db = getDb()
  const fields: string[] = []
  const values: (string | number)[] = []
  const allowedFields = [
    'name', 'provider', 'description', 'eligibility',
    'amount', 'deadline', 'website', 'education_level'
  ]

  Object.entries(data).forEach(([key, value]) => {
    if (allowedFields.includes(key) && value !== undefined && value !== null) {
      fields.push(`${key} = ?`)
      values.push(value as string | number)
    }
  })

  if (fields.length === 0) return getScholarshipById(id)

  values.push(id)
  const stmt = db.prepare(`UPDATE scholarships SET ${fields.join(', ')} WHERE id = ?`)
  stmt.run(...values)
  return getScholarshipById(id)
}

export function deleteScholarship(id: number): boolean {
  const db = getDb()
  const stmt = db.prepare('DELETE FROM scholarships WHERE id = ?')
  const result = stmt.run(id)
  return result.changes > 0
}

export function getScholarshipById(id: number): Scholarship | undefined {
  const db = getDb()
  const stmt = db.prepare('SELECT * FROM scholarships WHERE id = ?')
  return stmt.get(id) as Scholarship | undefined
}

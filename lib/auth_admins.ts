import { getDb } from './db'
import bcrypt from 'bcrypt'

export interface Admin {
  id: number
  email: string
  password_hash: string
  name: string
  created_at: string
}

export async function verifyAdmin(email: string, password: string): Promise<Admin | null> {
  const db = getDb()
  const stmt = db.prepare('SELECT * FROM admins WHERE email = ?')
  const admin = stmt.get(email) as Admin | undefined

  if (!admin) return null

  const isValid = await bcrypt.compare(password, admin.password_hash)
  return isValid ? admin : null
}

export function getAdminById(id: number): Admin | undefined {
  const db = getDb()
  const stmt = db.prepare('SELECT * FROM admins WHERE id = ?')
  return stmt.get(id) as Admin | undefined
}

export async function createAdmin(email: string, password: string, name: string): Promise<number> {
  const db = getDb()
  const passwordHash = await bcrypt.hash(password, 10)
  const stmt = db.prepare('INSERT INTO admins (email, password_hash, name) VALUES (?, ?, ?)')
  const result = stmt.run(email, passwordHash, name)
  return result.lastInsertRowid as number
}

import { getDb } from '../lib/db'
import bcrypt from 'bcrypt'

async function seedAdmin() {
  const db = getDb()

  // Check if admin already exists
  const existingAdmin = db.prepare('SELECT * FROM admins WHERE email = ?').get('admin@scholarshipportal.com')
  if (existingAdmin) {
    console.log('Admin user already exists')
    return
  }

  const passwordHash = await bcrypt.hash('admin123', 10)
  db.prepare('INSERT INTO admins (email, password_hash, name) VALUES (?, ?, ?)').run(
    'admin@scholarshipportal.com',
    passwordHash,
    'Admin User'
  )

  console.log('Admin user created:')
  console.log('  Email: admin@scholarshipportal.com')
  console.log('  Password: admin123')
}

seedAdmin().catch(console.error)

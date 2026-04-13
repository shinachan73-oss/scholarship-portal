import Database from 'better-sqlite3'
import path from 'path'
import fs from 'fs'

const dataDir = path.join(process.cwd(), 'data')
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true })
}

const dbPath = path.join(dataDir, 'scholarships.db')
const db = new Database(dbPath)

db.exec(`
  CREATE TABLE IF NOT EXISTS scholarships (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    provider TEXT NOT NULL,
    description TEXT NOT NULL,
    eligibility TEXT NOT NULL,
    amount TEXT NOT NULL,
    deadline TEXT NOT NULL,
    website TEXT NOT NULL,
    education_level TEXT NOT NULL,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  )
`)

db.exec('DELETE FROM scholarships')

const scholarships = [
  // Class 1-5
  {
    name: 'PM CARES Scholarship',
    provider: 'Government of India',
    description: 'Scholarship for students from economically weaker sections studying in Class 1-5',
    eligibility: 'Family income below 2.5 LPA, Age 6-10 years',
    amount: '₹10,000 per annum',
    deadline: '2026-08-31',
    website: 'https://example.com/pm-cares',
    education_level: '1-5',
  },
  {
    name: 'Sukanya Samriddhi Scholarship',
    provider: 'Ministry of Women & Child Development',
    description: 'Scholarship for girl child to encourage education',
    eligibility: 'Girl child from SC/ST families, below 100 days old account',
    amount: '₹8,000 per annum',
    deadline: '2026-07-15',
    website: 'https://example.com/sukanya',
    education_level: '1-5',
  },
  {
    name: 'National Merit Scholarship',
    provider: 'MHRD',
    description: 'Merit-based scholarship for bright young students',
    eligibility: 'Minimum 90% marks in previous class',
    amount: '₹12,000 per annum',
    deadline: '2026-09-30',
    website: 'https://example.com/national-merit',
    education_level: '1-5',
  },
  // Class 6-8
  {
    name: 'Central Sector Scholarship',
    provider: 'MHRD',
    description: 'Scholarship for students from economically weaker families in middle school',
    eligibility: 'Family income below 8 LPA, minimum 60% marks',
    amount: '₹15,000 per annum',
    deadline: '2026-10-31',
    website: 'https://example.com/central-sector',
    education_level: '6-8',
  },
  {
    name: 'Kishore Vaigyanik Protsahan Yojana',
    provider: 'Science & Technology Department',
    description: 'Scholarship for students showing aptitude in science',
    eligibility: 'Students with passion for science, aptitude test required',
    amount: '₹20,000 per annum',
    deadline: '2026-11-15',
    website: 'https://example.com/kvpy',
    education_level: '6-8',
  },
  {
    name: ' Merit Scholarship Scheme',
    provider: 'CBSE',
    description: 'Scholarship for CBSE students with excellent academic performance',
    eligibility: 'CBSE affiliated school, minimum 80% marks',
    amount: '₹10,000 per annum',
    deadline: '2026-08-31',
    website: 'https://example.com/central-sector',
    education_level: '6-8',
  },
  // Class 9-12
  {
    name: 'National Means-cum-Merit Scholarship',
    provider: 'MHRD',
    description: 'Scholarship for meritorious students from economically weaker sections',
    eligibility: 'Family income below 3.5 LPA, minimum 55% marks in Class 8',
    amount: '₹12,000 per annum',
    deadline: '2026-09-30',
    website: 'https://example.com/nmms',
    education_level: '9-12',
  },
  {
    name: 'Pre-Matric Scholarship',
    provider: 'Ministry of Social Justice',
    description: 'Scholarship for SC/ST students pursuing secondary education',
    eligibility: 'SC/ST students, family income below 2.5 LPA',
    amount: '₹5,000 per annum',
    deadline: '2026-07-31',
    website: 'https://example.com/pre-matric',
    education_level: '9-12',
  },
  {
    name: 'Post-Matric Scholarship',
    provider: 'Ministry of Minorities',
    description: 'Scholarship for minority community students',
    eligibility: 'Students from minority communities, family income below 2 LPA',
    amount: '₹10,000 per annum',
    deadline: '2026-10-15',
    website: 'https://example.com/post-matric',
    education_level: '9-12',
  },
  {
    name: 'Sardar Patel Scholarship',
    provider: 'Gujarat State Board',
    description: 'Scholarship for Gujarat board students with academic excellence',
    eligibility: 'Gujarat board, minimum 75% marks',
    amount: '₹8,000 per annum',
    deadline: '2026-08-31',
    website: 'https://example.com/sardar-patel',
    education_level: '9-12',
  },
  // Undergraduate
  {
    name: 'Central Sector Scholarship (UG)',
    provider: 'MHRD',
    description: 'Scholarship for undergraduate students from economically weaker families',
    eligibility: 'Family income below 8 LPA, minimum 60% in 12th',
    amount: '₹20,000 per annum',
    deadline: '2026-11-30',
    website: 'https://example.com/central-sector-ug',
    education_level: 'undergraduate',
  },
  {
    name: 'Prime Minister Scholarship',
    provider: 'Raksha Mantri',
    description: 'Scholarship for wards of ex-servicemen and widow of defence personnel',
    eligibility: ' wards of ex-servicemen, studying in recognized institutions',
    amount: '₹36,000 per annum',
    deadline: '2026-09-30',
    website: 'https://example.com/pm-scholarship',
    education_level: 'undergraduate',
  },
  {
    name: 'Oil India Scholarship',
    provider: 'Oil India Limited',
    description: 'Scholarship for students from NER and Assam pursuing graduation',
    eligibility: 'Students from NE region, family income below 8 LPA',
    amount: '₹25,000 per annum',
    deadline: '2026-08-31',
    website: 'https://example.com/oil-india',
    education_level: 'undergraduate',
  },
  {
    name: 'Fair & Lovely Scholarship',
    provider: 'Emami Group',
    description: 'Scholarship for underprivileged girl students',
    eligibility: 'Girl students, family income below 6 LPA, minimum 60% marks',
    amount: '₹30,000 per annum',
    deadline: '2026-07-31',
    website: 'https://example.com/fair-lovely',
    education_level: 'undergraduate',
  },
  // Post-Graduation
  {
    name: 'Post-Graduate Scholarship',
    provider: 'UGC',
    description: 'Scholarship for postgraduate students in recognized universities',
    eligibility: 'Students in recognized PG programs, minimum 55% marks',
    amount: '₹15,000 per month',
    deadline: '2026-10-31',
    website: 'https://example.com/ugc-scholarship',
    education_level: 'post-graduation',
  },
  {
    name: 'IIT JAM Scholarship',
    provider: 'IITs',
    description: 'Scholarship for students admitted to IITs through JAM',
    eligibility: 'Valid JAM score, admitted to IIT M.Sc. program',
    amount: '₹12,000 per month',
    deadline: '2026-06-30',
    website: 'https://example.com/iit-jam',
    education_level: 'post-graduation',
  },
  {
    name: 'ICSSR Scholarship',
    provider: 'ICSSR',
    description: 'Scholarship for students pursuing research in social sciences',
    eligibility: 'Students in social sciences PhD, UGC NET qualified',
    amount: '₹18,000 per month',
    deadline: '2026-09-30',
    website: 'https://example.com/icssr',
    education_level: 'post-graduation',
  },
  {
    name: 'CSIR NET Scholarship',
    provider: 'CSIR',
    description: 'Scholarship for students qualifying CSIR NET exam',
    eligibility: 'CSIR NET qualified, pursuing PhD in science streams',
    amount: '₹25,000 per month',
    deadline: '2026-08-31',
    website: 'https://example.com/csir-net',
    education_level: 'post-graduation',
  },
  // PhD
  {
    name: 'INSPIRE Scholarship',
    provider: 'DST',
    description: 'Scholarship for students pursuing PhD in basic sciences',
    eligibility: 'B.Sc. top 1% or valid GATE score, age below 32 years',
    amount: '₹31,000 per month + HRA',
    deadline: '2026-11-30',
    website: 'https://example.com/inspire',
    education_level: 'phd',
  },
  {
    name: 'Shyama Prasad Mukherjee Fellowship',
    provider: 'UGC',
    description: 'Fellowship for PhD students in various universities',
    eligibility: 'UGC NET qualified, admitted to PhD in recognized university',
    amount: '₹28,000 per month',
    deadline: '2026-10-31',
    website: 'https://example.com/spm-fellowship',
    education_level: 'phd',
  },
]

const insert = db.prepare(`
  INSERT INTO scholarships (name, provider, description, eligibility, amount, deadline, website, education_level)
  VALUES (@name, @provider, @description, @eligibility, @amount, @deadline, @website, @education_level)
`)

const insertMany = db.transaction((items: typeof scholarships[0]) => {
  for (const item of items) {
    insert.run(item)
  }
})

insertMany(scholarships)

console.log(`Inserted ${scholarships.length} scholarships`)
db.close()

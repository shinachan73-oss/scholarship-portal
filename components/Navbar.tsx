import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold flex items-center gap-2">
          <span className="text-2xl">🎓</span>
          <span>Scholarship Portal</span>
        </Link>
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="px-4 py-2 rounded-full hover:bg-white/20 transition-all duration-200 hover:scale-105"
          >
            Home
          </Link>
          <Link
            href="/admin"
            className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-200 hover:scale-105"
          >
            Admin
          </Link>
        </div>
      </div>
    </nav>
  )
}

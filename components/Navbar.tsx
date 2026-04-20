import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-blue-600/90 backdrop-blur-md text-white shadow-lg border-b border-white/10">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl md:text-2xl font-black flex items-center gap-2 tracking-tight hover:scale-105 transition-transform">
          <span className="drop-shadow-lg text-3xl">🎓</span>
          <span className="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
            Scholarship Portal
          </span>
        </Link>
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="px-5 py-2 rounded-full font-bold hover:bg-white/20 transition-all duration-200 active:scale-95"
          >
            Home
          </Link>
          <Link
            href="/admin"
            className="px-5 py-2 rounded-full bg-white text-blue-600 font-bold hover:bg-blue-50 transition-all duration-200 shadow-lg shadow-blue-900/20 active:scale-95"
          >
            Admin
          </Link>
        </div>
      </div>
    </nav>
  )
}

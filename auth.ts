import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { verifyAdmin } from '@/lib/auth_admins'

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: { strategy: 'jwt' },
  providers: [
    Credentials({
      name: 'Admin Login',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null

        const admin = await verifyAdmin(
          credentials.email as string,
          credentials.password as string
        )

        if (!admin) return null

        return {
          id: admin.id.toString(),
          email: admin.email,
          name: admin.name,
        }
      },
    }),
  ],
  pages: {
    signIn: '/admin/login',
    error: '/admin/login',
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
      }
      return session
    },
  },
  trustHost: true,
})

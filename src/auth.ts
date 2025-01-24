import NextAuth from "next-auth"
import authConfig from "./auth.config"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "./lib/db"

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut
} = NextAuth({
  callbacks: {
    async jwt({ token }) {
      if (token.email === process.env.ADMIN_GMAIL)
        token.isAdmin = true
      else
        token.isAdmin = false
      return token
    },
    async session({ token, session }) {
      if (session.user) {
        if (token.sub)
          session.user.id = token.sub
        if (token.isAdmin)
          session.user.isAdmin = token.isAdmin
      }
      return session
    }
  },
  pages: {
    signIn: "/"
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig
})
import { betterAuth } from 'better-auth/minimal'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { db } from '@/db'
import { nextCookies } from 'better-auth/next-js'

export const auth = betterAuth({
  trustedOrigins: ['https://notion-lite-notes.vercel.app'],
  database: drizzleAdapter(db, {
    provider: 'pg',
  }),
  emailAndPassword: {
    enabled: true,
  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // Cache duration in seconds
    },
  },
  plugins: [nextCookies()],
})

import 'server-only'

import { DrizzlePostgreSQLAdapter } from '@lucia-auth/adapter-drizzle'
import { db } from '@/lib/db'
import { user, session } from '@/lib/db/schema'
import { HMAC } from 'oslo/crypto'
import { Lucia } from 'lucia'

const SECRET = new HMAC('SHA-1').generateKey()

const ISSUER = 'tanjerin' as const
const ACCOUNT_NAME = 'tanjerin' as const

const adapter = new DrizzlePostgreSQLAdapter(db, session, user)

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      secure: process.env.NODE_ENV === 'production',
    },
  },
})

declare module 'lucia' {
  interface Register {
    Lucia: typeof lucia
    DatabaseUserAttributes: {
      email: string
      emailVerified: number
    }
  }
}

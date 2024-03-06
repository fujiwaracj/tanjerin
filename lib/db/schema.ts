import {
  pgTable,
  uuid,
  text,
  timestamp,
  integer,
  jsonb,
  pgEnum,
  boolean,
} from 'drizzle-orm/pg-core'
import {} from 'oslo/'

export const user = pgTable('user', {
  id: text('id').primaryKey(),
  count: integer('count').default(0).notNull(),
  email: text('email').unique().notNull(),
  emailVerified: boolean('email_verified').notNull(),
  billingAddress: jsonb('billing_address'),
  paymentMethod: jsonb('payment_method'),
  createdAt: timestamp('created_at', {
    withTimezone: true,
    mode: 'date',
  }),
  updatedAt: timestamp('updated_at', {
    withTimezone: true,
    mode: 'date',
  }),
})

export const session = pgTable('session', {
  id: text('session_id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => user.id, {
      onUpdate: 'cascade',
      onDelete: 'cascade',
    }),
  expiresAt: timestamp('session_expires_at', {
    withTimezone: true,
    mode: 'date',
  }).notNull(),
})

export const pricing = pgEnum('pricing', ['free', 'paid'])
export const roleEnum = pgEnum('role', ['user', 'admin', 'system'])

export const customer = pgTable('customer', {
  id: text('customer_id')
    .references(() => user.id)
    .notNull()
    .primaryKey(),
})

export const pricingPlanInterval = pgEnum('pricing_plan_interval', [
  'day',
  'month',
  'year',
])

export const price = pgTable('price', {
  id: text('price_id').primaryKey(),
  productId: text('product_id').notNull(),
})

export const subscription = pgTable('subscription', {
  id: text('subscription_id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => user.id),
  createdAt: timestamp('created_at', {
    withTimezone: true,
    mode: 'date',
  }),
  updatedAt: timestamp('updated_at', {
    withTimezone: true,
    mode: 'date',
  }),
})

export const prompt = pgTable('prompt', {
  promptId: uuid('prompt_id').primaryKey().notNull(),
  promptResponse: text('prompt_response').notNull(),
  role: roleEnum('role').notNull(),
})

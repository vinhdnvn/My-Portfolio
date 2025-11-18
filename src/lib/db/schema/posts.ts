import { pgTable, uuid, text, boolean, timestamp, index } from 'drizzle-orm/pg-core';

export const posts = pgTable('posts', {
  id: uuid().primaryKey().defaultRandom().notNull(),
  title: text().notNull(),
  slug: text().unique(),
  context: text(),
  coverUrl: text('cover_url'),
  attachments: text().array(),
  published: boolean().default(false),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
}, (table) => [
  index('idx_posts_published').on(table.published),
]);

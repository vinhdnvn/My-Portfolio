import { pgTable, uuid, text, date, timestamp } from 'drizzle-orm/pg-core';

export const achievements = pgTable('achievements', {
  id: uuid().primaryKey().defaultRandom().notNull(),
  title: text().notNull(),
  organization: text(),
  date: date(),
  description: text(),
  certificateUrl: text('certificate_url'),
  attachmentUrl: text('attachment_url'),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
});

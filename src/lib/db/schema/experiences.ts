import { pgTable, uuid, text, date, timestamp } from 'drizzle-orm/pg-core';

export const experiences = pgTable('experiences', {
  id: uuid().primaryKey().defaultRandom().notNull(),
  company: text().notNull(),
  role: text().notNull(),
  startDate: date('start_date'),
  endDate: date('end_date'),
  description: text(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
});

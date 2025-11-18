import { pgTable, uuid, text, timestamp } from 'drizzle-orm/pg-core';

export const siteSettings = pgTable('site_settings', {
  id: uuid().primaryKey().defaultRandom().notNull(),
  siteName: text('site_name'),
  tagline: text(),
  about: text(),
  contactEmail: text('contact_email'),
  githubUrl: text('github_url'),
  linkedinUrl: text('linkedin_url'),
  paperUrl: text('paper_url'),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

import { pgTable, uuid, text, boolean, timestamp, index } from 'drizzle-orm/pg-core';

export const projects = pgTable('projects', {
  id: uuid().primaryKey().defaultRandom().notNull(),
  title: text().notNull(),
  description: text(),
  thumbnailUrl: text('thumbnail_url'),
  githubUrl: text('github_url'),
  liveUrl: text('live_url'),
  confidential: boolean().default(false),
  techStack: text('tech_stack').array(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
}, (table) => [
  index('idx_projects_confidential').on(table.confidential),
]);

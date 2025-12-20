import { text, timestamp, uuid } from "drizzle-orm/pg-core";

export const baseColumns = {
	id: uuid().primaryKey().defaultRandom(),
	createdAt: timestamp({ withTimezone: true }).defaultNow().notNull(),
	updatedAt: timestamp({ withTimezone: true })
		.defaultNow()
		.$onUpdate(() => new Date())
		.notNull()
} as const;

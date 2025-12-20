import { decimal, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { createSelectSchema, createInsertSchema } from "drizzle-zod";
import { baseColumns } from "./base.ts";
import { categories } from "./categories.ts";
import { relations } from "drizzle-orm";

export const products = pgTable("products", {
	...baseColumns,
	name: text().notNull().unique(),
	description: text(),
	price: decimal({ mode: "number" }).notNull(),
	categoryId: uuid()
		.notNull()
		.references(() => categories.id, { onDelete: "cascade" })
});

export const productsRelations = relations(products, ({ one }) => ({
	category: one(categories, {
		fields: [products.categoryId],
		references: [categories.id]
	})
}));

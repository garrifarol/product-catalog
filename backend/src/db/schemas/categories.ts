import { pgTable, text } from "drizzle-orm/pg-core";
import { baseColumns } from "./base.ts";
import { createSelectSchema } from "drizzle-zod";
import { relations } from "drizzle-orm";
import { products } from "./products.ts";

export const categories = pgTable("categories", {
	...baseColumns,
	name: text().notNull().unique(),
	description: text()
});

export const categoriesRelations = relations(categories, ({ many }) => ({
	products: many(products)
}));

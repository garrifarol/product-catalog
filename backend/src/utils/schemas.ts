import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { categories } from "../db/schemas/categories.ts";
import { products } from "../db/schemas/products.ts";
import { createMessageObjectSchema } from "stoker/openapi/schemas";
import * as HttpStatusPhrases from "stoker/http-status-phrases";
import z from "zod";

export const notFoundSchema = createMessageObjectSchema(
	HttpStatusPhrases.NOT_FOUND
);

// ------------------ Categories Schemas ------------------
export const selectCategoriesSchema = createSelectSchema(categories);

export const categoryFilterQuerySchema = z.object({
	categoryId: z.uuid().optional()
});

// ------------------ Products Schemas ------------------
export const selectProductsSchema = createSelectSchema(products).extend({
	category: selectCategoriesSchema
});
export const insertProductsSchema = createInsertSchema(products, {
	name: (schema) =>
		schema
			.trim()
			.refine((val) => val.length > 0, {
				message: "Name cannot be empty."
			})
			.max(500),
	price: (schema) => schema.gte(0.01, "Price must be at least 0.01"),
	description: (schema) =>
		schema
			.trim()
			.refine((val) => val.length > 0, {
				message: "Description cannot be empty."
			})
			.max(500)
}).omit({
	id: true,
	createdAt: true,
	updatedAt: true
});

export const patchProductsSchema = insertProductsSchema.partial();

import { createRoute, z } from "@hono/zod-openapi";
import {
	jsonContent,
	jsonContentOneOf,
	jsonContentRequired
} from "stoker/openapi/helpers";
import { createErrorSchema, IdUUIDParamsSchema } from "stoker/openapi/schemas";
import {
	categoryFilterQuerySchema,
	insertProductsSchema,
	notFoundSchema,
	patchProductsSchema,
	selectProductsSchema
} from "../../utils/schemas.ts";

const tags = ["Products"];

export const get = createRoute({
	method: "get",
	path: "/",
	request: {
		query: categoryFilterQuerySchema
	},
	summary: "Get Products",
	tags,
	responses: {
		200: jsonContent(z.array(selectProductsSchema), "List of Products"),
		422: jsonContent(createErrorSchema(IdUUIDParamsSchema), "Invalid id error")
	}
});

export const create = createRoute({
	method: "post",
	path: "/",
	request: {
		body: jsonContentRequired(insertProductsSchema, "Product to create")
	},
	summary: "Create Product",
	tags,
	responses: {
		201: jsonContent(selectProductsSchema, "Product created"),
		422: jsonContent(
			createErrorSchema(insertProductsSchema),
			"Validation Error(s)"
		)
	}
});

export const getById = createRoute({
	method: "get",
	path: "/{id}",
	request: {
		params: IdUUIDParamsSchema
	},
	summary: "Get Product By Id",
	tags,
	responses: {
		200: jsonContent(selectProductsSchema, "Product"),
		404: jsonContent(notFoundSchema, "Product not found"),
		422: jsonContent(createErrorSchema(IdUUIDParamsSchema), "Invalid id error")
	}
});

export const patch = createRoute({
	method: "patch",
	path: "/{id}",
	request: {
		params: IdUUIDParamsSchema,
		body: jsonContentRequired(patchProductsSchema, "Product to update")
	},
	summary: "Update Product",
	tags,
	responses: {
		200: jsonContent(selectProductsSchema, "Product updated"),
		404: jsonContent(notFoundSchema, "Product not found"),
		422: jsonContentOneOf(
			[
				createErrorSchema(patchProductsSchema),
				createErrorSchema(IdUUIDParamsSchema)
			],
			"Validation Error(s)"
		)
	}
});

export const remove = createRoute({
	method: "delete",
	path: "/{id}",
	request: {
		params: IdUUIDParamsSchema
	},
	summary: "Delete Product",
	tags,
	responses: {
		200: jsonContent(z.object({ message: z.string() }), "Product deleted"),
		404: jsonContent(notFoundSchema, "Product not found"),
		422: jsonContent(createErrorSchema(IdUUIDParamsSchema), "Invalid id error")
	}
});

export type GetRoute = typeof get;
export type CreateRoute = typeof create;
export type GetByIdRoute = typeof getById;
export type PatchRoute = typeof patch;
export type RemoveRoute = typeof remove;

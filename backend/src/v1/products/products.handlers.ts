import { eq } from "drizzle-orm";
import { products } from "../../db/schemas/products.ts";
import db from "../../lib/db.ts";
import type { AppRouteHandler } from "../../utils/types.ts";
import type {
	CreateRoute,
	GetByIdRoute,
	GetRoute,
	PatchRoute,
	RemoveRoute
} from "./products.routes.ts";
import * as HTTPStatusPhrases from "stoker/http-status-phrases";

export const get: AppRouteHandler<GetRoute> = async (c) => {
	const { categoryId } = c.req.valid("query");
	const products = await db.query.products.findMany({
		where: categoryId
			? (products, { eq }) => eq(products.categoryId, categoryId)
			: undefined,
		with: {
			category: true
		}
	});

	return c.json(products, 200);
};

export const create: AppRouteHandler<CreateRoute> = async (c) => {
	const payload = c.req.valid("json");

	const [inserted] = await db
		.insert(products)
		.values(payload)
		.returning({ id: products.id });

	const product = await db.query.products.findFirst({
		where: (products, { eq }) => eq(products.id, inserted.id),
		with: {
			category: true
		}
	});

	return c.json(product, 201);
};

export const getById: AppRouteHandler<GetByIdRoute> = async (c) => {
	const { id } = c.req.valid("param");

	const product = await db.query.products.findFirst({
		where: (products, { eq }) => eq(products.id, id),
		with: {
			category: true
		}
	});

	if (!product) {
		return c.json({ message: HTTPStatusPhrases.NOT_FOUND }, 404);
	}

	return c.json(product, 200);
};

export const patch: AppRouteHandler<PatchRoute> = async (c) => {
	const { id } = c.req.valid("param");
	const payload = c.req.valid("json");

	const updated = await db
		.update(products)
		.set(payload)
		.where(eq(products.id, id))
		.returning({ id: products.id });

	if (updated.length === 0) {
		return c.json({ message: HTTPStatusPhrases.NOT_FOUND }, 404);
	}

	const product = await db.query.products.findFirst({
		where: (products, { eq }) => eq(products.id, updated[0].id),
		with: {
			category: true
		}
	});

	return c.json(product, 200);
};

export const remove: AppRouteHandler<RemoveRoute> = async (c) => {
	const { id } = c.req.valid("param");

	const deleted = await db.delete(products).where(eq(products.id, id));

	if (deleted.rowCount === 0) {
		return c.json({ message: HTTPStatusPhrases.NOT_FOUND }, 404);
	}

	return c.json({ message: "Product Deleted" }, 200);
};

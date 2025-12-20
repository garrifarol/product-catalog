import env from "../../env.ts";
import db from "../../lib/db.ts";
import type { AppRouteHandler } from "../../utils/types.ts";
import type { GetRoute } from "./categories.routes.ts";

export const get: AppRouteHandler<GetRoute> = async (c) => {
	let categories;
	try {
		categories = await db.query.categories.findMany();
	} catch (error) {
		console.error("Error fetching categories:", error);
	}
	return c.json(categories, 200);
};

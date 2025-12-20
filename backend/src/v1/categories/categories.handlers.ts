import db from "../../lib/db.ts";
import type { AppRouteHandler } from "../../utils/types.ts";
import type { GetRoute } from "./categories.routes.ts";

export const get: AppRouteHandler<GetRoute> = async (c) => {
	const categories = await db.query.categories.findMany();

	return c.json(categories, 200);
};

import env from "../../env.ts";
import db from "../../lib/db.ts";
import type { AppRouteHandler } from "../../utils/types.ts";
import type { GetRoute } from "./categories.routes.ts";

export const get: AppRouteHandler<GetRoute> = async (c) => {
	const categories = await db.query.categories.findMany();
	console.log("NODE_ENV:", env.NODE_ENV);
	console.log("DATABASE_URL:", env.DATABASE_URL?.slice(0, 24) + "...");
	return c.json(categories, 200);
};

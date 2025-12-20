import { createRoute, z } from "@hono/zod-openapi";
import { jsonContent } from "stoker/openapi/helpers";
import { selectCategoriesSchema } from "../../utils/schemas.ts";

const tags = ["Categories"];

export const get = createRoute({
	method: "get",
	path: "/",
	summary: "Get Categories",
	tags,
	responses: {
		200: jsonContent(z.array(selectCategoriesSchema), "List of Categories")
	}
});

export type GetRoute = typeof get;

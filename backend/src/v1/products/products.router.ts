import { createRouter } from "../../utils/create-app.js";
import * as handlers from "./products.handlers.ts";
import * as routes from "./products.routes.ts";

const productsRouter = createRouter()
	.openapi(routes.get, handlers.get)
	.openapi(routes.create, handlers.create)
	.openapi(routes.getById, handlers.getById)
	.openapi(routes.patch, handlers.patch)
	.openapi(routes.remove, handlers.remove);

export default productsRouter;

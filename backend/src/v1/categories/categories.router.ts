import { createRouter } from "../../utils/create-app.ts";
import * as handlers from "./categories.handlers.ts";
import * as routes from "./categories.routes.ts";

const categoriesRouter = createRouter().openapi(routes.get, handlers.get);

export default categoriesRouter;

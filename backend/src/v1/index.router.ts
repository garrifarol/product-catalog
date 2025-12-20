import { createRouter } from "../utils/create-app.js";
import categoriesRouter from "./categories/categories.router.ts";
import productsRouter from "./products/products.router.ts";

const v1 = createRouter();

const routes = [
	{ name: "categories", router: categoriesRouter },
	{ name: "products", router: productsRouter }
];

routes.forEach((route) => {
	v1.route(route.name, route.router);
});
export default v1;

import * as products from "./products.ts";
import * as categories from "./categories.ts";

export const schema = {
	...products,
	...categories
};

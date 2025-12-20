import createApp from "./utils/create-app.js";
import v1 from "./v1/index.router.js";
import { Scalar } from "@scalar/hono-api-reference";
import packageJson from "../package.json" with { type: "json" };
import { cors } from "hono/cors";
import env from "./env.ts";

const app = createApp();
app.use(
  '/v1/*',
  cors({
    origin: ['http://localhost:4200', 'https://product-catalog-frontend-a6pa.onrender.com'],
    allowMethods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);
app.doc("/doc", {
	openapi: "3.0.0",
	info: {
		version: packageJson.version,
		title: "Product Catalog API"
	}
});

app.get("/scalar", Scalar({ theme: "elysiajs", url: "/doc" }));

app.route("v1", v1);

export default app;

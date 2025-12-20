import { pinoLogger } from "hono-pino";
import { notFound, onError, serveEmojiFavicon } from "stoker/middlewares";
import { requestId } from "hono/request-id";
import pino from "pino";
import pretty from "pino-pretty";
import { OpenAPIHono } from "@hono/zod-openapi";
import env from "../env.js";
import type { AppBindings } from "./types.js";
import { defaultHook } from "stoker/openapi";

export function createRouter() {
	return new OpenAPIHono<AppBindings>({ strict: false, defaultHook });
}

export default function createApp() {
	const app = createRouter();
	app.use(serveEmojiFavicon("🚀"));
	app.notFound(notFound);
	app.onError(onError);
	app.use(requestId());
	app.use(
		pinoLogger({
			pino: pino(
				{
					level: env.LOG_LEVEL
				},
				env.NODE_ENV === "development" ? pretty() : undefined
			)
		})
	);
	return app;
}

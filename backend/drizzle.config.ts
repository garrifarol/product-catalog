import { defineConfig } from "drizzle-kit";
import { env } from "process";
export default defineConfig({
	dialect: "postgresql",
	casing: "snake_case",
	schema: "./src/db/schemas",
	dbCredentials: {
		url: env.DATABASE_URL!
	},
	out: "./src/db/migrations"
});

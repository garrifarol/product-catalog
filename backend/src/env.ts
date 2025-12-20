import { z, ZodError } from "zod";
import { config } from "dotenv";
config();

const EnvSchema = z.object({
	NODE_ENV: z.enum(["development", "production"]).default("development"),
	PORT: z.coerce.number().default(6969),
	LOG_LEVEL: z
		.enum(["fatal", "error", "warn", "info", "debug", "trace"])
		.default("info"),
	DATABASE_URL: z.url().min(1, "DATABASE_URL is required")
});

export type Env = z.infer<typeof EnvSchema>;

let env: Env;

try {
	env = EnvSchema.parse(process.env);
} catch (e) {
	const error = e as ZodError;
	console.error("❌ Invalid environment variables", z.treeifyError(error));
	process.exit(0);
}

export default env;

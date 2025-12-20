import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import env from "../env.js";
import { schema } from "../db/schemas/index.ts";

console.log("NODE_ENV:", env.NODE_ENV);
console.log("DATABASE_URL:", env.DATABASE_URL?.slice(0, 21) + "...");

const pool = new Pool({
	connectionString: env.DATABASE_URL,
	ssl: env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false
});
const db = drizzle(pool, { schema, casing: "snake_case" });

export default db;

import { Pool } from "pg";
import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const db = drizzle(pool);

async function main() {
  console.log("Migrating database...");
  await migrate(db, { migrationsFolder: "./drizzle" });
  console.log("Migration Done!");
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
});

import { Pool } from "pg";

const db: Pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export default db;

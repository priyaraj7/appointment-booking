import pgPromise from "pg-promise";

// const db: Pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
// });

const pgp = pgPromise();
const db = pgp(process.env.DATABASE_URL);
export default db;

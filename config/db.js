import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const db = new pg.Client({
  user: "jose",
  host: "localhost",
  database: "Arcadia",
  password: "jose_arcadia",
  port: 5432,
});


db.connect();

export default db;

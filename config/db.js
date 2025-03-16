import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const db = new pg.Client({
 /* user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT || 5432,*/
  
  connectionString: process.env.DATABASE_URL, // URL de connexion Railway

});
console.log('DATABASE_URL:', process.env.DATABASE_URL);

const testConnection = async () => {
  try {
      const result = await db.query('SELECT NOW()');
      console.log('Connection à la base de données réussie:', result.rows[0]);
  } catch (err) {
      console.error('Erreur de connexion à la base de données:', err.message);
  }
};

testConnection();

db.connect();

export default db;
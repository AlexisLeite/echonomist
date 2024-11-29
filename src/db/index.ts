import { Pool } from 'pg';

// Configure PostgreSQL connection
export const pool = new Pool({
  user: process.env.DBUSER,
  host: process.env.DBHOST,
  database: process.env.DBNAME,
  password: process.env.DBPASS,
  port: parseInt(process.env.DBPORT!),
});


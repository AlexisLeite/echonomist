import { Pool } from 'pg';
import { loadEnvConfig } from '@next/env';

const projectDir = process.cwd();
loadEnvConfig(projectDir);

// Configure PostgreSQL connection
export const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});


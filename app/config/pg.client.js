import pg from 'pg';

const { Pool } = pg;

const client = new Pool({connectionString: process.env.PG_URL}) ;const pool = new Pool({
    connectionString: process.env.PG_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });

await client.connect();

export default client;

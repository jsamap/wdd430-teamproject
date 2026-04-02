import postgres from 'postgres';

// We centralize the db connection instance
const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export default sql;

import { pool } from '../db.js';

(async () => {
    try {
        await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
          id SERIAL PRIMARY KEY,
          email VARCHAR(100) NOT NULL,
          password VARCHAR(100) NOT NULL,
          refresh_token VARCHAR(200)
      )
    `);
        console.log('Users table created successfully');
    } catch (error) {
        console.error('Error creating users table');
    }
})();
import { pool } from '../db.js';

class UserRepository{
    async setRefreshToken(userId, refreshToken) {
        try {
            const query = 'UPDATE users SET refresh_token = $1 WHERE id = $2';
            await pool.query(query, [refreshToken, userId]);
            return true;
        } catch (error) {
            throw new Error(`Error in setRefreshToken: ${error.message}`);
        }
    };

    async getUserById(userId) {
        try {
            const query = 'SELECT * FROM users WHERE id = $1';
            const { rows } = await pool.query(query, [userId]);
            return rows[0];
        } catch (error) {
            throw new Error(`Error in getUserById: ${error.message}`);
        }
    };

    async getUserByEmail(email) {
        try {
            const query = 'SELECT * FROM users WHERE email = $1';
            const { rows } = await pool.query(query, [email]);
            return rows[0];
        } catch (error) {
            throw new Error(`Error in getUserByEmail: ${error.message}`);
        }
    };

    async createUser(user) {
        try {
            const { email, password } = user;
            const query = 'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *';
            const values = [email, password];
            const { rows } = await pool.query(query, values);
            return rows[0];
        } catch (error) {
            throw new Error(`Error in createUser: ${error.message}`);
        }
    };
}




export default new UserRepository()
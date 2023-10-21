import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, 'db.txt');


class Database {

    constructor() {
        this.userMap = new Map();
    }

    async #fileExists(filePath){
        try {
            await fs.access(filePath, fs.constants.F_OK);
            return true;
        } catch (error) {
            return false;
        }
    }

    async #initialize(attr='name') {
        try {
            if (await this.#fileExists(dbPath)) {
                const data = await fs.readFile(dbPath, 'utf8');
                const lines = data.trim().split('\n');
                this.userMap = new Map();
                lines.forEach(line => {
                    const user = JSON.parse(line);
                    this.userMap.set(user[attr], user);
                });
            } else {
                this.userMap = new Map();
                console.error('DB file not found.');
            }
        } catch (error) {
            throw error;
        }
    }

    async createUser(user) {
        try {
            await fs.appendFile(dbPath, JSON.stringify(user) + '\n');
        } catch (error) {
            console.error('Error writing user to the file:', error);
        }
    };

    async findAllUsers() {
        try {
            if (!await this.#fileExists(dbPath)) return [];
            const data = await fs.readFile(dbPath, 'utf8');
            const lines = data.trim().split('\n');
            const users = lines.map(line => JSON.parse(line));
            return users;
        } catch (error) {
            if (error.code === 'ENOENT') {
                return [];
            } else {
                throw error;
            }
        }
    };

    async findUser(value){
        try {
            await this.#initialize();
            const user = this.userMap.get(value);
            return user ? user : "User not found";
        } catch (error) {
            throw error;
        }
    }

    async dropDatabase(){
        try {
            if (!await this.#fileExists(dbPath)) return false;
            await fs.unlink(dbPath);
        } catch (error) {
            throw error;
        }
    }

}

export default new Database()
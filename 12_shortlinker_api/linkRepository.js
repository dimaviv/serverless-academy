import {pool} from "./db.js";

class LinkRepository{

    constructor() {
        this.#tryCreateLinksTable()
    }

   async #tryCreateLinksTable() {
        try {
            const query = `CREATE TABLE links (
                id SERIAL PRIMARY KEY,
                "fullLink" VARCHAR(511) NOT NULL,
                "shortId" VARCHAR(12) NOT NULL
            );`
           await pool.query(query)
        } catch (e) {console.log("Table 'links' wasn't created")}
    }

    async getFullLink(shortId) {
        try {
            const query = 'SELECT * FROM links WHERE "shortId" = $1';
            const { rows } = await pool.query(query, [shortId]);
            return rows[0];
        } catch (e) {
            throw new Error(`Error getting full link`);
        }
    };

    async createLink(createLinkDto) {
        try {
            const { fullLink, shortId } = createLinkDto;
            const query = 'INSERT INTO links ("fullLink", "shortId") VALUES ($1, $2) RETURNING *';
            const values = [fullLink, shortId];
            const { rows } = await pool.query(query, values);
            return rows[0];
        } catch (e) {
            throw new Error(`Error creating link`);
        }
    };
}

export default new LinkRepository()
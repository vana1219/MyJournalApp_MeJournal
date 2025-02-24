import 'dotenv/config';
import mysql from 'mysql2/promise';

class App {
    constructor() {
        this.pool = mysql.createPool({
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE
        });
    }

    async execute(sql, params = []) {
        const [results] = await this.pool.execute(sql, params);
        return results;
    }

    async get(sql, params = []) {
        const [rows] = await this.pool.execute(sql, params);
        return rows[0];
    }

    async all(sql, params = []) {
        const [rows] = await this.pool.execute(sql, params);
        if (!Array.isArray(rows)) {
            console.error("Unexpected result from MySQL:", rows);
        }
        return rows; // Ensure it always returns an array
    }
    
}

export default App;
import App from './app.js';
import queries from './queries.js';

class Repository {
    constructor(dao) {
        this.dao = dao;
    }

    // Use execute() for SELECT queries
    async selectUser() {
        const sql = queries.selectUser;  // SELECT * FROM users
        const rows = await this.dao.all(sql); // Make sure this returns an array
        return rows;
    }
    
    
    

    // Use execute() for SELECT queries with parameters

    async selectUserById(id) {
        const sql = queries.selectUserById;
        const rows = await this.dao.all(sql, [id]);
    
        console.log("Rows fetched from DB for ID:", id, rows); // Debugging log
    
        return rows.length > 0 ? rows[0] : null; // Return first user or null
    }
    
    // Use execute() for INSERT queries
    async insertUser(name, username, password, gender, DOB, email) {
        const sql = queries.insertUser;
        try {
            const result = await this.dao.execute(sql, [name, username, password, gender, DOB, email]);
            return result;
        } catch (err) {
            console.error('Error executing query:', err.message);
            throw err;
        }
    }
    // Use execute() for SELECT queries with parameters
    async selectUserByUsername(username) {
        const sql = queries.selectUserByUsername;
        try {
            const rows = await this.dao.execute(sql, [username]);
            return rows.length > 0 ? rows[0] : null;
        } catch (err) {
            console.error('Error executing query:', err.message);
            throw err;
        }
    }
    async insertNewNote(user_id,title,note_text){
        const sql=queries.newNote;
        try{
            const result=await this.dao.execute(sql, [user_id,title,note_text]);
            return result;

        } catch(err){
            console.error('Error executing query:', err.message);
            throw err;
        }
    }
}

export default Repository;

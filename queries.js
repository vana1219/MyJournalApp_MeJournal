const queries = {
    createUserTable: `CREATE TABLE IF NOT EXISTS UserInfo (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        gender VARCHAR(10) NOT NULL,
        DOB DATE NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`,
    createJournal: ` CREATE TABLE IF NOT EXISTS Journal (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        title VARCHAR(255),
        note_text TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES UserInfo(id) ON DELETE CASCADE
    );`,
        
    insertUser: `INSERT INTO UserInfo (name, username, password, gender, DOB, email) VALUES (?, ?, ?, ?, ?, ?)`,
    selectUser: `SELECT * FROM UserInfo`,
    selectUserById: `SELECT * FROM UserInfo WHERE id=?`,
    selectUserByUsername: `SELECT * FROM UserInfo WHERE username = ?`,
    newNote: `INSERT INTO Journal (user_id,title,note_text) VALUES(?, ?,?);`
};

export default queries;
import mysql from 'mysql2/promise';

import express from 'express';

const app = express();

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mycomputer',
    database: 'mydata'
});

app.get('/image/:name', (req, res) => {
    const name = req.params.name;
    connection.query("SELECT image FROM images WHERE name = ?", [name], (err, results) => {
        if (err) {
            res.status(500).send("Database error");
            return;
        }
        if (results.length === 0) {
            res.status(404).send("Image not found");
            return;
        }
        res.setHeader('Content-Type', 'image/png'); // Change based on the image format
        res.end(results[0].image);
    });
});

app.listen(3000, () => console.log("Server running on port 3000"));

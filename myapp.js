import path from 'path';
import { fileURLToPath } from 'url';
import App from './app.js';
import cors from 'cors';
import express from 'express';
import Repository from './Repository.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Initialize database connection
const dao = new App();
const repo = new Repository(dao);

// Serve the signup.html file
app.get("/signup", (req, res) => {
    res.sendFile(path.join(__dirname, 'Public', 'signup.html'));
});
// Serve the signup.html file
app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, 'Public', 'index.html'));
});
app.get("/journal", (req, res) => {
    res.sendFile(path.join(__dirname, 'Public', 'journal.html'));
});
// GET all users
app.get("/users", async (req, res) => {
    console.log('GET /users route hit'); // Debugging log
    try {
        const users = await repo.selectUser();
        console.log("Users fetched:", JSON.stringify(users, null, 2)); // Show all users
        res.json(users); // Send response
    } catch (err) {
        console.error("Error fetching users:", err);
        res.status(500).json({ error: err.message });
    }
});



// ✅ GET user by ID
app.get("/users/:id", async (req, res) => {
    console.log(`GET /users/${req.params.id} route hit`); // Debugging log
    try {
        const id = parseInt(req.params.id, 10); // Convert ID to number
        console.log(`Fetching user with ID: ${id}`); // Log ID

        const user = await repo.selectUserById(id);

        if (!user) {
            console.log(`User with ID ${id} not found`);
            return res.status(404).json({ error: "User not found" });
        }

        console.log('User fetched successfully:', user);
        res.json(user);
    } catch (err) {
        console.error("Error fetching user by ID:", err);
        res.status(500).json({ error: err.message });
    }
});


// ✅ POST create a new user
var userName="";
app.post("/users", async (req, res) => {
    try {
        const { name, username, password, gender, DOB, email } = req.body;

        // Basic validation
        if (!name || !username || !password || !gender || !DOB || !email) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const newUser = await repo.insertUser(name, username, password, gender, DOB, email);
        console.log("User inserted:", newUser);
        res.status(201).json({ message: "User created successfully", user: newUser });
    } catch (err) {
        console.error("Error inserting user:", err);
        res.status(500).json({ error: err.message });
    }
});


// ✅ POST login user
app.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        // Log the username and password received from the frontend
        console.log("Username received:", username);
        console.log("Password received:", password);

        // Basic validation
        if (!username || !password) {
            return res.status(400).json({ error: "Username and password are required" });
        }

        // Check if user exists and password matches
        const user = await repo.selectUserByUsername(username);
        console.log("User fetched from database:", user); // Log the user object

        if (!user || user.username !== username || user.password !== password) {
            console.log("Fail Login");
            return res.status(401).json({ error: "Invalid username or password" });
        }

        console.log("Login successful");
        res.status(200).json({ message: "Login successful", user });
    } catch (err) {
        console.error("Error logging in user:", err);
        res.status(500).json({ error: err.message });
    }
});

//Create new journal note:
app.post("/journal", async(req, res)=>{
    try{
        const{userId,title,note_text}=req.body;
        if(!title || !note_text) {
            return res.status(400).json({ error: "All fields are required" });
        }
        const newNote=await repo.insertNewNote(userId,title,note_text)
        console.log("New Note inserted: ", newNote);
        res.status(201).json({message: "New Note successfully created!"});

    }catch(err){
        console.error("Error inserting new note:", err);
        res.status(500).json({ error: err.message });
    }
});

// ✅ Serve signup.html for root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Public', 'index.html'));
});

// ✅ Serve static files (CSS, JS, images)
app.use(express.static(path.join(__dirname, 'Public')));

// ✅ Handle undefined routes (except API calls)
// app.get('*', (req, res, next) => {
//     if (req.path.startsWith('/users')) {
//         return next(); // Skip for API routes
//     }
//     res.sendFile(path.join(__dirname, 'Public', 'signup.html'));
// });

// ✅ Error handling middleware
app.use((err, req, res, next) => {
    console.error("Unhandled error:", err.stack);
    res.status(500).json({ error: "Something went wrong!" });
});

// ✅ Start server
app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});

// ✅ Test database connection
async function main() {
    console.log('Main function started');
    try {
        console.log('Fetching users from database...');
        const users = await repo.selectUser()
        ;
        console.log('Users fetched successfully:', users);
    } catch (err) {
        console.error('Database connection error:', err.message);
    }
}

main().catch(err => console.error('Unhandled error:', err));

import express from "express";
const router = express.Router();
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/auth.js'
import db from '../db/connection.js'


router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        // Hash the password before saving it to the database
        const hashedPassword = await bcrypt.hash(password, 10);
        let newDocument = {
            username: username,
            password: hashedPassword
        }
        let collection = await db.collection("admins");
        let result = await collection.insertOne(newDocument);
        res.status(201).json({ message: 'Registration successful', result });
    } catch (error) {
        res.status(500).json({ message: 'Registration failed', error });
    }
});

// Login endpoint
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        let collection = await db.collection("admins");
        let query = { username: username };
        let result = await collection.findOne(query);

        if (!result) res.send("Not found").status(404);
    
        const passwordMatch = await bcrypt.compare(password, result.password);
    
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Authentication failed try Again' });
        }
    
        // Create a JWT token
        const token = jwt.sign({ username: result.username }, process.env.ENCRYPT_SECRET_KEY, {
            expiresIn: '1h',
        });
    
        res.status(200).json({ token, username: result.username });
    } catch (error) {
        res.status(500).json({ error: 'Authentication failed try Again' });
    }
});

router.post('/logout', (req, res) => {
    res.clearCookie('token').send('Logged out successfully');
});

export default router;
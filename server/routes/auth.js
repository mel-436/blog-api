import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { validateUser, checkValidation } from "../middleware/validateUser.js";

const router = express.Router();

// POST /auth/register - Register a new user
router.post("/register", validateUser, checkValidation, async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        // Save the user to the database
        const savedUser = await newUser.save();
        res.status(201).json({ message: "User registered successfully", user: savedUser });
    } catch (err) {
        next(err); // Pass the error to the error handling middleware
    }
});

// POST /auth/login - Authenticate a user and return a JWT
router.post("/login", async (req, res, next) => {
    try {
        const { email, password } = req.body;

        //Find the user by email
        const user = await User.findOne({ email });
        if(!user){
            return(res.status(400).json({ message: "Invalid email or password" }));
        }
        
        // Compare the provided password with the hashed password in the database
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({ message: "Invalid email or password" });
        }
        
        // Create a JWT payload
        const payload = {
            id: user._id,
            username: user.username,
            email: user.email,
        };

        // Sign the JWT
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.json({ message: "Login successful", token });
    } catch (err) {
        next(err); // Pass the error to the error handling middleware
    }
});

export default router;
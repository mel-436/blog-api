// const mongoose = "mongoose";
import mongoose from 'mongoose';
import express from 'express';
import 'dotenv/config'

import postRoutes from './routes/posts.js'

const app = express();

const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/posts', postRoutes)

mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log("Connected to MongoDB");})
    .catch((err) => {
        console.error("Error connecting to MongoDB: ", err);
    });
    
// Define your routes here
//GET

app.get("/", (req, res) => {
    res.send("Welcome to the Blog API");
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
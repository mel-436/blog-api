// ./routes/posts.js
import express from "express";
import Post from "../models/Post.js";
import protect from '../middleware/protect.js'

import { validatePost, checkValidation } from '../middleware/validatePost.js';

const router = express.Router();


// GET all posts
router.get("/", async (req,res,next) => {
    // console.log("GET request received for all posts");
    try{
        const posts = await Post.find();
        res.status(200).json(posts);
    }catch(err){
        next(err); // Pass the error to the error handling middleware
    }
})

// GET a single post by ID
router.get("/:id", async (req, res, next) => {
    // console.log(`GET request received for post with ID: ${req.params.id}`);
    try{
        const post = await Post.findById(req.params.id);
        if(!post){
            return res.status(404).json({ message: "Post not found"})
        }
        res.status(200).json(post);
    }catch(err){
        next(err); // Pass the error to the error handling middleware
       
    }
})

// POST a new post
router.post("/", protect, validatePost, checkValidation, async (req, res, next) => {
    // console.log("POST request received to create a new post");
    try{
        const newPost = new Post(req.body);
        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    }catch(err){
        next(err); // Pass the error to the error handling middleware

    }
})

// PUT to update a post by ID
router.put("/:id", protect, validatePost, checkValidation, async (req, res, next) => {
    // console.log(`PUT request received to update post with ID: ${req.params.id}`);
    try{
        const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if(!updatedPost){
            res.status(404).json({ message: "Post not found" });
        }else{
            res.status(200).json(updatedPost);
        }
    }catch(err){
        next(err); // Pass the error to the error handling middleware

    }
})

// DELETE a post by ID
router.delete("/:id", protect, async (req, res, next) => {
    // console.log(`DELETE request received to delete post with ID: ${req.params.id}`);
    try{
        const deletedPost = await Post.findByIdAndDelete(req.params.id);
        if(!deletedPost){
            res.status(404).json({ message: "Post not found" });
        }else{
            res.status(200).json({ message: "Post deleted successfully" });
        }
    }catch(err){
        next(err); // Pass the error to the error handling middleware
        
        // console.error("Error deleting post: ", err);
    }
})

export default router;
// ./routes/posts.js
import express from "express";
import Post from "../models/Post.js";

const router = express.Router();

// GET all posts
router.get("/", async (req,res) => {
    // console.log("GET request received for all posts");
    try{
        const posts = await Post.find();
        res.status(200).json(posts);
    }catch(err){
        res.status(500).json({ message: "Error fetching postings" });
        // console.error("Error fetching postings: ",err);
    }
})

// GET a single post by ID
router.get("/:id", async (req, res) => {
    // console.log(`GET request received for post with ID: ${req.params.id}`);
    try{
        const post = await Post.findById(req.params.id);
        if(!post){
            return res.status(404).json({ message: "Post not found"})
        }
        res.status(200).json(post);
    }catch(err){
        res.status(500).json({ message: "Error fetching post" });
        // console.error("Error fetching post: ", err);
    }
})

// POST a new post
router.post("/", async (req, res) => {
    // console.log("POST request received to create a new post");
    try{
        const newPost = new Post(req.body);
        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    }catch(err){
        res.status(500).json({ message: "Error creating post" });
        // console.error("Error creating post: ", err);
    }
})

// PUT to update a post by ID
router.put("/:id", async (req, res) => {
    // console.log(`PUT request received to update post with ID: ${req.params.id}`);
    try{
        const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if(!updatedPost){
            res.status(404).json({ message: "Post not found" });
        }else{
            res.status(200).json(updatedPost);
        }
    }catch(err){
        res.status(500).json({ message: "Error updating post" });
        // console.error("Error updating post: ", err);
    }
})

// DELETE a post by ID
router.delete("/:id", async (req, res) => {
    // console.log(`DELETE request received to delete post with ID: ${req.params.id}`);
    try{
        const deletedPost = await Post.findByIdAndDelete(req.params.id);
        if(!deletedPost){
            res.status(404).json({ message: "Post not found" });
        }else{
            res.status(200).json({ message: "Post deleted successfully" });
        }
    }catch(err){
        res.status(500).json({ message: "Error deleting post" });
        // console.error("Error deleting post: ", err);
    }
})

export default router;
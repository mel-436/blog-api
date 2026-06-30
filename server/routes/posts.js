import express from "express";
import Post from "../models/Post.js";

const router = express.Router();

// GET all posts
router.get("/", async (req,res) => {
    console.log("GET request received for all posts");
})

// GET a single post by ID
router.get("/:id", async (req, res) => {
    console.log(`GET request received for post with ID: ${req.params.id}`);
})

// POST a new post
router.post("/", async (req, res) => {
    console.log("POST request received to create a new post");
})

// PUT to update a post by ID
router.put("/:id", async (req, res) => {
    console.log(`PUT request received to update post with ID: ${req.params.id}`);
})

// DELETE a post by ID
router.delete("/:id", async (req, res) => {
    console.log(`DELETE request received to delete post with ID: ${req.params.id}`);
})

export default router;
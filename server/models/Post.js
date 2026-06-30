// server/models/Post.js - imports
import mongoose from "mongoose";

// Define the Post schema
const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    tags: {
        type: [String],
        default: [],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Create the Post model
const Post = mongoose.model("Post", PostSchema);

// Export the Post model
export default Post;
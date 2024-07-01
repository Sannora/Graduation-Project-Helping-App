const Post = require('../models/postModel')
const User = require('../models/userModel')
const path = require('path')
const fs = require('fs')
const {v4: uuid} = require('uuid')
const HttpError = require('../models/errorModel')

//Create a Post
// POST: api/posts
const createPost = async (req, res, next)=>{
    try {
        let {title, category, description} = req.body;
        if(!title || !category || !description){
            return next(new HttpError("Missing fields.", 422))
        }
            const newPost = await Post.create({title, category, description, author: req.user.id})
            if(!newPost) {
                return next(new HttpError("Post couldn't be created.", 422))
            }
            // Find user and increase post count by 1
            const currentUser = await User.findById(req.user.id);
            const userPostCount = currentUser.posts + 1;
            await User.findByIdAndUpdate(req.user.id, {posts: userPostCount})

            res.status(201).json(newPost)
    } catch (error) {
        return next(new HttpError(error))
    }
}

//Get Single Post
// GET: api/posts/:id
const getPost = async (req, res, next)=>{
    try {
        const postId = req.params.id;
        const post = await Post.findById(postId);
        if(!post) {
            return next(new HttpError("Post not found.", 404))
        }
        res.status(200).json(post)
    } catch (error) {
        return next(new HttpError(error))
    }
}

//Get All Posts
// GET: api/posts
const getPosts = async (req, res, next)=>{
    try {
        const posts = await Post.find().sort({updateAt: -1})
        res.status(200).json(posts)
    } catch (error) {
        return next(new HttpError(error))
    }
}

//Get Post by Category
// GET: api/posts/categories/:category
const getCatPosts = async (req, res, next)=>{
    try {
        const {category} = req.params;
        const catPosts = await Post.find({category}).sort({createdAt: -1})
        res.status(200).json(catPosts)
    } catch (error) {
        return next(new HttpError(error))
    }
}

//Delete Post
// DELETE: api/posts/:id
const deletePost = async (req, res, next)=>{
    try {
        const postId = req.params.id;
        if(!postId){
            return next(new HttpError("Post unavailable.", 400))
        }
        const post = await Post.findById(postId);
        if(req.user.id == post.author){
            await Post.findByIdAndDelete(postId);
            //Find user and reduce post count by 1
            const currentUser = await User.findById(req.user.id);
            const userPostCount = currentUser?.posts - 1;
            await User.findByIdAndUpdate(req.user.id, {posts: userPostCount})
            res.json(`Post ${postId} deleted successfully.`)
        } else{
            return next(new HttpError("Post couldn't be deleted.", 403))
        }

    } catch (error) {
        return next(new HttpError(error))
    }
}

module.exports = {createPost, getPost, getPosts, getCatPosts, deletePost}
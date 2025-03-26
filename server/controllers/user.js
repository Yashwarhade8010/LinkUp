require('dotenv').config()
const Post = require('../models/post');
const User = require("../models/user");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})

const profile = async(req,res)=>{
    const userId = req.params.id;
    if(!userId){
        return res.status(404).json({message:"UserId not found"})
    }

    try{
        const user = await User.findById(userId).select("-password");
        if(!user){
            return res.status(404).json("No user found")
        }
        return res.status(200).json(user)
    }catch(err){
        console.log(err);
        return res.status(400).json({message:"Error Occured"})
    }
}

const handleFollow = async(req,res)=>{
    const {loggedInUserId} = req.body;
    const userId = req.params.id;

    if(!userId){
        return res.status(404).json({message:"No userId"})
    }
    try{
        const userToFollow = await User.findByIdAndUpdate(userId,{$addToSet:{followers:loggedInUserId}},{new:true});
        if(!userToFollow){
            return res.status(404).json({message:"No user found"})
        }
        return res.status(200).json({message:"Followed successfully"})

    }catch(err){
        console.log(err);
        return res.status(500).json({message:"Error occured"})
    }
}

const handleUnFollow = async(req,res)=>{
    const {loggedInUserId} = req.body;
    const userId = req.params.id;

    if(!userId){
        return res.status(404).json({message:"No userId"})
    }

    try{
        const userToUnfollow = await User.findByIdAndUpdate(userId,{$pull:{followers:loggedInUserId}},{new:true})
        if(!userToUnfollow){
            return res.status(404).json({message:"No user found"})
        }
        return res.status(200).json({message:"Unfollowed successfully"})
    }catch(err){
        return res.status(500)
    }
}

const handleCreatePost = async(req,res)=>{
    const {userId,caption} = req.body
    const image = req.file
    if(!userId || !caption || !image){
        return res.status(404).json({message:"All fields required"});
    }
    try{
        cloudinary.uploader.upload_stream(
            {folder:"uploads"},
            async(error,cloudinaryResult)=>{
                if(error) return res.status(500).json({message:"Failed to upload image"});
                const postUpload = await Post.create({
                    author:userId,
                    imageUrl:cloudinaryResult.secure_url,
                    caption:caption
                })

                await User.findByIdAndUpdate(userId,{$push:{posts:postUpload._id}});

                return res.status(201).json({message:"Image uploaded successfully"});
            }
        ).end(image.buffer);

    }catch(err){
        console.log(err)
        res.status(500).json({message:"Error occured"});
    }
}
module.exports = {
    profile,
    handleFollow,
    handleUnFollow,
    handleCreatePost,
}
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Avatar,
  Card,
  CardHeader,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Container,
  Stack,
} from "@mui/material";
import { Favorite, FavoriteBorder, ChatBubble, Share } from "@mui/icons-material";
import { axiosInstance } from "../axiosInstance";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [likes, setLikes] = useState({}); // Track likes locally

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const res = await axiosInstance.get("/feed",{headers:{Authorization:`Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2UyYTNmNTgzZGE1ZmEyYTlkNDdiODciLCJ1c2VybmFtZSI6Inlhc2hoIiwiZW1haWwiOiJ5YXNoaEBnbWFpbC5jb20iLCJpYXQiOjE3NDM3ODk4Mjh9.kLTCVtE-ixhdhEQn3DA1v-BL1hHIJl3_oAhLNbEjFl4`}}); // Replace with backend URL
        setPosts(res.data);
      } catch (err) {
        console.error("Failed to fetch feed", err);
      }
    };

    fetchFeed();
  }, []);

  const handleLike = (postId) => {
    setLikes((prev) => ({
      ...prev,
      [postId]: !prev[postId], // Toggle like state
    }));

    // Send like request to backend
    axios.post(`/posts/like/${postId}`).catch((err) => console.error(err));
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Stack spacing={2}>
        {posts.map((post) => (
          <Card key={post._id}>
            <CardHeader
              avatar={<Avatar src={post.author?.profilePic}>{post.author?.username[0]}</Avatar>}
              title={post.author?.username}
              subheader={new Date(post.createdAt).toLocaleString()}
            />
            {post.imageUrl && <CardMedia component="img" image={post.imageUrl} alt="Post image" />}
            <CardContent>
              <Typography variant="body1">{post.caption}</Typography>
            </CardContent>
            <CardContent sx={{ display: "flex", justifyContent: "space-between" }}>
              <IconButton onClick={() => handleLike(post._id)}>
                {likes[post._id] ? <Favorite color="error" /> : <FavoriteBorder />}
              </IconButton>
              <Typography>{post.likes.length} Likes</Typography>
              <IconButton>
                <ChatBubble />
              </IconButton>
              <Typography>{post.comments.length} Comments</Typography>
              <IconButton>
                <Share />
              </IconButton>
              <Typography>{post.shares} Shares</Typography>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Container>
  );
};

export default Feed;
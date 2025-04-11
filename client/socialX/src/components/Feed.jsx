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

import { useNavigate } from "react-router-dom";
import useUserStore from "../stores/userStore";
import useLoadStore from "../stores/useStore";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [likes, setLikes] = useState({}); // Track likes locally
  const user = useUserStore((state) => state.user);
  const userToken = useUserStore((state) => state.token);
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);
  const setLoading = useLoadStore.getState().setLoading;

  useEffect(() => {
    const fetchFeed = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get("/feed", {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });
        setPosts(res.data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.error("Failed to fetch feed", err);
      }
    };

    fetchFeed();
  }, []);

  const handleLike = async (postId) => {
    try {
      const response = await axiosInstance.post(
        `/post/like/${postId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Stack spacing={2}>
          {posts.map((post) => (
            <Card key={post._id}>
              <CardHeader
                avatar={
                  <Avatar src={post.author?.profilePic}>
                    {post.author?.username[0]}
                  </Avatar>
                }
                title={post.author?.username}
                subheader={new Date(post.createdAt).toLocaleString()}
              />
              {post.imageUrl && (
                <CardMedia
                  component="img"
                  image={post.imageUrl}
                  alt="Post image"
                />
              )}
              <CardContent>
                <Typography variant="body1">{post.caption}</Typography>
              </CardContent>
              <CardContent
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <IconButton onClick={() => handleLike(post._id)}>
                  {post.likes.includes()}
                </IconButton>
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
    </>
  );
};

export default Feed;
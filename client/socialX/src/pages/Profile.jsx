import React, { useEffect, useState } from 'react';
import { axiosInstance } from "../axiosInstance";
import { Link, useParams } from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Divider,
  Typography,
  Grid
} from "@mui/material";
import { Edit } from "@mui/icons-material";

import useUserStore from "../stores/userStore";
import useLoadStore from "../stores/useStore";
import Navbar from "../components/Navbar";


const Profile = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const user = useUserStore((state) => state.user);
  const setLoading = useLoadStore.getState().setLoading;

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(`/profile/${user._id}`);

        setProfile(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching profile:", error);
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id]);

  if (!profile) return <h2>Profile not found</h2>;

  return (
    <>
      <Navbar />
      <Container maxWidth="md">
        <Card sx={{ p: 3, textAlign: "center", borderRadius: 4, boxShadow: 3 }}>
          {/* Profile Picture */}
          <Avatar
            src={profile.profilePic}
            alt={profile.username}
            sx={{
              width: 120,
              height: 120,
              margin: "auto",
              border: "3px solid #1976d2",
            }}
          />

          {/* User Details */}
          <CardContent>
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              {profile.username}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {profile.email}
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              {profile.bio || "No bio available."}
            </Typography>

            {/* Followers & Following */}
            <Box
              sx={{ display: "flex", justifyContent: "center", gap: 3, mt: 2 }}
            >
              <Typography variant="body1">
                <strong>{profile.followers.length}</strong> Followers
              </Typography>
              <Typography variant="body1">
                <strong>{profile.following.length}</strong> Following
              </Typography>
            </Box>

            <Divider sx={{ my: 2 }} />

            {/* Edit Profile Button */}
            <Link to={"/Edit"}>
              <Button
                variant="contained"
                startIcon={<Edit />}
                sx={{ mt: 1, borderRadius: 2, px: 3 }}
              >
                Edit Profile
              </Button>
            </Link>
          </CardContent>
        </Card>
        <Typography
          variant="h5"
          sx={{ mt: 4, mb: 2, fontWeight: "bold", textAlign: "center" }}
        >
          Posts
        </Typography>
        <Divider sx={{ mb: 2 }} />

        {profile.posts.length === 0 ? (
          <Typography variant="body1" align="center" color="textSecondary">
            No posts available
          </Typography>
        ) : (
          <Grid
            container
            spacing={3}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            {profile.posts.map((post) => (
              <Grid item xs={12} sm={5} md={3} key={post._id}>
                <Card sx={{ borderRadius: 3, boxShadow: 2 }}>
                  <img
                    src={post.imageUrl}
                    alt="Post"
                    style={{
                      width: "190px",
                      height: "200px",
                      objectFit: "cover",
                      borderTopLeftRadius: "12px",
                      borderTopRightRadius: "12px",
                    }}
                  />
                  <CardContent>
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: "bold",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {post.caption}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </>
  );
};

export default Profile;
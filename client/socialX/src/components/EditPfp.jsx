import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import Navbar from "./Navbar";
import useUserStore from "../stores/userStore";
import { axiosInstance } from "../axiosInstance";
import toast from "react-hot-toast";

const EditPfp = () => {
  const [profile, setProfile] = useState({

    bio: "Software Engineer passionate about React & Web Development.",
  });
  const [image, setImage] = useState(null);
  const [previewImg,setPreviewImg] = useState(null);
  const user = useUserStore((state)=>state.user)
  useEffect(()=>{
    const fetchProfile = async()=>{
        
        try{
            const resp = await axiosInstance.get(`/profile/${user._id}`)
        setProfile({
            profilePic:resp.data.profilePic,
 
            bio:resp.data.bio
        })
        }catch(err){
            return toast.error("Error occured")
        }
    }
    fetchProfile()
  },[])

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
      setPreviewImg(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSave = async() => {
    const formData = new FormData();
    formData.append("image",image);
    formData.append("profile",profile);
    formData.append("userId",user._id);
    try{
      const resp = await axiosInstance.post("/profile/edit",formData,{headers: { "Content-Type": "multipart/form-data"}})

      if(!resp){
        return toast.error(resp.data.message);
      }
    }catch(err){
      return toast.error("Error occured")
    }
  };

  return (
    <>
    <Navbar/>
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "#f5f5f5",
        p: 2,
      }}
    >
      <Card sx={{ maxWidth: 600, width: "100%", p: 3, borderRadius: 3, boxShadow: 4 }}>
        <CardContent>
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Avatar
                        src={profile.profilePic}
                        alt={profile.username}
                        sx={{
                          width: 120,
                          height: 120,
                          margin: "auto",
                          border: "1px solid #1976d2",
                        }}
                      />
            <label htmlFor="icon-button-file">
              <input
                accept="image/*"
                id="icon-button-file"
                type="file"
                style={{ display: "none" }}
                onChange={handleImageChange}
              />
              <IconButton color="primary" component="span">
                <PhotoCamera />
              </IconButton>
            </label>
            <Typography variant="h6" sx={{ mt: 1 }}>
              Edit Profile
            </Typography>
          </Box>

          <Grid container spacing={3} sx={{ mt: 4 }} style={{display:"block"}}>
     
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={2}
                label="Bio"
                name="bio"
                value={profile.bio || "No bio available."}
                onChange={handleChange}
              />
            </Grid>
          </Grid>

          <Box sx={{ display: "flex", justifyContent: "space-around", mt: 3, gap: 2 }}>
          <Button variant="outlined" color="secondary"  >
              Cancel
            </Button>
            <Button variant="contained" color="primary" onClick={handleSave}>
              Save Changes
            </Button>
          </Box>
         
        </CardContent>
      </Card>
    </Box>
    </>
  );
};

export default EditPfp;
import React, { useState } from 'react';
import {
  Container,
  Card,
  CardContent,
  CardMedia,
  TextField,
  Button,
  Typography,
  Snackbar,
  Alert,
  Stack,
  Divider,
} from '@mui/material';
import Navbar from '../components/Navbar';
import { axiosInstance } from '../axiosInstance';
import useUserStore from '../stores/userStore';
import toast from 'react-hot-toast';
import useLoadStore from '../stores/useStore';



const PostPage = () => {

  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [preview, setPreview] = useState(null);
 
  const setLoading = useLoadStore.getState().setLoading;
  const token = useUserStore((state)=>state.token)



  const handleSubmit = async(e) => {
    e.preventDefault();
    setLoading(true)
    const formData = new FormData();
    
    formData.append('caption', content);
    formData.append('image', image);
    if (!content.trim()) return;

    console.log(image)
    try{
        await axiosInstance.post(("/post/create"),formData,{headers:{Authorization:`Bearer ${token}`}});
        setLoading(false)
        setContent('');
        setImage(null);
        setPreview(null)
        setSnackbarOpen(true);
    }catch(err){
        console.log(err)
        setLoading(false)
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <>
    <Navbar/>
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Card sx={{ borderRadius: 4, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Create a New Post
          </Typography>

          <Divider sx={{ my: 2 }} />

          <form onSubmit={handleSubmit}>
            <Stack spacing={3}>

              <Button variant="outlined" component="label">
                Upload Image
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </Button>

              {preview && (
                <CardMedia
                  component="img"
                  image={preview}
                  alt="Selected"
                  sx={{
                    maxHeight: 500,
                    width: '100%',
                    objectFit: 'cover',
                    borderRadius: 2,
                    mt: 1,
                  }}
                />
              )}

              <TextField
                label="Write your description..."
                variant="outlined"
                multiline
                rows={6}
                fullWidth
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />


              <Button type="submit" variant="contained" size="large">
                Submit Post
              </Button>
            </Stack>
          </form>
        </CardContent>
      </Card>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert severity="success" onClose={() => setSnackbarOpen(false)}>
          Post added successfully!
        </Alert>
      </Snackbar>
    </Container>
    </>
  );
};

export default PostPage;
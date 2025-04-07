import { useState } from 'react'
import * as React from "react";
import Button from "@mui/material/Button";
import Home from "./pages/Home";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./components/Login";
import Singup from "./components/Singup";
import Profile from "./pages/Profile";
import toast, { Toaster } from "react-hot-toast";
import DashBoard from "./pages/DashBoard";
import Feed from "./components/Feed";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<Singup />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/dashboard" element={<Feed />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App

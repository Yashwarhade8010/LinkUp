import { useState } from 'react'
import * as React from "react";

import Home from "./pages/Home";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./components/Login";
import Singup from "./components/Singup";
import Profile from "./pages/Profile";
import toast, { Toaster } from "react-hot-toast";
import DashBoard from "./pages/DashBoard";

import FullScreenLoader from "./components/FullScreenLoader";
import useUserStore from "./stores/userStore";
import ProtectedRoutes from "./config/ProtectedRoutes";
import PostPage from "./pages/PostPage";
import EditPfp from "./components/EditPfp";

function App() {
  return (
    <>
      <BrowserRouter>
        <FullScreenLoader />
        <Routes>
          <Route path="/signin" element={<Login />} />
          <Route path="/signup" element={<Singup />} />
          <Route path="/" element={<Home />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoutes>
                <Profile />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoutes>
                <DashBoard />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/addpost"
            element={
              <ProtectedRoutes>
                <PostPage />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/Edit"
            element={
              <ProtectedRoutes>
                <EditPfp />
              </ProtectedRoutes>
            }
          />
        </Routes>

        <Toaster />
      </BrowserRouter>
    </>
  );
}

export default App

import React, { useEffect, useState } from "react";
import { Menu as MenuIcon } from "@mui/icons-material";
import { IconButton, Drawer, Box, List, ListItem, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";
import useUserStore from "../stores/userStore";

const MobileMenu = ({showMenu,onClose}) => {
  const [open, setOpen] = useState(false);
  const logout = useUserStore((state)=>state.logOut)
  useEffect(()=>{
    setOpen(showMenu);
  },[showMenu])
  return (
    <>
      {/* 👇 Drawer Component */}
      <Drawer anchor="left" open={open} onClose={onClose}>
        <Box sx={{ width: 250, p: 2 }}>
          <List >

            <Link to={"/dashboard"} style={{ textDecoration: "none", color: "inherit" }}>
            <ListItem button="true">
              <ListItemText primary="Home" />
            </ListItem>
            </Link>

            <ListItem button="true">
              <Link style={{ textDecoration: "none", color: "inherit" }}><ListItemText primary="Messages" /></Link>
            </ListItem>

            <ListItem button="true">
              <ListItemText primary="Notifications" />
            </ListItem>

            <ListItem onClick={logout} button="true">
              <ListItemText primary="Logout" />
            </ListItem>

            <Link to={"/profile"} style={{ textDecoration: "none", color: "inherit" }}>
            <ListItem button="true">
              <ListItemText primary="Profile" />
            </ListItem>
            </Link>
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default MobileMenu;
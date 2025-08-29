import React, { useEffect, useState } from "react";
import { Menu as MenuIcon } from "@mui/icons-material";
import { IconButton, Drawer, Box, List, ListItem, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";
import useUserStore from "../stores/userStore";

const MobileMenu = ({ showMenu, onClose, logOut, setDialog }) => {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setOpen(showMenu);
  }, [showMenu]);
  return (
    <>
      {/* 👇 Drawer Component */}
      <Drawer anchor="left" open={open} onClose={onClose}>
        <Box sx={{ width: 250, p: 2 }}>
          <List>
            <Link
              to={"/profile"}
              style={{
                textDecoration: "none",
                color: "inherit",
                cursor: "pointer",
              }}
            >
              <ListItem button="true">
                <ListItemText primary="Profile" />
              </ListItem>
            </Link>

            <Link
              to={"/dashboard"}
              style={{
                textDecoration: "none",
                color: "inherit",
                cursor: "pointer",
              }}
            >
              <ListItem button="true">
                <ListItemText primary="Home" />
              </ListItem>
            </Link>

            <ListItem button="true">
              <Link
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  cursor: "pointer",
                }}
              >
                <ListItemText primary="Messages" />
              </Link>
            </ListItem>

            <ListItem sx={{ cursor: "pointer" }} button="true">
              <ListItemText primary="Notifications" />
            </ListItem>

            <ListItem
              sx={{ cursor: "pointer" }}
              onClick={() => setDialog(true)}
              button="true"
            >
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default MobileMenu;
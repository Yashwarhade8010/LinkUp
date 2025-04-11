import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  InputBase,
  Box,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Badge,
} from "@mui/material";
import {
  Search,
  Home,
  Mail,
  Notifications,
  Menu as MenuIcon,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import useUserStore from "../stores/userStore";
import { Link } from "react-router-dom";
import LinkUpLogo from "./Logo";
import MobileMenu from "./MobileMenu";

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});

const SearchBar = styled("div")(({ theme }) => ({
  backgroundColor: "#f1f1f1",
  padding: "0 10px",
  borderRadius: theme.shape.borderRadius,
  display: "flex",
  alignItems: "center",
  width: "40%",
}));

const Icons = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "20px",
  alignItems: "center",
}));

const Navbar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [showMenu,setShowMenu] = useState(false)
  const logOut = useUserStore((state)=>state.logOut)
  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const userLogOut = () => {
      logOut();
      navigate("/signin");
    };
 

  return (
    <AppBar position="sticky" color="primary">
      <StyledToolbar>
        <Typography variant="h6" sx={{  display: { xs: "none", sm: "block" } }}>
          LinkUp
        </Typography>
        <IconButton onClick={()=>setShowMenu(!showMenu)}>
        <MenuIcon sx={{ display: { xs: "block", sm: "none" } }} />
        </IconButton>
        <Typography variant="h6" sx={{  display: { xs: "block", sm: "none" } }}>
          LinkUp
        </Typography>
        <MobileMenu showMenu={showMenu} onClose={() => setShowMenu(false)}/>
        <SearchBar>
          <Search sx={{ marginRight: "10px" }} />
          <InputBase placeholder="Search..." fullWidth />
        </SearchBar>
        <Icons sx={{ display: { xs: "none",sm:"flex" } }}>
        <Link style={{textDecoration:"none",color:"inherit"}} to={"/dashboard"}>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="error">
              <Home />
            </Badge>
          </IconButton>
          </Link>
          <IconButton color="inherit">
            <Badge badgeContent={2} color="error">
              <Mail />
            </Badge>
          </IconButton>
          <IconButton color="inherit">
            <Badge badgeContent={10} color="error">
              <Notifications />
            </Badge>
          </IconButton>
          <Avatar
            src="https://i.pravatar.cc/150?img=47"
            sx={{ width: 30, height: 30, cursor: "pointer" }}
            onClick={handleAvatarClick}
          />
        </Icons>
      </StyledToolbar>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Link style={{textDecoration:"none",color:"inherit"}} to={"/profile"}><MenuItem >Profile</MenuItem></Link>
        <MenuItem onClick={handleCloseMenu}>My Account</MenuItem>
        <MenuItem onClick={userLogOut}>Logout</MenuItem>
      </Menu>
    </AppBar>
  );
};

export default Navbar;
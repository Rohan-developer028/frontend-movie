import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  IconButton,
  Avatar,
} from "@mui/material";
import MovieIcon from "@mui/icons-material/Movie";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const user=JSON.parse(localStorage.getItem("user"))
  const nav=useNavigate()
  const handleLogout = () => {    
  localStorage.removeItem("admin-token"); // or "authToken" 
  localStorage.removeItem("user");        // optional user data 
  nav("/login"); // redirect 
};

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        background: "rgba(255,255,255,0.85)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(0,0,0,0.08)",
        color: "#000",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Left: Logo */}
        <Box onClick={()=>nav("/")} sx={{ display: "flex", alignItems: "center", gap: 1, }} >
          <MovieIcon sx={{ color: "#6366f1", fontSize: 28 }} />
          <Typography fontWeight={700} fontSize={20}>
            MovieHub
          </Typography>
        </Box>

        {/* Right: Actions */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Button
            sx={{
              textTransform: "none",
              fontWeight: 600,
              color: "#374151",
            }}
          >
            {user?.name ? `Welcome ${user.name}`:""}
          </Button>

          {
            user?.name ?
              <IconButton onClick={()=>handleLogout()}>
            <LogoutIcon />
          </IconButton>:
            <IconButton onClick={()=>handleLogout()}>
            <LoginIcon />
          </IconButton>
          }
        
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

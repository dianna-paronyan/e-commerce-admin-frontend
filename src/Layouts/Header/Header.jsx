import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useLocalStorage from "../../hooks/useLocalStorage";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { ImageListItem } from "@mui/material";
import Link from "../../components/Link";

const settings = ["Profile", "Account", "Dashboard", "Logout"];

function Header() {
  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = useState(null);
  const { user } = useLocalStorage();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  function logOut() {
    localStorage.removeItem("user");
    navigate("/");
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        style={{ padding: "5px", backgroundColor: "#9FBDBC" }}
      >
        <Toolbar>
          <ImageListItem>
            <Link to="/admin">
              <img style={{ width: "105px" }} src="../../../glass-logo.png" />
            </Link>
          </ImageListItem>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          ></Typography>
          <Box
            sx={{
              flexGrow: 0,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "5px",
            }}
          >
            <Typography color="#333">{user?.userName}</Typography>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Avatar" src="" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting}
                  onClick={setting === "Logout" ? logOut : handleCloseUserMenu}
                >
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;

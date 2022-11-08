import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import SiteLabel from "./subcomponents/SiteLabel";
import { useSelector, useDispatch } from "react-redux";
import { isAuthenticated, logout } from "../reducers/adminSlice";
import { useNavigate } from "react-router-dom";

const pages = ["Dashboard"];

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const isAuth = useSelector(isAuthenticated);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const logoutClickHandler = () => {
    dispatch(logout());
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <SiteLabel
            size="h6"
            href="/"
            sx={{ display: { xs: "none", md: "flex" } }}
          />

          {/* Mobile Navbar start */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {isAuth &&
                pages.map((page) => (
                  <MenuItem key={page} onClick={() => navigate(`/${page.toLowerCase()}`)}>
                    {/* <Link to={`/${page}`}> */}
                      <Typography textAlign="center">{page}</Typography>
                    {/* </Link> */}
                  </MenuItem>
                ))}
            </Menu>
          </Box>

          <SiteLabel
            size="h5"
            href=""
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
          />
          {/* Mobile Navbar end */}

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {isAuth &&
              pages.map((page) => (
                // <Link to={`/${page}`}>
                  <Button
                    key={page}
                    onClick={() => navigate(`/${page.toLowerCase()}`)}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    {page}
                  </Button>
                // </Link>
              ))}
          </Box>

          {isAuth && (
            <Button
              variant="contained"
              color="success"
              onClick={logoutClickHandler}
            >
              Logout
            </Button>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;

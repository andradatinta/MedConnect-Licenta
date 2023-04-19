import React from "react";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { Link as MuiLink } from "@mui/material";
import { NavigationAccount, NavigationLinks } from "./NavBar.styles";

function NavBar() {
  return (
    <>
      <AppBar position="sticky" sx={{ backgroundColor: "#ffffff" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="logo"
            component={RouterLink}
            to="/"
          >
            <img
              src="/graphics/medconnect-logo-blue-cropped.svg"
              alt="Logo"
              height="25"
            />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <NavigationLinks>
            <MuiLink component={RouterLink} to="/">
              <Typography variant="p">Despre Noi</Typography>
            </MuiLink>
            <MuiLink component={RouterLink} to="/">
              <Typography variant="p">Membru CMR</Typography>
            </MuiLink>
            <MuiLink component={RouterLink} to="/calendar">
              <Typography variant="p">Calendar</Typography>
            </MuiLink>
          </NavigationLinks>
          <NavigationAccount>
            <MuiLink component={RouterLink} to="/login" sx={{ ml: 2 }}>
              <Typography variant="p" color="primary">
                Login
              </Typography>
            </MuiLink>
            <Button
              variant="contained"
              color="secondary"
              component={RouterLink}
              to="/signup"
            >
              <Typography variant="p">Înregistrează-te</Typography>
            </Button>
          </NavigationAccount>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default NavBar;

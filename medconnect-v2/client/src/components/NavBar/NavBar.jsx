import React from "react";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import {
  NavBarButton,
  NavigationAccount,
  NavigationLinks,
} from "./NavBar.styles";

function NavBar() {
  return (
    <>
      <AppBar position="sticky" sx={{ backgroundColor: "#ffffff" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="logo"
            href="http://localhost:3000/test"
          >
            <img
              src="/graphics/medconnect-logo-blue-cropped.svg"
              alt="Logo"
              height="25"
            />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <NavigationLinks>
            <NavBarButton color="inherit">
              <Typography variant="p">Despre Noi</Typography>
            </NavBarButton>
            <NavBarButton color="inherit">
              <Typography variant="p">Membru CMR</Typography>
            </NavBarButton>
            <NavBarButton color="inherit">
              <Typography variant="p">Calendar</Typography>
            </NavBarButton>
          </NavigationLinks>
          <NavigationAccount>
            <NavBarButton color="inherit" sx={{ ml: 2 }}>
              <Typography variant="p">Login</Typography>
            </NavBarButton>
            <Button
              variant="contained"
              color="secondary"
              href="http://localhost:3000/signup"
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

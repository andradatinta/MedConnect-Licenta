import React, { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Drawer, Box, Typography, Button, IconButton } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { Link as MuiLink } from "@mui/material";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import { NavigationAccount, NavigationLinks } from "./NavBar.styles";

function DrawerNavBar() {
  const { logout, user } = useContext(AuthContext);
  const accountTypeRoute =
    user && user.type ? (user.type === "doctor" ? "/doctor" : "/cmr") : "/";

  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <IconButton onClick={() => setDrawerOpen(true)}>
        <MenuIcon color="primary" />
      </IconButton>
      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box
          sx={{
            width: "250px",
            p: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
          }}
        >
          <img
            src="/graphics/medconnect-logo-blue-cropped.svg"
            alt="Logo"
            height="20"
            style={{ alignSelf: "center", marginBottom: "2rem" }}
          />
          <NavigationLinks sx={{ flexDirection: "column", gap: "20px" }}>
            <MuiLink component={RouterLink} to="/">
              <Typography variant="p">Despre Noi</Typography>
            </MuiLink>
            <MuiLink component={RouterLink} to="/signupcmr">
              <Typography variant="p">Membru CMR</Typography>
            </MuiLink>
            <MuiLink component={RouterLink} to="/calendar">
              <Typography variant="p">Calendar</Typography>
            </MuiLink>
          </NavigationLinks>
          <NavigationAccount>
            {!user ? (
              <>
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
                  <Typography
                    variant="p"
                    sx={{
                      fontSize: "14px !important",
                    }}
                  >
                    Înregistrează-te
                  </Typography>
                </Button>
              </>
            ) : (
              user && (
                <>
                  <MuiLink
                    component={RouterLink}
                    to="/"
                    onClick={logout}
                    sx={{ ml: 2 }}
                  >
                    <Typography variant="p" color="primary">
                      Logout
                    </Typography>
                  </MuiLink>
                  <MuiLink component={RouterLink} to={accountTypeRoute}>
                    <AccountCircleOutlinedIcon sx={{ marginRight: "0.3rem" }} />
                    <Typography variant="p">Contul meu</Typography>
                  </MuiLink>
                </>
              )
            )}
          </NavigationAccount>
        </Box>
      </Drawer>
    </>
  );
}

export default DrawerNavBar;

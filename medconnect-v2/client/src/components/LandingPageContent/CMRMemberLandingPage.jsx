import React from "react";
import { WideButton } from "./LandingPageContent.styles";
import { Typography, Grid } from "@mui/material";
import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { Link as RouterLink } from "react-router-dom";

function CMRMemberLandingPage() {
  const theme = useTheme();
  const isScreenSmall = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        sx={{ marginTop: "3rem" }}
      >
        <Box sx={{ textAlign: "center" }}>
          <Typography
            variant="h2"
            sx={{
              marginBottom: "0.5rem",
              fontSize: isScreenSmall ? "1.5rem" : "1.87rem",
            }}
          >
            Ești membru CMR?
          </Typography>
          <Typography
            variant="h2"
            sx={{ fontSize: isScreenSmall ? "1.5rem" : "1.87rem" }}
          >
            Facilitează-ți munca cu MedConnect!
          </Typography>
        </Box>
      </Grid>

      <Grid
        container
        spacing={2}
        direction="row"
        justifyContent="center"
        alignItems="center"
        sx={{ marginTop: "0.5rem" }}
      >
        <Grid item xs={6} sm={3}>
          <img
            src="/graphics/landing-page-2.svg"
            alt="Your illustration"
            style={{ width: "100%", height: "auto" }}
          />
        </Grid>
        <Grid item xs={12} sm={5} sx={{ textAlign: "center" }}>
          <Typography
            variant="h3"
            sx={{
              fontSize: isScreenSmall ? "1.25rem" : "1.56rem",
              marginRight: isScreenSmall ? "0.5rem" : 0,
              marginLeft: isScreenSmall ? "0.5rem" : 0,
            }}
          >
            Creează-ți acum un cont pentru a valida punctajele medicilor
            eficient!
          </Typography>
          <WideButton
            component={RouterLink}
            to="/signupcmr"
            sx={{ marginTop: "2rem", marginBottom: isScreenSmall ? "4rem" : 0 }}
          >
            <Typography variant="p">Înregistrează-te ca membru CMR</Typography>
          </WideButton>
        </Grid>
      </Grid>
    </>
  );
}

export default CMRMemberLandingPage;

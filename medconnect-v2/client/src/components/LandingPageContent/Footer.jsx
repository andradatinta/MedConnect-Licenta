import React from "react";
import { Box, Grid, Typography, Container } from "@mui/material";
import { FooterLinkButton } from "./LandingPageContent.styles";

function Footer() {
  return (
    <Box
      sx={{ backgroundColor: "#03469494", padding: "2rem", marginTop: "auto" }}
    >
      <Grid
        container
        justifyContent="space-between"
        alignItems="flex-start"
        spacing={2}
      >
        <Grid item>
          <img
            src="/graphics/medconnect-logo-white.svg"
            alt="Logo"
            style={{
              width: "150px",
              height: "auto",
            }}
          />
          <Box
            sx={{
              marginTop: "1rem",
              display: "flex",
              gap: "2rem",
            }}
          >
            <FooterLinkButton href="/test">
              <Typography variant="body1" color="white">
                Despre Noi
              </Typography>
            </FooterLinkButton>
            <FooterLinkButton>
              <Typography variant="body1" color="white">
                Membru CMR
              </Typography>
            </FooterLinkButton>
            <FooterLinkButton>
              <Typography variant="body1" color="white">
                Calendar
              </Typography>
            </FooterLinkButton>
          </Box>
        </Grid>
        <Grid item alignSelf="end">
          <Container sx={{ display: "flex", gap: "0.5rem" }}>
            <Typography
              variant="body1"
              color="white"
              sx={{ textTransform: "uppercase" }}
            >
              Contact:
            </Typography>
            <Typography
              variant="body1"
              color="white"
              sx={{ display: "inline" }}
            >
              contact@medconnect.ro
            </Typography>
          </Container>
        </Grid>
      </Grid>
      <Box
        sx={{
          borderTop: "1px solid white",
          marginTop: "2rem",
          paddingTop: "1rem",
        }}
      >
        <Typography variant="body2" color="white">
          &copy; {new Date().getFullYear()} MedConnect
        </Typography>
      </Box>
    </Box>
  );
}

export default Footer;

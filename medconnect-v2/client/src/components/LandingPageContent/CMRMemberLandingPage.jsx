import React from "react";
import { CustomCentered, WideButton } from "./LandingPageContent.styles";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

function CMRMemberLandingPage() {
  return (
    <>
      <CustomCentered>
        <Box sx={{ textAlign: "center" }}>
          <Typography
            variant="h2"
            sx={{ marginBottom: "0.5rem", marginTop: "3rem" }}
          >
            Ești membru CMR?
          </Typography>
          <Typography variant="h2">
            Facilitează-ți munca cu MedConnect!
          </Typography>
        </Box>
      </CustomCentered>

      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "3rem",
        }}
      >
        <Box sx={{ width: "30%" }}>
          <img
            src="/graphics/landing-page-2.svg"
            alt="Your illustration"
            style={{ width: "100%", height: "auto" }}
          />
        </Box>
        <Box sx={{ width: "50%", textAlign: "center" }}>
          <Typography variant="h3">
            Creează-ți acum un cont pentru a valida punctajele medicilor
            eficient!
          </Typography>
          <WideButton href="/signupcmr" sx={{ marginTop: "2rem" }}>
            <Typography variant="p">Înregistrează-te ca membru CMR</Typography>
          </WideButton>
        </Box>
      </Container>
    </>
  );
}

export default CMRMemberLandingPage;

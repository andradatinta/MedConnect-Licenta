import React from "react";
import { Grid, Typography, Box } from "@mui/material";
import Button from "@mui/material/Button";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import { MainContainer, CustomCentered } from "./LandingPageContent.styles";
import { ImageBox } from "../SignUp/SignUp.styles";

function LandingPageContent() {
  return (
    <>
      <MainContainer>
        <Grid container spacing={1} maxWidth="xl">
          <Grid
            item
            xs={12}
            md={6}
            display="flex"
            justifyContent="center"
            flexDirection="column"
          >
            <Box sx={{ width: "90%", paddingTop: { xs: "4rem", md: "2rem" } }}>
              <Typography variant="h1" sx={{ marginBottom: "2rem" }}>
                Ajutorul tău principal în gestionarea creditelor EMC
              </Typography>

              <Typography variant="h3" sx={{ marginBottom: "2rem" }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incidid ut labore et dolore magna aliqua. Ut enim
                ad min.
              </Typography>
            </Box>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              href="http://localhost:3000/test"
            >
              <Typography variant="p">Lorem ipsum</Typography>
            </Button>
          </Grid>
          <Grid
            item
            xs={6}
            md={6}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <ImageBox>
              <img
                src="/graphics/landing-page-cropped.svg"
                alt="Your illustration"
                style={{ width: "90%", height: "auto" }}
              />
            </ImageBox>
          </Grid>
        </Grid>
      </MainContainer>
      <CustomCentered>
        <Typography variant="h4">Despre Noi</Typography>
        <KeyboardDoubleArrowDownIcon
          color="primary"
          sx={{ marginLeft: "0.3rem" }}
        />
      </CustomCentered>
    </>
  );
}

export default LandingPageContent;

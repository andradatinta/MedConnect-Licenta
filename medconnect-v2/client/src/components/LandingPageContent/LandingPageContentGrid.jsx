import React from "react";
import { Grid, Typography, Box } from "@mui/material";
import Button from "@mui/material/Button";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import { MainContainer, CustomCentered } from "./LandingPageContent.styles";
import { ImageBox } from "../SignUp/SignUp.styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

function LandingPageContent() {
  const theme = useTheme();
  const isScreenSmall = useMediaQuery(theme.breakpoints.down("md"));
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
            sx={{ alignItems: isScreenSmall ? "center" : "normal" }}
          >
            <Box
              sx={{
                width: "90%",
                paddingTop: { xs: "4rem", md: "2rem" },
                // display: isScreenSmall ? "flex" : "block",
                // flexDirection: isScreenSmall ? "column" : "normal",
                // justifyContent: isScreenSmall ? "center" : "normal",
              }}
            >
              {isScreenSmall ? (
                <Typography
                  variant="h1"
                  fontSize="2rem"
                  sx={{
                    marginBottom: "2.5rem",
                    textAlign: "center",
                    lineHeight: "3rem",
                  }}
                >
                  Ajutorul tău principal în gestionarea creditelor EMC
                </Typography>
              ) : (
                <Typography variant="h1" sx={{ marginBottom: "2rem" }}>
                  Ajutorul tău principal în gestionarea creditelor EMC
                </Typography>
              )}

              <Typography
                variant="h3"
                sx={{
                  marginBottom: "2rem",
                  textAlign: isScreenSmall ? "center" : "none",
                  fontSize: isScreenSmall ? "1.25rem" : "1.56rem",
                }}
              >
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
              // sx={{ margin: isScreenSmall ? "auto" : "inherit" }}
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
            {!isScreenSmall && (
              <ImageBox>
                <img
                  src="/graphics/landing-page-cropped.svg"
                  alt="Your illustration"
                  style={{ width: "90%", height: "auto" }}
                />
              </ImageBox>
            )}
          </Grid>
        </Grid>
      </MainContainer>
      <CustomCentered>
        <Typography
          variant="h4"
          sx={{ fontSize: isScreenSmall ? "1rem" : "1.25rem" }}
        >
          Despre Noi
        </Typography>
        <KeyboardDoubleArrowDownIcon
          color="primary"
          sx={{ marginLeft: "0.3rem" }}
        />
      </CustomCentered>
    </>
  );
}

export default LandingPageContent;

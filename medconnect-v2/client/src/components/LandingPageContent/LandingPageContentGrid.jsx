import React from "react";
import { Grid, Typography, Box } from "@mui/material";
import Button from "@mui/material/Button";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import { MainContainer, CustomCentered } from "./LandingPageContent.styles";
import { ImageBox } from "../SignUp/SignUp.styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { Link as RouterLink } from "react-router-dom";

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
                MedConnect este platforma care facilitează întregul proces de
                trimitere a documentelor și validare a creditelor EMC în timp
                real și într-o manieră transparentă.
              </Typography>
            </Box>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              component={RouterLink}
              to="/login"
              sx={{ minWidth: isScreenSmall ? "150px" : "none" }}
            >
              <Typography variant="p">Intră în cont</Typography>
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
          sx={{
            fontSize: isScreenSmall ? "1rem" : "1.25rem",
            marginTop: isScreenSmall ? "1.5rem" : "none",
          }}
        >
          Despre Noi
        </Typography>
        <KeyboardDoubleArrowDownIcon
          color="primary"
          sx={{
            marginLeft: "0.3rem",
            marginTop: isScreenSmall ? "1.5rem" : "none",
          }}
        />
      </CustomCentered>
    </>
  );
}

export default LandingPageContent;

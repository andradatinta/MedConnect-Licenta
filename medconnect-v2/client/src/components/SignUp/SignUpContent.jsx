import { Container, Grid, Box, Typography } from "@mui/material";
import React from "react";
import SignUpFormDoctor from "./SignUpFormDoctor";
import SignUpFormCMR from "./SignUpFormCMR";

function SignUpContent({ isDoctor }) {
  return (
    <>
      <Container
        maxWidth="lg"
        sx={{
          height: "calc(100vh - 64px)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          boxSizing: "border-box",
          width: "100%",
        }}
      >
        <Grid container spacing={2}>
          <Grid
            item
            xs={6}
            md={6}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src="/graphics/signup-doctor.svg"
                alt="Your illustration"
                style={{ width: "80%", height: "auto" }}
              />
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
          >
            {isDoctor ? (
              <Typography
                variant="h1"
                mb="2rem"
                fontWeight="500"
                fontSize="2.5rem"
                textAlign="center"
              >
                Înregistrare medic
              </Typography>
            ) : (
              <Typography
                variant="h1"
                mb="2rem"
                fontWeight="500"
                fontSize="2.5rem"
                textAlign="center"
              >
                Înregistrare membru CMR
              </Typography>
            )}
            {isDoctor ? <SignUpFormDoctor /> : <SignUpFormCMR />}
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default SignUpContent;

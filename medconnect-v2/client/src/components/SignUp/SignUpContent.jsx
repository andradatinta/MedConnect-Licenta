import { Grid } from "@mui/material";
import React from "react";
import SignUpFormDoctor from "./SignUpFormDoctor";
import SignUpFormCMR from "./SignUpFormCMR";
import { FormHeading, FullViewportContainer, ImageBox } from "./SignUp.styles";

function SignUpContent({ isDoctor }) {
  return (
    <>
      <FullViewportContainer maxWidth="lg">
        <Grid container spacing={2}>
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
                src="/graphics/signup-doctor.svg"
                alt="Your illustration"
                style={{ width: "80%", height: "auto" }}
              />
            </ImageBox>
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
              <FormHeading variant="h1">Înregistrare medic</FormHeading>
            ) : (
              <FormHeading variant="h1">Înregistrare membru CMR</FormHeading>
            )}
            {isDoctor ? <SignUpFormDoctor /> : <SignUpFormCMR />}
          </Grid>
        </Grid>
      </FullViewportContainer>
    </>
  );
}

export default SignUpContent;

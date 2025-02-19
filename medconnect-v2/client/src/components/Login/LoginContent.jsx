import React from "react";
import { Grid } from "@mui/material";
import LoginForm from "./LoginForm";
import {
  FormHeading,
  FullViewportContainer,
  ImageBox,
} from "../SignUp/SignUp.styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

function LoginContent() {
  const theme = useTheme();
  const isScreenSmall = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <>
      <>
        <FullViewportContainer maxWidth="lg">
          <Grid container spacing={2}>
            <Grid
              item
              xs={12}
              md={6}
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
            >
              <FormHeading variant="h1">Login</FormHeading>
              <LoginForm />
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
                    src="/graphics/login.svg"
                    alt="Your illustration"
                    style={{ width: "80%", height: "auto" }}
                  />
                </ImageBox>
              )}
            </Grid>
          </Grid>
        </FullViewportContainer>
      </>
    </>
  );
}

export default LoginContent;

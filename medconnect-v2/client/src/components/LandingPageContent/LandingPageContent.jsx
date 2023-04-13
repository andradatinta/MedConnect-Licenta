import React from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import {
  MainContainer,
  FlexColumn,
  FlexColumnImage,
  MarginBottomBig,
  CustomCentered,
} from "./LandingPageContent.styles";

function LandingPageContent() {
  return (
    <>
      <MainContainer>
        <FlexColumn>
          <MarginBottomBig>
            <Typography variant="h1">
              Ajutorul tău principal în gestionarea creditelor EMC
            </Typography>
          </MarginBottomBig>
          <MarginBottomBig>
            <Typography variant="h3">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incidid ut labore et dolore magna aliqua. Ut enim
              ad min.
            </Typography>
          </MarginBottomBig>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            href="http://localhost:3000/test"
          >
            <Typography variant="p">Lorem ipsum</Typography>
          </Button>
        </FlexColumn>
        <FlexColumnImage>
          <Container maxWidth="md">
            <Box>
              <img
                src="/graphics/landing-page-cropped.svg"
                alt="Your illustration"
                style={{ width: "100%", height: "auto" }}
              />
            </Box>
          </Container>
        </FlexColumnImage>
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

import React from "react";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { AboutUsCardsContainer } from "./LandingPageContent.styles";

function AboutUsCard({ iconUrl, title, description, breakLineTitle = null }) {
  return (
    <>
      <Card sx={{ maxWidth: 345, width: "300px", height: "330px" }}>
        <CardContent>
          <AboutUsCardsContainer>
            <Container
              maxWidth="sm"
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Box
                sx={{
                  width: "50%",
                  height: "auto",
                }}
              >
                <img
                  src={iconUrl}
                  alt="Your illustration"
                  style={{ width: "100%", height: "auto" }}
                />
              </Box>
            </Container>
            <Box sx={{ marginBottom: "20px", textAlign: "center" }}>
              <Typography variant="h5">{title}</Typography>
              {breakLineTitle ? (
                <Typography variant="h5">{breakLineTitle}</Typography>
              ) : null}
            </Box>
            <Box sx={{ textAlign: "center" }}>
              <Typography
                variant="body2"
                color="primary"
                sx={{ lineHeight: "20px" }}
              >
                {description}
              </Typography>
            </Box>
          </AboutUsCardsContainer>
        </CardContent>
      </Card>
    </>
  );
}

export default AboutUsCard;

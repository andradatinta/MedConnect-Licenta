import React from "react";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { AboutUsCardsContainer } from "./LandingPageContent.styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

function AboutUsCard({ iconUrl, title, description, breakLineTitle = null }) {
  const theme = useTheme();
  const isScreenSmall = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Card sx={{ width: "80%", maxWidth: 345, height: "330px", mb: 2 }}>
      <CardContent>
        <AboutUsCardsContainer>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mb: 2,
            }}
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
          </Box>
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
  );
}

export default AboutUsCard;

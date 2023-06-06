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
  const isMediumLarge = useMediaQuery("(max-width:1225px)");
  const cardStyles = {
    width: "80%",
    maxWidth: 345,
    mb: 2,
    minHeight: "330px",
    transition: "0.3s",
  };

  if (!isScreenSmall && !isMediumLarge) {
    cardStyles[":hover"] = {
      transform: "translateY(-10px)",
    };
  }
  return (
    <Card sx={cardStyles}>
      <CardContent
      // sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}
      >
        <AboutUsCardsContainer>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mb: 2,
            }}
          >
            <img
              src={iconUrl}
              alt="Your illustration"
              style={{ maxWidth: "40%", height: "auto" }}
            />
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

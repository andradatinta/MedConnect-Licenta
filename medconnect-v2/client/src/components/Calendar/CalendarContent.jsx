import React, { useState, useEffect } from "react";
import { Grid, Card, CardContent, Typography, Box } from "@mui/material";
import { FullViewportContainer } from "../SignUp/SignUp.styles";
// import { CalendarSelectToggleButton } from "./CalendarContent.styles";
import CalendarEventButtons from "./CalendarEventButtons";
import CalendarEvents from "./CalendarEvents";

function CalendarContent() {
  const FilterMenu = (
    <Card
      sx={{
        borderRadius: "1rem",
        padding: "1rem",
        height: "calc(100vh - 128px)",
        width: "100%",
      }}
    >
      <CardContent>
        <Typography variant="h6">Filter Options</Typography>
        {/* Add your filter options here */}
      </CardContent>
    </Card>
  );

  // const [isSelected, setIsSelected] = useState(false);
  const [selectedButton, setSelectedButton] = useState(null);
  const handleEventTypeClick = (buttonId) => {
    setSelectedButton(buttonId);
  };

  useEffect(() => {
    // If you need to run side effects based on selectedButton state
    // this function will be called whenever selectedButton changes
    console.log(`Button with id ${selectedButton} is selected.`);
  }, [selectedButton]);
  return (
    <>
      <FullViewportContainer
        maxWidth="100%"
        // sx={{ backgroundColor: "blueviolet", padding: "0 1rem" }}
      >
        <Grid container spacing={2} backgroundColor="green">
          <Grid item xs={12} md={2}>
            {FilterMenu}
          </Grid>

          {/* Right side main content */}
          <Grid item xs={12} md={10}>
            {/* Add your Calendar or other content here */}
            <Box sx={{ marginLeft: "6rem", marginTop: "1rem" }}>
              {/* whole content box above */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.25rem",
                }}
              >
                <Typography variant="h3" fontWeight="500">
                  Calendar Evenimente
                </Typography>
                <CalendarEventButtons
                  selectedButton={selectedButton}
                  handleEventTypeClick={handleEventTypeClick}
                />
                <CalendarEvents />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </FullViewportContainer>
    </>
  );
}

export default CalendarContent;

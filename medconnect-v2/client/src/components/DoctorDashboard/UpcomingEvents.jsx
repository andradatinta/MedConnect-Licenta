import React from "react";
import { Grid } from "@mui/material";
import CalendarEventCard from "../Calendar/CalendarEventCard";

function UpcomingEvents({ showSignUpButton }) {
  return (
    <>
      <Grid
        container
        spacing={2}
        columnGap="2.5rem"
        marginTop="1rem"
        // maxHeight="100vh"
        // sx={{ height: "100%", overflowY: "scroll" }}
      >
        <Grid item xs={12} sm={6} md={3}>
          <CalendarEventCard showSignUpButton={showSignUpButton} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <CalendarEventCard showSignUpButton={showSignUpButton} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <CalendarEventCard showSignUpButton={showSignUpButton} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <CalendarEventCard showSignUpButton={showSignUpButton} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <CalendarEventCard showSignUpButton={showSignUpButton} />
        </Grid>
      </Grid>
    </>
  );
}

export default UpcomingEvents;

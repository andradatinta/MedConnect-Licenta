import React from "react";
import CalendarEventCard from "./CalendarEventCard";
import { Grid } from "@mui/material";

function CalendarEvents() {
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
          <CalendarEventCard />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <CalendarEventCard />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <CalendarEventCard />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <CalendarEventCard />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <CalendarEventCard />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <CalendarEventCard />
        </Grid>
        {/* <Grid item xs={12} sm={6} md={3}>
          <CalendarEventCard />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <CalendarEventCard />
        </Grid> */}
      </Grid>
    </>
  );
}

export default CalendarEvents;

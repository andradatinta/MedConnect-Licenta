import React from "react";
import CalendarEventCard from "./CalendarEventCard";
import { Grid } from "@mui/material";

function CalendarEvents({ allCalendarEvents, showSignUpButton }) {
  return (
    <>
      <Grid container spacing={2} columnGap="2.5rem" marginTop="1rem">
        {allCalendarEvents.map((event) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={3}
            key={event._id}
            // sx={{ minHeight: "273px" }}
          >
            <CalendarEventCard
              // de vazut cu imageUrl
              showSignUpButton={showSignUpButton}
              key={event._id}
              eventName={event.name}
              dateTime={event.dateTime}
              description={event.description}
              location={event.location}
              credits={event.credits}
              contactEmail={event.contactEmail}
              specialization={event.specialization}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default CalendarEvents;

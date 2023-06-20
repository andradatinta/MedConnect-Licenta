import React from "react";
import { Grid } from "@mui/material";
import CalendarEventCard from "../Calendar/CalendarEventCard";

function UpcomingEvents({ showSignUpButton, allCalendarEvents }) {
  return (
    <>
      <Grid container spacing={2} columnGap="2.5rem" marginTop="1rem">
        {allCalendarEvents.map((event) => (
          <Grid item xs={12} sm={6} md={3} key={event._id}>
            <CalendarEventCard
              showSignUpButton={showSignUpButton}
              key={event._id}
              eventName={event.name}
              dateTime={event.dateTime}
              description={event.description}
              location={event.location}
              credits={event.credits}
              contactEmail={event.contactEmail}
              specialization={event.specialization}
              imageUrl={event.imageUrl}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default UpcomingEvents;

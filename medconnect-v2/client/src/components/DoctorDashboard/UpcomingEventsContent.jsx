import { React } from "react";
import { Box, Typography } from "@mui/material";
import UpcomingEvents from "./UpcomingEvents";
import { useLocation } from "react-router-dom";
import { useGetCalendarEvents } from "../Calendar/CalendarContent";
function UpcomingEventsContent() {
  const location = useLocation();
  // const showSignUpButton = location.pathname === "/doctor/upcoming";
  const calendarEvents = useGetCalendarEvents();

  const showSignUpButton = location.pathname === "/doctor/upcoming";

  return (
    <>
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
            Evenimente viitoare
          </Typography>
        </Box>
        {calendarEvents.length > 0 ? (
          <UpcomingEvents
            showSignUpButton={showSignUpButton}
            allCalendarEvents={calendarEvents}
          />
        ) : null}
      </Box>
    </>
  );
}

export default UpcomingEventsContent;

import { React } from "react";
import { Box, Typography } from "@mui/material";
import UpcomingEvents from "./UpcomingEvents";
import { useLocation } from "react-router-dom";
import { useGetCalendarData } from "../Calendar/CalendarContent";
function UpcomingEventsContent() {
  const location = useLocation();
  // const showSignUpButton = location.pathname === "/doctor/upcoming";
  const calendarData = useGetCalendarData();

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
        {calendarData.events.length > 0 ? (
          <UpcomingEvents
            showSignUpButton={showSignUpButton}
            allCalendarEvents={calendarData.events}
          />
        ) : null}
      </Box>
    </>
  );
}

export default UpcomingEventsContent;

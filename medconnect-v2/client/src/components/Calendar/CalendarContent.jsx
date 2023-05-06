import React, { useState, useEffect } from "react";
import { Grid, Typography, Box } from "@mui/material";
import { FullViewportContainer } from "../SignUp/SignUp.styles";
// import { CalendarSelectToggleButton } from "./CalendarContent.styles";
import CalendarEventButtons from "./CalendarEventButtons";
import CalendarEvents from "./CalendarEvents";
import FilterMenu2 from "./FilterMenu2";
import { API_URL } from "../../utils/constants";
import axios from "axios";

function useGetCalendarEvents() {
  const [calendarEvents, setCalendarEvents] = useState([]);

  useEffect(() => {
    const fetchCalendarEvents = async () => {
      try {
        const url = `${API_URL}/events/getCalendar`;
        const response = await axios.get(url);
        setCalendarEvents(response.data);
      } catch (error) {
        console.error("Error fetching calendar events:", error);
      }
    };
    fetchCalendarEvents();

    //   if (searchQuery) {
    //     fetchSearchedUsers();
    //   } else {
    //     setSearchedUsers([]);
    //   }
  }, []);

  return calendarEvents;
}

function CalendarContent() {
  // const [isSelected, setIsSelected] = useState(false);
  const [selectedButton, setSelectedButton] = useState("localBtn");
  const calendarEvents = useGetCalendarEvents();
  const handleEventTypeClick = (buttonId) => {
    setSelectedButton(buttonId);
  };
  // useGetCalendarEvents();

  useEffect(() => {
    // If you need to run side effects based on selectedButton state
    // this function will be called whenever selectedButton changes
    console.log(`Button with id ${selectedButton} is selected.`);
  }, [selectedButton]);
  return (
    <>
      {console.log(calendarEvents)}
      <FullViewportContainer
        maxWidth="100%"
        // sx={{ backgroundColor: "blueviolet", padding: "0 1rem" }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} md={2}>
            <FilterMenu2 />
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
                {calendarEvents.length > 0 ? (
                  <CalendarEvents allCalendarEvents={calendarEvents} />
                ) : null}
                {/* <CalendarEvents /> */}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </FullViewportContainer>
    </>
  );
}

export default CalendarContent;

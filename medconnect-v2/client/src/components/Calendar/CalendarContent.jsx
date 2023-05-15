import React, { useState, useEffect, useContext } from "react";
import { Grid, Typography, Box } from "@mui/material";
import { FullViewportContainer } from "../SignUp/SignUp.styles";
import CalendarEventButtons from "./CalendarEventButtons";
import CalendarEvents from "./CalendarEvents";
import FilterMenu2 from "./FilterMenu2";
import { API_URL } from "../../utils/constants";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";
import PaginationContainer from "../CMRDashboard/PaginationContainer";

// export function useGetCalendarEvents() {
//   const [calendarEvents, setCalendarEvents] = useState([]);

//   useEffect(() => {
//     const fetchCalendarEvents = async () => {
//       try {
//         const url = `${API_URL}/events/getCalendar`;
//         const response = await axios.get(url);
//         setCalendarEvents(response.data);
//       } catch (error) {
//         console.error("Error fetching calendar events:", error);
//       }
//     };
//     fetchCalendarEvents();
//   }, []);

//   return calendarEvents;
// }

export function useGetCalendarData(page) {
  const [calendarData, setCalendarData] = useState([]);

  useEffect(() => {
    const fetchCalendarData = async () => {
      try {
        const url = `${API_URL}/events/getCalendar?page=${page}`;
        const response = await axios.get(url);
        console.log("Server response for events:", response.data);
        setCalendarData(response.data);
      } catch (error) {
        console.error("Error fetching calendar events:", error);
      }
    };
    fetchCalendarData();
  }, [page]);

  return calendarData;
}

function CalendarContent() {
  // const [isSelected, setIsSelected] = useState(false);
  const [selectedButton, setSelectedButton] = useState("localBtn");
  const [page, setPage] = useState(1);
  const calendarData = useGetCalendarData(page);
  const { user } = useContext(AuthContext);
  const isDoctor = user && user.type === "doctor";
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
                  // gap: "1.25rem",
                }}
              >
                <Typography
                  variant="h3"
                  fontWeight="500"
                  marginBottom="1.25rem"
                >
                  Calendar Evenimente
                </Typography>
                <CalendarEventButtons
                  selectedButton={selectedButton}
                  handleEventTypeClick={handleEventTypeClick}
                  style={{ marginBottom: "0.8rem" }}
                />
                {calendarData.events && calendarData.events.length > 0 ? (
                  <CalendarEvents
                    allCalendarEvents={calendarData.events}
                    showSignUpButton={!isDoctor}
                  />
                ) : null}
                {/* de adaugat aici pagination container */}
                <PaginationContainer
                  page={page}
                  limit={calendarData.limit ? calendarData.limit : 0}
                  totalResults={
                    calendarData.totalFetchedEvents
                      ? calendarData.totalFetchedEvents
                      : 0
                  }
                  setPage={(page) => setPage(page)}
                />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </FullViewportContainer>
    </>
  );
}

export default CalendarContent;

import React, { useState, useEffect, useContext } from "react";
import { isEqual } from "lodash";

import { Grid, Typography, Box } from "@mui/material";
import { FullViewportContainer } from "../SignUp/SignUp.styles";
import CalendarEventButtons from "./CalendarEventButtons";
import CalendarEvents from "./CalendarEvents";
import FilterMenu2 from "./FilterMenu2";
import { API_URL } from "../../utils/constants";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";
import PaginationContainer from "../CMRDashboard/PaginationContainer";
import { monthMapping } from "../../utils/constants";

export function useGetCalendarData(
  page,
  selectedSpecializations,
  englishSelectedMonths,
  selectedButton
) {
  const [calendarData, setCalendarData] = useState([]);

  useEffect(() => {
    const fetchCalendarData = async () => {
      try {
        const specializationQueryString = selectedSpecializations.join(",");
        const monthQueryString = englishSelectedMonths.join(",");
        const url = `${API_URL}/events/getCalendar?page=${page}&specialization=${specializationQueryString}&month=${monthQueryString}&sort=${selectedButton}`;
        const response = await axios.get(url);
        if (!isEqual(response.data, calendarData)) {
          console.log("Server response for events:", response.data);
          setCalendarData(response.data);
        }
      } catch (error) {
        console.error("Error fetching calendar events:", error);
      }
    };
    fetchCalendarData();
  }, [page, selectedSpecializations, selectedButton, englishSelectedMonths]);

  return calendarData;
}

function CalendarContent() {
  // const [isSelected, setIsSelected] = useState(false);
  const [selectedButton, setSelectedButton] = useState("national");
  const [selectedSpecializations, setSelectedSpecializations] = useState([]);
  const [selectedMonths, setSelectedMonths] = useState([]);
  const englishSelectedMonths = selectedMonths.map(
    (month) => monthMapping[month]
  );
  const [page, setPage] = useState(1);
  const calendarData = useGetCalendarData(
    page,
    selectedSpecializations,
    englishSelectedMonths,
    selectedButton
  );
  const { user } = useContext(AuthContext);
  const isDoctor = user && user.type === "doctor";

  const handleEventTypeClick = (buttonId) => {
    setSelectedButton(buttonId);
  };
  // useGetCalendarEvents();

  const handleFilterChange = (newSpecializationFilters, newMonthFilters) => {
    setSelectedSpecializations(newSpecializationFilters);
    setSelectedMonths(newMonthFilters);
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
        <Grid container spacing={2}>
          <Grid item xs={12} md={2}>
            <FilterMenu2 onFilterChange={handleFilterChange} />
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
                  position: "relative",
                  minHeight: "85vh",
                  maxHeight: "85vh",
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
                <Box
                  sx={{ position: "absolute", bottom: "-15px", width: "100%" }}
                >
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
            </Box>
          </Grid>
        </Grid>
      </FullViewportContainer>
    </>
  );
}

export default CalendarContent;

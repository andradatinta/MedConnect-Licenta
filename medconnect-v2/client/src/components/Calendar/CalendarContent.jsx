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
        const url = `${API_URL}/events/calendar?page=${page}&specialization=${specializationQueryString}&month=${monthQueryString}&sort=${selectedButton}`;
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

  const handleFilterChange = (newSpecializationFilters, newMonthFilters) => {
    setSelectedSpecializations(newSpecializationFilters);
    setSelectedMonths(newMonthFilters);
  };

  return (
    <>
      <FullViewportContainer maxWidth="100%">
        <Grid container spacing={2}>
          <Grid item xs={12} md={2}>
            <FilterMenu2 onFilterChange={handleFilterChange} />
          </Grid>
          <Grid item xs={12} md={10}>
            <Box sx={{ marginLeft: "6rem", marginTop: "1rem" }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                  minHeight: "85vh",
                  maxHeight: "85vh",
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

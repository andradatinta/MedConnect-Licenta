import { React, useState, useContext, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import UpcomingEvents from "./UpcomingEvents";
// import { useLocation } from "react-router-dom";
import PaginationContainer from "../CMRDashboard/PaginationContainer";
import { AuthContext } from "../../contexts/AuthContext";
import { API_URL } from "../../utils/constants";
import axios from "axios";

export function useGetUserUpcomingEvents(user, page) {
  const [upcomingEventsData, setUpcomingEventsData] = useState([]);

  useEffect(() => {
    const fetchUserUpcomingEvents = async () => {
      try {
        const token = user.token;
        const url = `${API_URL}/events/upcoming?page=${page}`;
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Server response for upcoming events:", response.data);
        setUpcomingEventsData(response.data);
      } catch (error) {
        console.error("Error fetching upcoming events:", error);
      }
    };
    fetchUserUpcomingEvents();
  }, [page]);

  return upcomingEventsData;
}

function UpcomingEventsContent() {
  const [page, setPage] = useState(1);
  // const location = useLocation();
  const { user } = useContext(AuthContext);
  // const isDoctor = user && user.type === "doctor";
  // const showSignUpButton = location.pathname === "/doctor/upcoming";
  const upcomingEventsData = useGetUserUpcomingEvents(user, page);

  // const showSignUpButton = location.pathname === "/doctor/upcoming";

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
        {upcomingEventsData.upcomingEvents &&
        upcomingEventsData.upcomingEvents.length > 0 ? (
          <UpcomingEvents
            showSignUpButton={true}
            allCalendarEvents={upcomingEventsData.upcomingEvents}
          />
        ) : null}
        <PaginationContainer
          page={page}
          limit={upcomingEventsData.limit ? upcomingEventsData.limit : 0}
          totalResults={
            upcomingEventsData.totalFetchedUpcomingEvents
              ? upcomingEventsData.totalFetchedUpcomingEvents
              : 0
          }
          setPage={(page) => setPage(page)}
        />
      </Box>
    </>
  );
}

export default UpcomingEventsContent;

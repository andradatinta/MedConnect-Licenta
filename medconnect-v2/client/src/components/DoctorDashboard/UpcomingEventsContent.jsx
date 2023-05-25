import { React, useState, useContext, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import UpcomingEvents from "./UpcomingEvents";
// import { useLocation } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { API_URL } from "../../utils/constants";
import axios from "axios";

export function useGetUserUpcomingEvents(user) {
  const [upcomingEvents, setUpcomingEvents] = useState([]);

  useEffect(() => {
    const fetchUserUpcomingEvents = async () => {
      try {
        const token = user.token;
        const url = `${API_URL}/events/upcoming`;
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Server response for upcoming events:", response.data);
        setUpcomingEvents(response.data);
      } catch (error) {
        console.error("Error fetching upcoming events:", error);
      }
    };
    fetchUserUpcomingEvents();
  });

  return upcomingEvents;
}

function UpcomingEventsContent() {
  // const [page, setPage] = useState(1);
  // const location = useLocation();
  const { user } = useContext(AuthContext);
  const isDoctor = user && user.type === "doctor";
  // const showSignUpButton = location.pathname === "/doctor/upcoming";
  const upcomingEvents = useGetUserUpcomingEvents(user);

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
        {upcomingEvents && upcomingEvents.length > 0 ? (
          <UpcomingEvents
            showSignUpButton={!isDoctor}
            allCalendarEvents={upcomingEvents}
          />
        ) : null}
      </Box>
    </>
  );
}

export default UpcomingEventsContent;

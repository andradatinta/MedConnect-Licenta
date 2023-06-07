import { React, useState, useContext, useEffect } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import UpcomingEvents from "./UpcomingEvents";
import PaginationContainer from "../CMRDashboard/PaginationContainer";
import { AuthContext } from "../../contexts/AuthContext";
import { API_URL } from "../../utils/constants";
import axios from "axios";
import NoUpcomingEventsDisplay from "../ErrorMessages/NoUpcomingEventsDisplay";

export function useGetUserUpcomingEvents(user, page) {
  const [upcomingEventsData, setUpcomingEventsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUserUpcomingEvents = async () => {
      try {
        setIsLoading(true);
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
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserUpcomingEvents();
  }, [page]);

  return { upcomingEventsData, isLoading };
}

function UpcomingEventsContent() {
  const [page, setPage] = useState(1);
  const { user } = useContext(AuthContext);
  const { upcomingEventsData, isLoading } = useGetUserUpcomingEvents(
    user,
    page
  );

  return (
    <>
      <Box sx={{ marginLeft: "6rem", marginTop: "1rem" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "1.25rem",
            position: "relative",
            minHeight: "85vh",
            maxHeight: "85vh",
          }}
        >
          <Typography variant="h3" fontWeight="500">
            Evenimente viitoare
          </Typography>
          {isLoading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "4rem",
              }}
            >
              <CircularProgress />
            </Box>
          ) : upcomingEventsData.upcomingEvents &&
            upcomingEventsData.upcomingEvents.length > 0 ? (
            <UpcomingEvents
              showSignUpButton={true}
              allCalendarEvents={upcomingEventsData.upcomingEvents}
            />
          ) : (
            <NoUpcomingEventsDisplay />
          )}
          <Box sx={{ position: "absolute", bottom: "-15px", width: "100%" }}>
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
        </Box>
      </Box>
    </>
  );
}

export default UpcomingEventsContent;

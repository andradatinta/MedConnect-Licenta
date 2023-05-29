import { React, useState, useEffect, useContext } from "react";
import { Box, Typography, Grid, CardContent, Card } from "@mui/material";
import ProgressTimeButtons from "./ProgressTimeButtons";
import DashboardCircularProgress from "./DashboardCircularProgress";
import DashboardDownloadCard from "./DashboardDownloadCard";
import RecentEvent from "./RecentEvent";
import axios from "axios";
import { API_URL } from "../../utils/constants";
import { AuthContext } from "../../contexts/AuthContext";
import NoEventsDisplay from "../ErrorMessages/NoEventsDisplay";

export function useGetUserRecentEvents(user) {
  const [recentEvents, setRecentEvents] = useState([]);

  useEffect(() => {
    const fetchUserRecentEvents = async () => {
      try {
        const token = user.token;
        const url = `${API_URL}/events/recent`;
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Server response for events:", response.data);
        setRecentEvents(response.data);
      } catch (error) {
        console.error("Error fetching recent events:", error);
      }
    };
    fetchUserRecentEvents();
  }, []);

  return recentEvents;
}

export function useGetUserCredits(user, years) {
  const [credits, setCredits] = useState(0);

  useEffect(() => {
    const fetchUserCredits = async () => {
      try {
        const token = user.token;
        const url = `${API_URL}/users/${user._id}/credits?years=${years}`;
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCredits(response.data.totalCredits);
      } catch (error) {
        console.error("Error fetching user credits:", error);
      }
    };
    fetchUserCredits();
  }, [user, years]);

  return credits;
}

function ProgressContent() {
  const [selectedButton, setSelectedButton] = useState("oneYear");
  const { user } = useContext(AuthContext);
  const userRecentEvents = useGetUserRecentEvents(user);
  const userTotalCredits = useGetUserCredits(
    user,
    selectedButton === "oneYear" ? 1 : 5
  );
  const handleProgressTimeClick = (buttonId) => {
    setSelectedButton(buttonId);
  };
  // const progressValue = 75;
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
            Progresul meu
          </Typography>
        </Box>
        <Grid
          container
          spacing={2}
          sx={{
            // backgroundColor: "blue",
            marginTop: "1rem",
          }}
        >
          <Grid item xs={12} md={12}>
            {/* {aici e ceva ciudatel rau cu spacing ul si column gap ul asta - aveam columngap 11 inainte} */}
            <Grid container spacing={1}>
              <Grid item xs={12} md={3}>
                <Card sx={{ backgroundColor: "#F8F9FA", height: "100%" }}>
                  <CardContent>
                    <Grid
                      container
                      flexDirection="column"
                      alignItems="center"
                      gap="2rem"
                    >
                      <Grid
                        item
                        xs={12}
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        gap="1rem"
                      >
                        <ProgressTimeButtons
                          selectedButton={selectedButton}
                          handleProgressTimeClick={handleProgressTimeClick}
                        />
                      </Grid>

                      <Grid item xs={12} textAlign="center">
                        <DashboardCircularProgress
                          // progressValue={progressValue}
                          userTotalCredits={userTotalCredits}
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={8} sx={{ marginLeft: "3rem" }}>
                <Card sx={{ backgroundColor: "#F8F9FA", height: "100%" }}>
                  <CardContent>
                    <Grid container flexDirection="column">
                      <Grid item xs={12} marginBottom="2rem">
                        <Typography
                          variant="h4"
                          color="primary"
                          fontWeight="500"
                        >
                          Aviz de liberă practică
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <DashboardDownloadCard />
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Card
              sx={{
                backgroundColor: "#F8F9FA",
                maxHeight: "34vh",
                minHeight: "34vh",
              }}
            >
              <CardContent>
                <Grid container flexDirection="column">
                  <Grid item xs={12} marginBottom="2rem">
                    <Typography variant="h4" color="primary" fontWeight="500">
                      Evenimente recente
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Box display="flex" flexDirection="column" gap="1.2rem">
                      {userRecentEvents.length === 0 && <NoEventsDisplay />}
                      {userRecentEvents.map((event) => (
                        <RecentEvent key={event._id} event={event} />
                      ))}
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default ProgressContent;

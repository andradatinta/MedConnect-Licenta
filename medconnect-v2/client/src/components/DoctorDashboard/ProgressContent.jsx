import { React, useState } from "react";
import { Box, Typography, Grid, CardContent, Card } from "@mui/material";
import ProgressTimeButtons from "./ProgressTimeButtons";
import DashboardCircularProgress from "./DashboardCircularProgress";
import DashboardDownloadCard from "./DashboardDownloadCard";
import RecentEvent from "./RecentEvent";

function ProgressContent() {
  const [selectedButton, setSelectedButton] = useState("oneYear");
  const handleProgressTimeClick = (buttonId) => {
    setSelectedButton(buttonId);
  };
  const progressValue = 75;
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
            backgroundColor: "blue",
            marginTop: "1rem",
          }}
        >
          <Grid item xs={12} md={12}>
            {/* {aici e ceva ciudatel rau cu spacing ul si column gap ul asta - aveam columngap 11 inainte} */}
            <Grid container spacing={1}>
              <Grid item xs={12} md={3} sx={{ backgroundColor: "pink" }}>
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
                          progressValue={progressValue}
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
              <Grid
                item
                xs={12}
                md={8}
                sx={{ backgroundColor: "purple", marginLeft: "3rem" }}
              >
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
            <Card sx={{ backgroundColor: "#F8F9FA", maxHeight: "35vh" }}>
              <CardContent>
                <Grid container flexDirection="column">
                  <Grid item xs={12} marginBottom="2rem">
                    <Typography variant="h4" color="primary" fontWeight="500">
                      Evenimente recente
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Box display="flex" flexDirection="column" gap="1.2rem">
                      <RecentEvent />
                      <RecentEvent />
                      <RecentEvent />
                      <RecentEvent />
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
            {/* <Typography>Recent events bitch</Typography> */}
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default ProgressContent;

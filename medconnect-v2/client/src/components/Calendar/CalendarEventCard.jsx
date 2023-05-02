import {
  Card,
  CardContent,
  Grid,
  Typography,
  Box,
  Button,
} from "@mui/material";
import { React, useState } from "react";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import EventDetailsModal from "./EventDetailsModal";
import JoinEventModal from "./JoinEventModal";

function CalendarEventCard() {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isJoinEventOpen, setIsJoinEventOpen] = useState(false);
  const handleDetailsOpen = () => {
    setIsDetailsOpen(true);
  };

  const handleDetailsClose = () => {
    setIsDetailsOpen(false);
  };
  const handleJoinEventOpen = () => {
    setIsJoinEventOpen(true);
  };

  const handleJoinEventClose = () => {
    setIsJoinEventOpen(false);
  };
  return (
    <>
      <Card>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <Box
                  sx={{
                    width: "50%",
                    height: "auto",
                    flex: 1,
                  }}
                >
                  <img
                    src="/graphics/calendar-card-3.jpg"
                    alt="Your illustration"
                    style={{
                      width: "100%",
                      height: "auto",
                      borderRadius: "30px",
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flex: 1,
                    flexDirection: "column",
                    textAlign: "center",
                    alignItems: "flex-start",
                    gap: "0.4rem",
                    // backgroundColor: "yellow",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      // justifyContent: "center",

                      alignItems: "center",
                    }}
                  >
                    <CalendarMonthOutlinedIcon
                      color="secondary"
                      sx={{ marginRight: "0.3rem" }}
                    />
                    <Typography variant="p" color="primary">
                      {new Date().toLocaleDateString("en-GB")}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <StarBorderOutlinedIcon
                      color="secondary"
                      sx={{ marginRight: "0.3rem" }}
                    />
                    <Typography variant="p" color="primary">
                      12 EMC
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} textAlign="center">
              <Typography variant="h5">
                Actualități în farmacologie și farmacoterapie
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              display="flex"
              justifyContent="center"
              alignItems="center"
              gap="1rem"
            >
              <Button
                variant="outlined"
                size="small"
                onClick={handleDetailsOpen}
                sx={{ maxWidth: "30%" }}
              >
                Detalii
              </Button>
              <Button
                variant="contained"
                size="small"
                onClick={handleJoinEventOpen}
                sx={{ maxWidth: "30%" }}
              >
                Înscrie-te
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      {isDetailsOpen && (
        <EventDetailsModal
          isDetailsOpen={isDetailsOpen}
          handleClose={handleDetailsClose}
        />
      )}
      {isJoinEventOpen && (
        <JoinEventModal
          isJoinEventOpen={isJoinEventOpen}
          handleClose={handleJoinEventClose}
        />
      )}
    </>
  );
}

export default CalendarEventCard;

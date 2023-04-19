import {
  Card,
  CardContent,
  Grid,
  Typography,
  Box,
  Button,
} from "@mui/material";
import React from "react";

function CalendarEventCard() {
  return (
    <>
      <Card>
        <CardContent>
          <Grid container>
            <Grid item xs={12}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box
                  sx={{
                    width: "50%",
                    height: "auto",
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
                    flexDirection: "column",
                    textAlign: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography variant="p">Wassup</Typography>
                  <Typography variant="p">Wassup</Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Typography>Wassup conference</Typography>
            </Grid>
            <Grid
              item
              xs={12}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Button sx={{ backgroundColor: "blue" }}>Wassup </Button>
              <Button sx={{ backgroundColor: "blue" }}>Wassup </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}

export default CalendarEventCard;

import {
  Card,
  CardContent,
  Grid,
  Typography,
  Box,
  Button,
} from "@mui/material";
import React from "react";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import { GridWideButton } from "../LandingPageContent/LandingPageContent.styles";

function CalendarEventCard() {
  return (
    <>
      <Card>
        <CardContent>
          <Grid container spacing={2}>
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
                    // backgroundColor: "yellow",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <CalendarMonthOutlinedIcon sx={{ marginRight: "0.3rem" }} />
                    <Typography variant="p">
                      {new Date().toLocaleDateString("en-GB")}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <StarBorderOutlinedIcon sx={{ marginRight: "0.3rem" }} />
                    <Typography variant="p">12 EMC</Typography>
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
              <Button variant="outlined" size="small" sx={{ maxWidth: "30%" }}>
                Detalii
              </Button>
              <Button variant="contained" size="small" sx={{ maxWidth: "30%" }}>
                Înscrie-te
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}

export default CalendarEventCard;

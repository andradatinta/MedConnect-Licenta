import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { DashboardMenuButton } from "./DoctorDashboard.styles";
import DonutLargeOutlinedIcon from "@mui/icons-material/DonutLargeOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import EventAvailableOutlinedIcon from "@mui/icons-material/EventAvailableOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { useNavigate } from "react-router-dom";

function DashboardMenuButtons({ selectedButton }) {
  const navigate = useNavigate();

  return (
    <>
      <Grid container display="flex" flexDirection="column" rowGap="1.2rem">
        <Grid item xs={12}>
          <DashboardMenuButton
            isSelected={selectedButton === "progres"}
            onClick={() => navigate("/doctor")}
          >
            <Box sx={{ display: "flex", gap: "0.6rem" }}>
              <DonutLargeOutlinedIcon fontSize="medium" color="secondary" />
              <Typography variant="h5" fontSize="1.1rem">
                Progres
              </Typography>
            </Box>
          </DashboardMenuButton>
        </Grid>
        <Grid item xs={12}>
          <DashboardMenuButton
            isSelected={selectedButton === "documents"}
            onClick={() => navigate("/doctor/documents")}
          >
            <Box sx={{ display: "flex", gap: "0.6rem" }}>
              <DescriptionOutlinedIcon fontSize="medium" color="secondary" />
              <Typography variant="h5" fontSize="1.1rem">
                Documente
              </Typography>
            </Box>
          </DashboardMenuButton>
        </Grid>
        <Grid item xs={12}>
          <DashboardMenuButton
            isSelected={selectedButton === "upcomingEvents"}
            onClick={() => navigate("/doctor/upcoming")}
          >
            <Box sx={{ display: "flex", gap: "0.6rem" }}>
              <EventAvailableOutlinedIcon fontSize="medium" color="secondary" />
              <Typography variant="h5" fontSize="1.1rem">
                Evenimente viitoare
              </Typography>
            </Box>
          </DashboardMenuButton>
        </Grid>
        <Grid item xs={12}>
          <DashboardMenuButton
            isSelected={selectedButton === "settings"}
            onClick={() => navigate("/doctor/settings")}
          >
            <Box sx={{ display: "flex", gap: "0.6rem" }}>
              <SettingsOutlinedIcon fontSize="medium" color="secondary" />
              <Typography variant="h5" fontSize="1.1rem">
                Setări
              </Typography>
            </Box>
          </DashboardMenuButton>
        </Grid>
      </Grid>
    </>
  );
}

export default DashboardMenuButtons;

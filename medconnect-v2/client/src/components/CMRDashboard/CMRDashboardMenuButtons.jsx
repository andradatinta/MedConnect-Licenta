import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { DashboardMenuButton } from "../DoctorDashboard/DoctorDashboard.styles";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonSearchOutlinedIcon from "@mui/icons-material/PersonSearchOutlined";
import { useNavigate } from "react-router-dom";

function CMRDashboardMenuButtons({ selectedButton }) {
  const navigate = useNavigate();
  return (
    <>
      <Grid container display="flex" flexDirection="column" rowGap="1.2rem">
        <Grid item xs={12}>
          <DashboardMenuButton
            isSelected={selectedButton === "doctors"}
            onClick={() => navigate("/cmr")}
          >
            <Box sx={{ display: "flex", gap: "0.6rem" }}>
              <PersonSearchOutlinedIcon fontSize="medium" color="secondary" />
              <Typography variant="h5" fontSize="1.1rem">
                Medici
              </Typography>
            </Box>
          </DashboardMenuButton>
        </Grid>
        <Grid item xs={12}>
          <DashboardMenuButton
            isSelected={selectedButton === "settings"}
            onClick={() => navigate("/cmr/settings")}
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

export default CMRDashboardMenuButtons;

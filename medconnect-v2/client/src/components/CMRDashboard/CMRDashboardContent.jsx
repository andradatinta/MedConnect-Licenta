import React from "react";
import { FullViewportContainer } from "../SignUp/SignUp.styles";
import { Grid } from "@mui/material";
import { Outlet } from "react-router-dom";
import DashboardNavigationMenu from "../DoctorDashboard/DashboardNavigationMenu";

function CMRDashboardContent() {
  return (
    <>
      <FullViewportContainer
        maxWidth="100%"
        // sx={{ backgroundColor: "blueviolet", padding: "0 1rem" }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} md={2}>
            <DashboardNavigationMenu />
          </Grid>
          <Grid item xs={12} md={10}>
            <Outlet />
          </Grid>
        </Grid>
      </FullViewportContainer>
    </>
  );
}

export default CMRDashboardContent;

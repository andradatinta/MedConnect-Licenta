import React from "react";
import { FullViewportContainer } from "../SignUp/SignUp.styles";
import { Grid } from "@mui/material";
import DashboardNavigationMenu from "./DashboardNavigationMenu";
import { Outlet } from "react-router-dom";

function DoctorDashboardContent() {
  return (
    <>
      <FullViewportContainer
        maxWidth="100%"
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

export default DoctorDashboardContent;

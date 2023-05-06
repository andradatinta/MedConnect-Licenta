import React from "react";
import NoAccountsOutlinedIcon from "@mui/icons-material/NoAccountsOutlined";
import { Grid, Typography } from "@mui/material";

function NoDoctorSearchResult() {
  return (
    <>
      <Grid container textAlign="center">
        <Grid item xs={12}>
          <NoAccountsOutlinedIcon
            sx={{
              fontSize: "6.25rem",
              opacity: "0.2",
              stroke: "#ffffff",
              strokeWidth: 1,
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5" color="#707070" fontWeight="400">
            Nu a fost găsit niciun rezultat
          </Typography>
        </Grid>
      </Grid>
    </>
  );
}

export default NoDoctorSearchResult;

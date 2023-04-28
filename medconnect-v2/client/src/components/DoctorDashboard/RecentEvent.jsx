import React from "react";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import { Typography, Grid, Box } from "@mui/material";

function RecentEvent() {
  return (
    <Grid container spacing={1} justifyContent="space-between">
      <Grid item xs={5}>
        <Box display="flex" alignItems="center" gap="0.5rem">
          <PeopleAltOutlinedIcon fontSize="small" sx={{ opacity: 0.3 }} />
          <Typography variant="p" color="primary">
            Actualități în farmacologie și farmacoterapie
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={2}>
        <Typography variant="p" color="primary">
          29/04/2023
        </Typography>
      </Grid>
      <Grid item xs={1}>
        <Typography variant="p" color="secondary" fontWeight="500">
          12 EMC
        </Typography>
      </Grid>
    </Grid>
  );
}

export default RecentEvent;

import React from "react";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import { Typography, Grid, Box } from "@mui/material";

function RecentEvent({ event }) {
  return (
    <Grid container spacing={1} justifyContent="space-between">
      <Grid item xs={5}>
        <Box display="flex" alignItems="center" gap="0.5rem">
          <PeopleAltOutlinedIcon fontSize="small" sx={{ opacity: 0.3 }} />
          <Typography variant="p" color="primary">
            {event.name}
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={2}>
        <Typography variant="p" color="primary">
          {new Date(event.dateTime).toLocaleDateString("en-GB")}
        </Typography>
      </Grid>
      <Grid item xs={1}>
        <Typography variant="p" color="secondary" fontWeight="500">
          {`${event.credits} EMC`}
        </Typography>
      </Grid>
    </Grid>
  );
}

export default RecentEvent;

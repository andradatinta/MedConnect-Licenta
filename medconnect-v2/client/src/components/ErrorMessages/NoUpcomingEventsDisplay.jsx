import React from "react";
import { Typography, Box } from "@mui/material";

function NoUpcomingEventsDisplay() {
  return (
    <Box display="flex" justifyContent="center" sx={{ marginTop: "6rem" }}>
      <Typography
        variant="h5"
        color="#707070"
        fontWeight="400"
        textAlign="center"
        sx={{ opacity: 0.3 }}
      >
        Nu urmează să participi la niciun eveniment încă
      </Typography>
    </Box>
  );
}

export default NoUpcomingEventsDisplay;

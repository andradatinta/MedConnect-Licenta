import React from "react";
import { Typography, Box } from "@mui/material";

function NoEventsDisplay() {
  return (
    <Box display="flex" justifyContent="center">
      <Typography
        variant="h5"
        color="#707070"
        fontWeight="400"
        textAlign="center"
        sx={{ opacity: 0.3 }}
      >
        Nu ai participat la niciun eveniment încă
      </Typography>
    </Box>
  );
}

export default NoEventsDisplay;

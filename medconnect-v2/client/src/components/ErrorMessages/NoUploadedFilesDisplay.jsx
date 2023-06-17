import React from "react";
import { Typography, Box } from "@mui/material";

function NoUploadedFilesDisplay() {
  return (
    <Box display="flex" justifyContent="center" sx={{ marginTop: "8rem" }}>
      <Typography
        variant="h5"
        color="#707070"
        fontWeight="400"
        textAlign="center"
        sx={{ opacity: 0.3 }}
      >
        Nu ai încărcat niciun fișier încă
      </Typography>
    </Box>
  );
}

export default NoUploadedFilesDisplay;

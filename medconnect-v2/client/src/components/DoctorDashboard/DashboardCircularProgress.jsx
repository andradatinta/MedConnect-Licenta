import React from "react";
import { Box, Typography, CircularProgress } from "@mui/material";

function DashboardCircularProgress({ progressValue }) {
  return (
    <>
      <Typography variant="h3" fontWeight="500" marginBottom="1rem">
        17/25
      </Typography>
      <Box position="relative" display="inline-flex">
        <CircularProgress
          size="6rem"
          thickness={4}
          variant="determinate"
          value={progressValue}
        />
        <Box
          top={0}
          left={0}
          bottom={0}
          right={0}
          position="absolute"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Typography
            variant="h5"
            fontWeight="600"
            component="div"
            color="text.secondary"
          >{`${Math.round(progressValue)}%`}</Typography>
        </Box>
      </Box>
    </>
  );
}

export default DashboardCircularProgress;

import React from "react";
import { Grid } from "@mui/material";
import { ProgressSelectToggleButton } from "./DoctorDashboard.styles";

function ProgressTimeButtons({ selectedButton, handleProgressTimeClick }) {
  return (
    <>
      <ProgressSelectToggleButton
        variant="outlined"
        size="small"
        onClick={() => handleProgressTimeClick("oneYear")}
        isSelected={selectedButton === "oneYear"}
        sx={{ maxWidth: "30%" }}
      >
        1 an
      </ProgressSelectToggleButton>
      <ProgressSelectToggleButton
        variant="outlined"
        size="small"
        onClick={() => handleProgressTimeClick("fiveYears")}
        isSelected={selectedButton === "fiveYears"}
        sx={{ maxWidth: "30%" }}
      >
        5 ani
      </ProgressSelectToggleButton>
    </>
  );
}

export default ProgressTimeButtons;

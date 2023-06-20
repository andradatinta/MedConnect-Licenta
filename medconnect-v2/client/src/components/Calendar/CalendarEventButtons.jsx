import React from "react";
import { Box } from "@mui/material";
import { CalendarSelectToggleButton } from "./CalendarContent.styles";

function CalendarEventButtons(props) {
  const { selectedButton, handleEventTypeClick } = props;

  return (
    <Box sx={{ display: "flex", gap: "2rem" }}>
      <CalendarSelectToggleButton
        onClick={() => handleEventTypeClick("national")}
        isSelected={selectedButton === "national"}
      >
        Naționale
      </CalendarSelectToggleButton>
      <CalendarSelectToggleButton
        onClick={() => handleEventTypeClick("local")}
        isSelected={selectedButton === "local"}
      >
        Locale
      </CalendarSelectToggleButton>
      <CalendarSelectToggleButton
        onClick={() => handleEventTypeClick("international")}
        isSelected={selectedButton === "international"}
      >
        Internaționale
      </CalendarSelectToggleButton>
    </Box>
  );
}

export default CalendarEventButtons;

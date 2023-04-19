import React from "react";
import { Box } from "@mui/material";
import { CalendarSelectToggleButton } from "./CalendarContent.styles";

function CalendarEventButtons(props) {
  const { selectedButton, handleEventTypeClick } = props;

  return (
    <Box sx={{ display: "flex", gap: "2rem" }}>
      <CalendarSelectToggleButton
        onClick={() => handleEventTypeClick("localBtn")}
        isSelected={selectedButton === "localBtn"}
      >
        Locale
      </CalendarSelectToggleButton>
      <CalendarSelectToggleButton
        onClick={() => handleEventTypeClick("nationalBtn")}
        isSelected={selectedButton === "nationalBtn"}
      >
        Nationale
      </CalendarSelectToggleButton>
      <CalendarSelectToggleButton
        onClick={() => handleEventTypeClick("internationalBtn")}
        isSelected={selectedButton === "internationalBtn"}
      >
        Internationale
      </CalendarSelectToggleButton>
    </Box>
  );
}

export default CalendarEventButtons;

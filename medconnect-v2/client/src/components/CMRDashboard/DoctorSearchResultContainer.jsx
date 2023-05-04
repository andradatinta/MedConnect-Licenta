import React from "react";
import DoctorSearchResultCard from "./DoctorSearchResultCard";
import { Box } from "@mui/material";

function DoctorSearchResultContainer({ searchedUsersResult }) {
  return (
    <>
      <Box display="flex" flexDirection="column" gap="1rem">
        {searchedUsersResult.map((doctor) => (
          <DoctorSearchResultCard
            key={doctor._id}
            lastName={doctor.lastName}
            firstName={doctor.firstName}
            specialization={doctor.specialization}
            cuim={doctor.cuim}
            // de adaugat documentele lui
          />
        ))}
      </Box>
    </>
  );
}

export default DoctorSearchResultContainer;

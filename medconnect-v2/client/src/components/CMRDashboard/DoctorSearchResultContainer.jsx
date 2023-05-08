import React from "react";
import DoctorSearchResultCard from "./DoctorSearchResultCard";
import { Box } from "@mui/material";

function DoctorSearchResultContainer({
  searchedUsersResult,
  onClickSeeDocuments,
}) {
  return (
    <>
      <Box display="flex" flexDirection="column" gap="1rem">
        {searchedUsersResult.map((doctor) => (
          <DoctorSearchResultCard
            key={doctor._id}
            doctorId={doctor._id}
            lastName={doctor.lastName}
            firstName={doctor.firstName}
            specialization={doctor.specialization}
            cuim={doctor.cuim}
            onClickSeeDocuments={onClickSeeDocuments}
            // de adaugat documentele lui
          />
        ))}
      </Box>
    </>
  );
}

export default DoctorSearchResultContainer;

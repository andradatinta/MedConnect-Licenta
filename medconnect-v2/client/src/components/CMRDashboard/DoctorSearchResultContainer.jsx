import React from "react";
import DoctorSearchResultCard from "./DoctorSearchResultCard";
import { Box } from "@mui/material";
import PaginationContainer from "./PaginationContainer";

function DoctorSearchResultContainer({
  searchedUsersResult,
  onClickSeeDocuments,
  page,
  totalSearchedUsers,
  setPage,
  limit,
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
        {console.log("DoctorSearchResultContainer pagination props:", {
          page,
          limit,
          totalSearchedUsers,
        })}
        <Box sx={{ position: "absolute", bottom: "5px", width: "100%" }}>
          <PaginationContainer
            page={page}
            totalResults={totalSearchedUsers}
            setPage={setPage}
            limit={limit}
          />
        </Box>
      </Box>
    </>
  );
}

export default DoctorSearchResultContainer;

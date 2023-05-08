import React from "react";
import { Card, Grid, CardContent, Box, Typography } from "@mui/material";
import MedicalInformationOutlinedIcon from "@mui/icons-material/MedicalInformationOutlined";
import { DocumentsWideButton } from "../DoctorDashboard/DoctorDashboard.styles";

function DoctorSearchResultCard({
  lastName,
  firstName,
  specialization,
  cuim,
  onClickSeeDocuments,
  doctorId,
}) {
  return (
    <>
      <Card sx={{ backgroundColor: "#FFFFFFCC", borderRadius: "10px" }}>
        <CardContent
          sx={{
            "&:last-child": {
              paddingBottom: "1rem",
            },
          }}
        >
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item xs={3}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.3rem",
                }}
              >
                <MedicalInformationOutlinedIcon
                  fontSize="medium"
                  color="secondary"
                />
                <Typography variant="p" color="primary" fontWeight="500">
                  {firstName + " " + lastName}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="p" color="primary" fontWeight="500">
                {specialization}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="p" color="#21252987">
                {cuim}
              </Typography>
            </Grid>

            <Grid item xs={3}>
              <DocumentsWideButton
                sx={{ maxWidth: "fit-content", minWidth: "75%" }}
                onClick={() => onClickSeeDocuments(doctorId)}
              >
                Vezi documente
              </DocumentsWideButton>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}

export default DoctorSearchResultCard;

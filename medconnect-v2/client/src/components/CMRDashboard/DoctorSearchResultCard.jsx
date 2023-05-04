import React from "react";
import { Card, Grid, CardContent, Box, Typography } from "@mui/material";
import MedicalInformationOutlinedIcon from "@mui/icons-material/MedicalInformationOutlined";
import { DocumentsWideButton } from "../DoctorDashboard/DoctorDashboard.styles";

function DoctorSearchResultCard() {
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
                  Numele Medicului
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="p" color="primary" fontWeight="500">
                Specializarea
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="p" color="#21252987">
                1234567890ABCDE
              </Typography>
            </Grid>

            <Grid item xs={3}>
              <DocumentsWideButton sx={{ maxWidth: "70%", minWidth: "70%" }}>
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

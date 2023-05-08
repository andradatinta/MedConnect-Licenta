import React, { useState } from "react";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import { CardContent, Card, Grid, Typography, Box } from "@mui/material";
import { DocumentsWideButton } from "../DoctorDashboard/DoctorDashboard.styles";
import ValidateDocumentModal from "./ValidateDocumentModal";

function CMRUploadedFileCard({
  fileName,
  uploadDate,
  fileValidationStatus,
  selectedDoctorData,
}) {
  const [isValidateDocumentOpen, setIsValidateDocumentOpen] = useState(false);
  const handleValidateDocumentOpen = () => {
    setIsValidateDocumentOpen(true);
  };

  const handleValidateDocumentClose = () => {
    setIsValidateDocumentOpen(false);
  };

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
            <Grid item xs={2}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.3rem",
                }}
              >
                <DescriptionOutlinedIcon fontSize="small" color="secondary" />
                <Typography variant="p" color="primary">
                  {fileName}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="p" color="primary">
                {uploadDate}
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <DocumentsWideButton
                onClick={handleValidateDocumentOpen}
                sx={{
                  maxWidth: "fit-content",
                  minWidth: "75%",
                  fontSize: "14px",
                }}
              >
                Validează
              </DocumentsWideButton>
            </Grid>
            {fileValidationStatus ? (
              <Grid item xs={1} textAlign="right">
                <Typography variant="p" color="#22E41B">
                  Validat
                </Typography>
              </Grid>
            ) : (
              <Grid item xs={1} textAlign="right">
                <Typography variant="p" color="#EF8585">
                  Invalidat
                </Typography>
              </Grid>
            )}
          </Grid>
        </CardContent>
      </Card>
      {isValidateDocumentOpen && (
        <ValidateDocumentModal
          isValidateDocumentOpen={isValidateDocumentOpen}
          handleClose={handleValidateDocumentClose}
          selectedDoctorData={selectedDoctorData}
        />
      )}
      {console.log(selectedDoctorData)}
    </>
  );
}

export default CMRUploadedFileCard;

import React, { useContext, useState } from "react";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import { CardContent, Card, Grid, Typography, Box } from "@mui/material";
import { DocumentsWideButton } from "../DoctorDashboard/DoctorDashboard.styles";
import ValidateDocumentModal from "./ValidateDocumentModal";
import { API_URL } from "../../utils/constants";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";

function CMRUploadedFileCard({
  fileName,
  uploadDate,
  fileValidationStatus,
  selectedDoctorData,
  fileUrl,
  fileId,
  setRefresh,
}) {
  const [isValidateDocumentOpen, setIsValidateDocumentOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const handleValidateDocumentOpen = (event) => {
    event.stopPropagation();
    setIsValidateDocumentOpen(true);
  };

  const handleValidateDocumentClose = () => {
    setIsValidateDocumentOpen(false);
  };

  const handleCardClick = () => {
    window.open(fileUrl, "_blank");
  };

  // Inside your CMRUploadedFileCard component...

  const validateDocument = async () => {
    try {
      const url = `${API_URL}/files/${fileId}`;
      const response = await axios.put(
        url,
        {
          validated: true,
          validationDate: new Date(),
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (response.status === 200) {
        console.log("Document validation successful");
        handleValidateDocumentClose();
        setRefresh((prevRefresh) => prevRefresh + 1);
        // You might also want to fetch the updated document data here,
        // or trigger some other update in your UI.
      }
    } catch (error) {
      console.error("Error during document validation:", error);
    }
  };

  return (
    <>
      <Card
        onClick={handleCardClick}
        sx={{
          backgroundColor: "#FFFFFFCC",
          borderRadius: "10px",
          "&:hover": {
            cursor: "pointer",
          },
        }}
      >
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
                onClick={(event) => handleValidateDocumentOpen(event)}
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
          validateDocument={validateDocument}
        />
      )}
      {console.log(selectedDoctorData)}
    </>
  );
}

export default CMRUploadedFileCard;

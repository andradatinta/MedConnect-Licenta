import React from "react";
import {
  Grid,
  Dialog,
  DialogContent,
  Box,
  Typography,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

function ValidateDocumentModal({
  handleClose,
  isValidateDocumentOpen,
  selectedDoctorData,
  validateDocument,
  processedCredits,
}) {
  return (
    <>
      <Dialog
        open={isValidateDocumentOpen}
        onClose={handleClose}
        scroll="paper"
        maxWidth="md"
      >
        <DialogContent>
          <Box display="flex" justifyContent="flex-end">
            <CloseIcon
              fontSize="large"
              opacity="0.3"
              onClick={handleClose}
              sx={{ cursor: "pointer" }}
            />
          </Box>
          <Grid
            container
            display="flex"
            justifyContent="center"
            alignItems="center"
            columnGap="6rem"
            padding="3rem 6rem"
          >
            <Grid item xs={5}>
              <Typography
                variant="h4"
                color="primary"
                sx={{
                  textTransform: "none",
                  fontWeight: "500",
                  marginBottom: "0.8rem",
                }}
              >
                Nume
              </Typography>
              <Typography color="#21252987" sx={{ marginBottom: "1rem" }}>
                {selectedDoctorData?.lastName}
              </Typography>
              <Typography
                variant="h4"
                color="primary"
                sx={{
                  textTransform: "none",
                  fontWeight: "500",
                  marginBottom: "0.8rem",
                }}
              >
                Credite EMC
              </Typography>
              <Typography color="#21252987" sx={{ marginBottom: "1rem" }}>
                {`${processedCredits} EMC`}
              </Typography>
              <Typography
                variant="h4"
                color="primary"
                sx={{
                  textTransform: "none",
                  fontWeight: "500",
                  marginBottom: "0.8rem",
                }}
              >
                Eveniment
              </Typography>
              <Typography color="#21252987" sx={{ marginBottom: "1rem" }}>
                Actualități în farmacologie și farmacoterapie
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography
                variant="h4"
                color="primary"
                sx={{
                  textTransform: "none",
                  fontWeight: "500",
                  marginBottom: "0.8rem",
                }}
              >
                Prenume
              </Typography>
              <Typography color="#21252987" sx={{ marginBottom: "1rem" }}>
                {selectedDoctorData?.firstName}
              </Typography>
              <Typography
                variant="h4"
                color="primary"
                sx={{
                  textTransform: "none",
                  fontWeight: "500",
                  marginBottom: "0.8rem",
                }}
              >
                CUIM
              </Typography>
              <Typography color="#21252987" sx={{ marginBottom: "1rem" }}>
                {selectedDoctorData?.cuim}
              </Typography>
              <Typography
                variant="h4"
                color="primary"
                sx={{
                  textTransform: "none",
                  fontWeight: "500",
                  marginBottom: "0.8rem",
                }}
              >
                Data & ora
              </Typography>
              <Typography color="#21252987">xx/xx/2023</Typography>
              <Typography color="#21252987" sx={{ marginBottom: "1rem" }}>
                15:00
              </Typography>
            </Grid>
            {/* <Grid item xs={12}>
            <Button
              variant="contained"
              color="secondary"
              sx={{ maxWidth: "40%" }}
            ></Button>
          </Grid> */}
          </Grid>
          <Grid container>
            <Grid item xs={12} display="flex" justifyContent="center">
              <Button
                variant="contained"
                color="secondary"
                onClick={validateDocument}
                sx={{ maxWidth: "70%" }}
              >
                Validează documentul
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ValidateDocumentModal;

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

function EventDetailsModal({
  isDetailsOpen,
  handleClose,
  description,
  dateTime,
  location,
  contactEmail,
  handleOpenJoinEventModal,
  showSignUpButton,
}) {
  return (
    <>
      <Dialog
        open={isDetailsOpen}
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
          <Typography
            variant="h4"
            color="secondary"
            sx={{
              textTransform: "none",
              fontWeight: "500",
              marginBottom: "0.8rem",
            }}
          >
            Locație
          </Typography>
          <Typography
            color="primary"
            marginBottom="1rem"
            sx={{ marginBottom: "1rem" }}
          >
            {location}
          </Typography>
          <Typography
            variant="h4"
            color="secondary"
            sx={{
              textTransform: "none",
              fontWeight: "500",
              marginBottom: "0.8rem",
            }}
          >
            Data & ora
          </Typography>
          <Typography color="primary" sx={{ marginBottom: "1rem" }}>
            {new Date(dateTime).toLocaleString("en-GB")}
          </Typography>
          <Typography
            variant="h4"
            color="secondary"
            sx={{
              textTransform: "none",
              fontWeight: "500",
              marginBottom: "0.8rem",
            }}
          >
            Detalii
          </Typography>
          <Typography color="primary" sx={{ marginBottom: "1rem" }}>
            {description}
          </Typography>
          <Typography
            variant="h4"
            color="secondary"
            sx={{
              textTransform: "none",
              fontWeight: "500",
              marginBottom: "0.8rem",
            }}
          >
            Contact
          </Typography>
          <Typography color="primary" sx={{ marginBottom: "1rem" }}>
            {contactEmail}
          </Typography>
        </DialogContent>
        <DialogActions>
          {!showSignUpButton ? (
            <Button onClick={handleOpenJoinEventModal} color="secondary">
              Înscrie-te
            </Button>
          ) : null}
        </DialogActions>
      </Dialog>
    </>
  );
}

export default EventDetailsModal;

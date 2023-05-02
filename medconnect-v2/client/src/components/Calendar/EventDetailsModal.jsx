import React from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

function EventDetailsModal({ isDetailsOpen, handleClose }) {
  return (
    <>
      <Dialog
        open={isDetailsOpen}
        onClose={handleClose}
        scroll="paper"
        maxWidth="md"
      >
        {/* <DialogTitle>Detalii</DialogTitle> */}
        <DialogContent>
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
            Lorem ipsum dolor sit amet
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
            Data
          </Typography>
          <Typography color="primary" sx={{ marginBottom: "1rem" }}>
            xx/xx/xxxx
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
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incidid ut labore et dolore magna aliqua. Ut enim ad
            min. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incidid ut labore et dolore magna aliqua. Ut enim ad
            min. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incidid ut labore et dolore magna aliqua. Ut enim ad
            min. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incidid ut labore et dolore magna aliqua. Ut enim ad
            min. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incidid ut labore et dolore magna aliqua. Ut enim ad
            min. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incidid ut labore et dolore magna aliqua. Ut enim ad
            min. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incidid ut labore et dolore magna aliqua. Ut enim ad
            min. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incidid ut labore et dolore magna aliqua. Ut enim ad
            min. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incidid ut labore et dolore magna aliqua. Ut enim ad
            min. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incidid ut labore et dolore magna aliqua. Ut enim ad
            min. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incidid ut labore et dolore magna aliqua. Ut enim ad
            min. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incidid ut labore et dolore magna aliqua. Ut enim ad
            min.
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
            Lorem ipsum dolor sit amet
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Înscrie-te
          </Button>
          <Button onClick={handleClose} color="primary">
            Închide
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default EventDetailsModal;

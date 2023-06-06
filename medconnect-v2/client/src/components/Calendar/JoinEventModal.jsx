import { React, useContext } from "react";
import {
  Dialog,
  Box,
  DialogContent,
  Typography,
  Button,
  Grid,
} from "@mui/material";
import { AuthContext } from "../../contexts/AuthContext";
import CloseIcon from "@mui/icons-material/Close";

function JoinEventModal({
  isJoinEventOpen,
  handleClose,
  handleConfirmSignUp,
  eventName,
  eventId,
  dateTime,
  eventSignUpStatus,
}) {
  const { user } = useContext(AuthContext);
  // Depending on signupStatus, render different content
  let modalContent;
  switch (eventSignUpStatus) {
    case "success":
      modalContent = (
        <Typography
          variant="h4"
          color="primary"
          sx={{
            textTransform: "none",
            fontWeight: "500",
            marginBottom: "0.8rem",
          }}
        >
          You have successfully signed up for the event!
        </Typography>
      );
      break;
    case "failed":
      modalContent = (
        <Typography
          variant="h4"
          color="primary"
          sx={{
            textTransform: "none",
            fontWeight: "500",
            marginBottom: "0.8rem",
          }}
        >
          Could not sign up for the event. Please try again later.
        </Typography>
      );
      break;
    default:
      modalContent = null;
  }

  return (
    <>
      <Dialog
        open={isJoinEventOpen}
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
          {eventSignUpStatus === "idle" ? (
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
                  {user.lastName}
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
                  Email
                </Typography>
                <Typography color="#21252987" sx={{ marginBottom: "1rem" }}>
                  {user.email}
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
                  {eventName}
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
                  {user.firstName}
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
                  {user.cuim}
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
                {/* <Typography color="#21252987">xx/xx/2023</Typography> */}
                <Typography color="#21252987" sx={{ marginBottom: "1rem" }}>
                  {new Date(dateTime).toLocaleString("en-GB")}
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
          ) : (
            modalContent
          )}
          {eventSignUpStatus === "idle" ? (
            <Grid container>
              <Grid item xs={12} display="flex" justifyContent="center">
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleConfirmSignUp}
                  sx={{ maxWidth: "70%" }}
                >
                  Confirmă inscrierea
                </Button>
              </Grid>
            </Grid>
          ) : null}
        </DialogContent>
        {/* <DialogActions>
          <Box
            sx={{ display: "flex", justifyContent: "center", width: "100%" }}
          >
            <Button
              variant="contained"
              color="secondary"
              sx={{ maxWidth: "70%" }}
            >
              Confirma inscrierea
            </Button>
          </Box>
          {/* <Button onClick={handleClose} color="primary">
            Închide
          </Button> */}
        {/* </DialogActions> */}
      </Dialog>
    </>
  );
}

export default JoinEventModal;

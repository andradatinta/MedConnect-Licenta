import {
  Card,
  CardContent,
  Grid,
  Typography,
  Box,
  Button,
} from "@mui/material";
import { React, useState, useContext } from "react";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import EventDetailsModal from "./EventDetailsModal";
import JoinEventModal from "./JoinEventModal";
import { API_URL } from "../../utils/constants";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";
import { CircularProgress } from "@mui/material";

function CalendarEventCard({
  showSignUpButton,
  eventId,
  eventName,
  dateTime,
  description,
  location,
  credits,
  contactEmail,
  imageUrl,
  specialization,
}) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isJoinEventOpen, setIsJoinEventOpen] = useState(false);
  const [eventSignUpStatus, setEventSignUpStatus] = useState("idle");
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const { user } = useContext(AuthContext);
  const handleDetailsOpen = () => {
    setIsDetailsOpen(true);
  };

  const handleDetailsClose = () => {
    setIsDetailsOpen(false);
  };
  const handleJoinEventOpen = () => {
    setIsJoinEventOpen(true);
  };

  const handleJoinEventClose = () => {
    setIsJoinEventOpen(false);
  };
  const handleOpenJoinEventModal = () => {
    handleDetailsClose(); // Close EventDetailsModal
    handleJoinEventOpen(); // Open JoinEventModal
  };

  const handleConfirmSignUp = async () => {
    try {
      // Get the user's token from the AuthContext
      const token = user.token;

      // Make a POST request to the /user/event/signup endpoint
      // Include the eventId in the request body, and include the user's token in the Authorization header
      const response = await axios.post(
        `${API_URL}/users/eventSignUp`,
        { eventId: eventId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // If the request was successful, show a success message
      if (response.data.success) {
        // alert("You have successfully signed up for the event!");
        setEventSignUpStatus("success");
      }
    } catch (error) {
      // If the request failed (for example, because the user has already signed up for the event), show an error message
      // alert("Could not sign up for the event: " + error.response.data.message);
      setEventSignUpStatus("failed");
    }
  };

  return (
    <>
      <Card>
        <CardContent sx={{ minHeight: "11.7rem" }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <Box
                  sx={{
                    width: "50%",
                    height: "auto",
                    flex: 1,
                    position: "relative", // add this
                    display: "flex", // add this
                    justifyContent: "center", // add this
                    alignItems: "center", // add this
                  }}
                >
                  {!isImageLoaded && (
                    <CircularProgress sx={{ animationDuration: "0.3s" }} />
                  )}

                  <img
                    src={imageUrl}
                    alt="Event Presentation"
                    onLoad={() => setIsImageLoaded(true)} // add this
                    style={{
                      width: "100%",
                      height: "auto",
                      borderRadius: "30px",
                      display: isImageLoaded ? "block" : "none", // add this
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flex: 1,
                    flexDirection: "column",
                    textAlign: "center",
                    alignItems: "flex-start",
                    gap: "0.4rem",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <CalendarMonthOutlinedIcon
                      color="secondary"
                      sx={{ marginRight: "0.3rem" }}
                    />
                    <Typography variant="p" color="primary">
                      {new Date(dateTime).toLocaleDateString("en-GB")}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <StarBorderOutlinedIcon
                      color="secondary"
                      sx={{ marginRight: "0.3rem" }}
                    />
                    <Typography variant="p" color="primary">
                      {`${credits} EMC`}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} textAlign="center">
              {eventName.length > 30 ? (
                <Typography variant="h5">{eventName}</Typography>
              ) : (
                <Typography variant="h5" marginBottom="1.1rem">
                  {eventName}
                </Typography>
              )}
            </Grid>
            <Grid
              item
              xs={12}
              display="flex"
              justifyContent="center"
              alignItems="center"
              gap="1rem"
            >
              <Button
                variant="outlined"
                size="small"
                onClick={handleDetailsOpen}
                sx={{ maxWidth: "30%" }}
              >
                Detalii
              </Button>
              {!showSignUpButton ? (
                <Button
                  variant="contained"
                  size="small"
                  onClick={handleJoinEventOpen}
                  sx={{ maxWidth: "30%" }}
                >
                  Înscrie-te
                </Button>
              ) : null}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      {isDetailsOpen && (
        <EventDetailsModal
          isDetailsOpen={isDetailsOpen}
          handleClose={handleDetailsClose}
          handleOpenJoinEventModal={handleOpenJoinEventModal}
          description={description}
          dateTime={dateTime}
          location={location}
          contactEmail={contactEmail}
          showSignUpButton={showSignUpButton}
        />
      )}
      {isJoinEventOpen && (
        <JoinEventModal
          isJoinEventOpen={isJoinEventOpen}
          handleClose={handleJoinEventClose}
          handleConfirmSignUp={handleConfirmSignUp}
          eventName={eventName}
          eventId={eventId}
          dateTime={dateTime}
          eventSignUpStatus={eventSignUpStatus}
        />
      )}
    </>
  );
}

export default CalendarEventCard;

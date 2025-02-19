import { React, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  TextField,
  Container,
  Button,
} from "@mui/material";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext } from "react";
import ChangePasswordModal from "./ChangePasswordModal";
import ChangeEmailModal from "./ChangeEmailModal";

function SettingsContent() {
  const { user } = useContext(AuthContext);
  const [openPasswordModal, setOpenPasswordModal] = useState(false);
  const [openEmailModal, setOpenEmailModal] = useState(false);

  const handleOpenPasswordModal = () => {
    setOpenPasswordModal(true);
  };

  const handleClosePasswordModal = () => {
    setOpenPasswordModal(false);
  };

  const handleOpenEmailModal = () => {
    setOpenEmailModal(true);
  };

  const handleCloseEmailModal = () => {
    setOpenEmailModal(false);
  };
  return (
    <>
      <Box sx={{ marginLeft: "6rem", marginTop: "1rem" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "1.25rem",
          }}
        >
          <Typography variant="h3" fontWeight="500">
            Setări
          </Typography>
          <Container
            maxWidth="md"
            sx={{
              minHeight: "78vh",
            }}
          >
            <Grid
              container
              spacing={3}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Grid item xs={6} md={6}>
                <TextField
                  label="Email"
                  value={user.email}
                  variant="outlined"
                  InputProps={{
                    readOnly: true,
                    style: { color: "gray" },
                  }}
                  fullWidth
                />
              </Grid>
              <Grid item xs={6} md={2}>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={handleOpenEmailModal}
                >
                  Modifică
                </Button>
              </Grid>
              <Grid item xs={6} md={6}>
                <TextField
                  label="Parolă"
                  value="Ascunsă pentru securitate"
                  variant="outlined"
                  InputProps={{
                    readOnly: true,
                    style: { color: "gray" },
                  }}
                  fullWidth
                />
              </Grid>
              <Grid item xs={6} md={2}>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={handleOpenPasswordModal}
                >
                  Modifică
                </Button>
              </Grid>
            </Grid>
            {openPasswordModal && (
              <ChangePasswordModal
                open={openPasswordModal}
                handleClose={handleClosePasswordModal}
              />
            )}
            {openEmailModal && (
              <ChangeEmailModal
                open={openEmailModal}
                handleClose={handleCloseEmailModal}
              />
            )}
          </Container>
        </Box>
      </Box>
    </>
  );
}

export default SettingsContent;

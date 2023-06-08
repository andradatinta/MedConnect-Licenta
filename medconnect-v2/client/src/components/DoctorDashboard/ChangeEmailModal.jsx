import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useContext, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { AuthContext } from "../../contexts/AuthContext";

function ChangeEmailModal({ open, handleClose }) {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { updateEmail, error: authError } = useContext(AuthContext); // You need to implement updatePassword

  const onSubmit = async (data) => {
    const response = await updateEmail(data);
    if (response.error) {
      // Handle error (maybe use a useState hook to display the error in the modal)
      setErrorMessage(response.message);
    } else {
      // Handle success (maybe use a useState hook to display the success message in the modal)
      setSuccessMessage(response.message);
      setTimeout(handleClose, 3000);
      // handleClose();
    }
  };

  const handleCloseAndClear = () => {
    setErrorMessage(null);
    setSuccessMessage(null);
    handleClose();
  };
  return (
    <>
      <Dialog open={open} onClose={handleCloseAndClear}>
        <DialogTitle>Modifică email</DialogTitle>

        <DialogContent
          sx={{
            marginTop: "1.5rem",
          }}
        >
          {successMessage && (
            <Typography
              sx={{ color: "green", textAlign: "center", marginBottom: "2rem" }}
            >
              {successMessage}
            </Typography>
          )}
          {errorMessage && (
            <Typography
              sx={{ color: "red", textAlign: "center", marginBottom: "2rem" }}
            >
              {errorMessage}
            </Typography>
          )}
          <form
            onSubmit={handleSubmit(onSubmit)}
            style={{ marginTop: "0.5rem" }}
          >
            <Grid
              container
              spacing={1}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Grid item alignItems="center" xs={12} md={12}>
                <Controller
                  name="newEmail"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: "Adresa de email nouă trebuie completată!",
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Adresa de email nouă"
                      type="email"
                      fullWidth
                      error={!!errors.newEmail}
                      helperText={errors.newEmail?.message || authError}
                    />
                  )}
                />
              </Grid>
            </Grid>

            <DialogActions sx={{ marginTop: "2rem" }}>
              <Button type="submit" color="primary">
                Confirmă
              </Button>
              <Button onClick={handleClose} color="primary">
                Anulează
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ChangeEmailModal;

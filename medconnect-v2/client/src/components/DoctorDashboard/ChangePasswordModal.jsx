import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Grid,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";

function ChangePasswordModal({ open, handleClose }) {
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm();
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const password = useRef({});
  password.current = watch("newPassword", "");

  const { updatePassword, error: authError } = useContext(AuthContext);

  const onSubmit = async ({ confirmPassword, ...data }) => {
    const response = await updatePassword(data);
    if (response.error) {
      setErrorMessage(response.message);
    } else {
      setSuccessMessage(response.message);
      setTimeout(handleClose, 3000);
    }
  };

  const handleCloseAndClear = () => {
    setErrorMessage(null);
    setSuccessMessage(null);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleCloseAndClear}>
      <DialogTitle>Modifică parola</DialogTitle>
      <DialogContent sx={{ marginTop: "1.5rem" }}>
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
        <form onSubmit={handleSubmit(onSubmit)} style={{ marginTop: "0.5rem" }}>
          <Grid
            container
            spacing={3}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Grid item alignItems="center" xs={8}>
              <Controller
                name="oldPassword"
                control={control}
                defaultValue=""
                rules={{ required: "Parola curentă trebuie completată!" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Parola curentă"
                    type="password"
                    fullWidth
                    error={!!errors.oldPassword}
                    helperText={errors.oldPassword?.message || authError}
                  />
                )}
              />
            </Grid>
            <Grid item alignItems="center" xs={8}>
              <Controller
                name="newPassword"
                control={control}
                defaultValue=""
                rules={{
                  required: "Parola nouă trebuie completată!",
                  minLength: {
                    value: 8,
                    message: "Parola trebuie să aibă cel puțin 8 caractere!",
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Parola nouă"
                    type="password"
                    fullWidth
                    error={!!errors.newPassword}
                    helperText={errors.newPassword?.message || authError}
                  />
                )}
              />
            </Grid>
            <Grid item alignItems="center" xs={8}>
              <Controller
                name="confirmPassword"
                control={control}
                defaultValue=""
                rules={{
                  required: "Confirmarea parolei trebuie completată!",
                  validate: (value) =>
                    value === password.current || "Parolele nu corespund!",
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Confirmă noua parolă"
                    type="password"
                    fullWidth
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword?.message}
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
  );
}

export default ChangePasswordModal;

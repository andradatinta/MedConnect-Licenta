import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Grid,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useContext, useRef } from "react";
import { AuthContext } from "../../contexts/AuthContext";

function ChangePasswordModal({ open, handleClose }) {
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm();
  const password = useRef({});
  password.current = watch("newPassword", "");

  const { updatePassword, error: authError } = useContext(AuthContext); // You need to implement updatePassword

  const onSubmit = async ({ confirmPassword, ...data }) => {
    await updatePassword(data);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Modifica parola</DialogTitle>
      <DialogContent sx={{ marginTop: "1.5rem" }}>
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
                rules={{ required: "Old password is required" }}
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
                rules={{ required: "New password is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Parola noua"
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
                  required: "Confirm password is required",
                  validate: (value) =>
                    value === password.current || "The passwords do not match",
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Confirm New Password"
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
              Confirma
            </Button>
            <Button onClick={handleClose} color="primary">
              Anuleaza
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default ChangePasswordModal;

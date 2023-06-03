import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";
import { useContext } from "react";
import { Controller, useForm } from "react-hook-form";
import { AuthContext } from "../../contexts/AuthContext";

function ChangeEmailModal({ open, handleClose }) {
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm();
  // const password = useRef({});
  // password.current = watch("newEmail", "");

  const { updateEmail, error: authError } = useContext(AuthContext); // You need to implement updatePassword

  const onSubmit = async (data) => {
    await updateEmail(data);
    handleClose();
  };
  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Modifică email</DialogTitle>

        <DialogContent
          sx={{
            marginTop: "1.5rem",
          }}
        >
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
                  rules={{ required: "New email is required" }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Adresa de email noua"
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

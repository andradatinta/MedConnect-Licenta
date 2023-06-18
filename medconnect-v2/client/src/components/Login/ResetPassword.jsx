import { React, useState, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { Grid, TextField, Container, Button, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

function ResetPassword() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const [apiError, setApiError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const password = useRef({});
  password.current = watch("newPassword", "");

  const onSubmit = async ({ newPassword, confirmPassword }) => {
    try {
      const response = await axios.post(
        `/api/users/reset-password/${new URLSearchParams(location.search).get(
          "token"
        )}`,
        { newPassword, confirmPassword }
      );
      if (response.status === 200) {
        navigate("/login");
      }
    } catch (error) {
      setApiError("An error occurred while trying to reset your password.");
    }
  };

  return (
    <Container maxWidth="md">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid
          container
          spacing={3}
          direction="column"
          alignItems="center"
          justifyContent="center"
          style={{ minHeight: "100vh" }}
        >
          {apiError && (
            <Grid item xs={12}>
              <p style={{ color: "red", textAlign: "center" }}>{apiError}</p>
            </Grid>
          )}
          <Grid item xs={12}>
            <Typography variant="h6" fontWeight="400">
              Introduceți noua parolă dorită:
            </Typography>
          </Grid>
          <Grid item xs={10} width="60%">
            <Controller
              name="newPassword"
              control={control}
              defaultValue=""
              rules={{ required: "Password is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Parola nouă"
                  variant="outlined"
                  type="password"
                  fullWidth
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  sx={{ width: "100%" }}
                />
              )}
            />
          </Grid>
          <Grid item xs={10} width="60%">
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
                  label="Confirmă parola"
                  variant="outlined"
                  type="password"
                  fullWidth
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword?.message}
                  sx={{ width: "100%" }}
                />
              )}
            />
          </Grid>
          <Grid item xs={8}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{
                "&:hover": {
                  backgroundColor: "#0358a0",
                },
              }}
            >
              Schimbă parola
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}

export default ResetPassword;

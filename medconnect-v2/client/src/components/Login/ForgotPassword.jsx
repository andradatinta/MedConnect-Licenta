import { React, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Grid, TextField, Container, Button, Typography } from "@mui/material";
import axios from "axios";

function ForgotPassword() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [apiError, setApiError] = useState("");

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("/api/users/forgot-password", data);
      if (response.status === 200) {
        // navigate("/confirmation");
        setApiError("A password reset link has been sent to your email.");
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
              <p style={{ color: "#6F00FF", textAlign: "center" }}>
                {apiError}
              </p>
            </Grid>
          )}
          <Grid item xs={12}>
            <Typography variant="h6" fontWeight="400">
              Introduceți adresa de email corespunzătoare contului dvs:
            </Typography>
          </Grid>
          <Grid item xs={10} width="60%">
            <Controller
              name="email"
              control={control}
              defaultValue=""
              rules={{ required: "Email is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Email"
                  variant="outlined"
                  type="email"
                  fullWidth
                  error={!!errors.email}
                  helperText={errors.email?.message}
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
              Resetează parola
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}

export default ForgotPassword;

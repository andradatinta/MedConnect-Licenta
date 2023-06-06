import { React, useState, useContext, useRef } from "react";
import { Grid, TextField, Container } from "@mui/material";
import { GridWideButton } from "../LandingPageContent/LandingPageContent.styles";
import { useForm, Controller } from "react-hook-form";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function SignUpFormCMR() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { register } = useContext(AuthContext);
  const navigate = useNavigate();
  const [apiError, setApiError] = useState("");
  const password = useRef({});

  const onSubmit = async (data) => {
    if (data.password !== data.confirmPassword) {
      setApiError("Parolele nu corespund!");
      return;
    }

    const errorMessage = await register(data, "/cmr");
    if (!errorMessage) {
      navigate("/calendar");
    } else {
      setApiError(errorMessage);
    }
  };
  return (
    <Container maxWidth="sm">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          {console.log(apiError)}
          {apiError && (
            <Grid item xs={12}>
              <p style={{ color: "red", textAlign: "center" }}>{apiError}</p>
            </Grid>
          )}
          {/* First Row */}
          <Grid item xs={12} md={6}>
            <Controller
              name="lastName"
              control={control}
              defaultValue=""
              rules={{ required: "Numele trebuie completat!" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Nume"
                  variant="outlined"
                  fullWidth
                  error={!!errors.lastName}
                  helperText={errors.lastName?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Controller
              name="firstName"
              control={control}
              defaultValue=""
              rules={{ required: "Prenumele trebuie completat!" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Prenume"
                  variant="outlined"
                  fullWidth
                  error={!!errors.firstName}
                  helperText={errors.firstName?.message}
                />
              )}
            />
          </Grid>
          {/* Second Row */}
          <Grid item xs={12}>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              rules={{
                required: "Email-ul trebuie completat!",
                validate: (value) =>
                  value.endsWith("@cmr.ro") ||
                  "Invalid email domain for a CMR member account",
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Email"
                  variant="outlined"
                  type="email"
                  fullWidth
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              )}
            />
          </Grid>
          {/* Third Row */}
          <Grid item xs={12}>
            <Controller
              name="password"
              control={control}
              defaultValue=""
              rules={{ required: "Parola trebuie completată!" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Parolă"
                  variant="outlined"
                  type="password"
                  fullWidth
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  onChange={(e) => {
                    password.current = e.target.value;
                    field.onChange(e);
                  }}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
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
                  label="Confirmare Parolă"
                  variant="outlined"
                  type="password"
                  fullWidth
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword?.message}
                />
              )}
            />
          </Grid>
          <Grid
            item
            xs={12}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <GridWideButton
              type="submit"
              variant="contained"
              color="primary"
              sx={{ marginTop: "1rem", maxWidth: "100%" }}
            >
              Creează cont
            </GridWideButton>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}

export default SignUpFormCMR;

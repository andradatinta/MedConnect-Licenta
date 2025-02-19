import { React, useContext, useState, useRef } from "react";
import { Grid, TextField, Container } from "@mui/material";
import { GridWideButton } from "../LandingPageContent/LandingPageContent.styles";
import { useForm, Controller } from "react-hook-form";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function SignUpFormDoctor() {
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
    const errorMessage = await register(data, "doctor");
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
          <Grid item xs={12}>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              rules={{
                required: "Email-ul trebuie completat!",
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
          <Grid item xs={12}>
            <Controller
              name="password"
              control={control}
              defaultValue=""
              rules={{
                required: "Parola trebuie completată!",
                minLength: {
                  value: 8,
                  message: "Parola trebuie să aibă cel puțin 8 caractere!",
                },
              }}
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

          <Grid item xs={12} md={6}>
            <Controller
              name="specialization"
              control={control}
              defaultValue=""
              rules={{ required: "Specialitatea trebuie completată!" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Specializare"
                  variant="outlined"
                  fullWidth
                  error={!!errors.specialization}
                  helperText={errors.specialization?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Controller
              name="cuim"
              control={control}
              defaultValue=""
              rules={{
                required: "CUIM trebuie completat!",
                pattern: {
                  value: /^[A-Z][\w\d]{5}$/,
                  message: "CUIM invalid!",
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="CUIM"
                  variant="outlined"
                  fullWidth
                  error={!!errors.cuim}
                  helperText={errors.cuim?.message}
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

export default SignUpFormDoctor;

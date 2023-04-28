import { React, useContext, useState } from "react";
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

  const onSubmit = async (data) => {
    // register(data, "/doctor");

    const errorMessage = await register(data, "/doctor");
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
          {/* Display API error message */}
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
              rules={{ required: "Last name is required" }}
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
              rules={{ required: "First name is required" }}
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
                required: "Email is required",
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
              rules={{ required: "Password is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Parolă"
                  variant="outlined"
                  type="password"
                  fullWidth
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
              )}
            />
          </Grid>
          {/* Fourth Row */}
          <Grid item xs={12}>
            <Controller
              name="specialization"
              control={control}
              defaultValue=""
              rules={{ required: "Specialization is required" }}
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
          {/* Fifth Row */}
          <Grid item xs={12}>
            <Controller
              name="cuim"
              control={control}
              defaultValue=""
              rules={{ required: "CUIM is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="CUIM (Codul Unic de Identificare al Medicului)"
                  variant="outlined"
                  fullWidth
                  error={!!errors.cuim}
                  helperText={errors.cuim?.message}
                />
              )}
            />
          </Grid>
          {/* Submit Button */}
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

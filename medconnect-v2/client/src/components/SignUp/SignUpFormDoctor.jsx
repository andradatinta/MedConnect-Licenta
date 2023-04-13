import React from "react";
import { Grid, TextField, Container } from "@mui/material";
import { WideButton } from "../LandingPageContent/LandingPageContent.styles";

function SignUpFormDoctor() {
  return (
    <Container maxWidth="sm">
      <Grid container spacing={2}>
        {/* First Row */}
        <Grid item xs={12} md={6}>
          <TextField label="Nume" variant="outlined" fullWidth />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField label="Prenume" variant="outlined" fullWidth />
        </Grid>
        {/* Second Row */}
        <Grid item xs={12}>
          <TextField label="Email" variant="outlined" fullWidth />
        </Grid>
        {/* Third Row */}
        <Grid item xs={12}>
          <TextField
            label="Parolă"
            variant="outlined"
            fullWidth
            type="password"
          />
        </Grid>
        {/* Fourth Row */}
        <Grid item xs={12}>
          <TextField label="Specializare" variant="outlined" fullWidth />
        </Grid>
        {/* Fifth Row */}
        <Grid item xs={12}>
          <TextField
            label="CUIM (Codul Unic de Identificare al Medicului)"
            variant="outlined"
            fullWidth
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
          <WideButton
            variant="contained"
            color="primary"
            sx={{ padding: "1rem 12.5rem", marginTop: "1rem" }}
            fullWidth
          >
            Creează cont
          </WideButton>
        </Grid>
      </Grid>
    </Container>
  );
}

export default SignUpFormDoctor;

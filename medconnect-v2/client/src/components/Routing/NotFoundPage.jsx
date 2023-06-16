import React from "react";
import { Grid, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function NotFoundPage() {
  const navigate = useNavigate();

  const navigateToHome = () => {
    navigate("/");
  };

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: "100vh" }}
    >
      <Grid item xs={12}>
        <Typography
          variant="h1"
          color="primary"
          align="center"
          sx={{ mb: "1rem" }}
        >
          404
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h4" color="textSecondary" align="center">
          Pagina solicitată nu a fost găsită
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Button
          variant="contained"
          color="secondary"
          onClick={navigateToHome}
          sx={{ mt: 4, minWidth: "18.75rem !important" }}
        >
          Înapoi la pagina principală
        </Button>
      </Grid>
    </Grid>
  );
}

export default NotFoundPage;

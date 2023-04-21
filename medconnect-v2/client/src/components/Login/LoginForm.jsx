import { React, useState } from "react";
import {
  Grid,
  TextField,
  Container,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { GridWideButton } from "../LandingPageContent/LandingPageContent.styles";
import { useForm, Controller } from "react-hook-form";
import { Link } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import HelpCenterIcon from "@mui/icons-material/HelpCenter";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { login, error } = useContext(AuthContext);
  const navigate = useNavigate();
  const [apiError, setApiError] = useState("");

  const [keepMeAuthenticated, setKeepMeAuthenticated] = useState(false);

  const onSubmit = async (data) => {
    const errorMessage = await login(data);
    if (!errorMessage) {
      navigate("/calendar");
    } else {
      setApiError(errorMessage);
      console.log(error);
    }
  };
  return (
    <Container maxWidth="sm">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid
          container
          spacing={2}
          sx={{
            display: "center",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* Display API error message */}
          {console.log(apiError)}
          {apiError && (
            <Grid item xs={12}>
              <p style={{ color: "red", textAlign: "center" }}>{apiError}</p>
            </Grid>
          )}
          <Grid item alignItems="center" xs={8}>
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
                />
              )}
            />
          </Grid>
          <Grid item xs={8}>
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
          <Grid item xs={8}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginTop: "1rem", // Adjust the margin according to your layout
              }}
            >
              <HelpCenterIcon color="primary" sx={{ marginRight: "0.5rem" }} />
              <Typography component={Link} to="/reset-password" variant="p">
                Mi-am uitat parola
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={8}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={keepMeAuthenticated}
                  onChange={(event) =>
                    setKeepMeAuthenticated(event.target.checked)
                  }
                />
              }
              label="Păstrează-mă conectat"
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
              sx={{ marginTop: "1rem", maxWidth: "65%" }}
              // fullWidth
            >
              Intră în cont
            </GridWideButton>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}

export default LoginForm;

import React from "react";
import { Grid, Button, Typography } from "@mui/material";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";

function DashboardDownloadCard() {
  return (
    <>
      <Grid container flexDirection="column" alignItems="center" gap="1rem">
        <Grid item xs={12}>
          <DescriptionOutlinedIcon sx={{ fontSize: "100px", opacity: 0.1 }} />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5" fontWeight="400">
            Valabil până la xx/xx/2024
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Button
            color="secondary"
            variant="contained"
            sx={{ maxWidth: "100%" }}
          >
            Descarcă
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

export default DashboardDownloadCard;

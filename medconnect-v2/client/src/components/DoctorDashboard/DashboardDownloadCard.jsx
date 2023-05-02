import React from "react";
import axios from "axios";
import { Grid, Button, Typography } from "@mui/material";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";

function DashboardDownloadCard() {
  const handleDownloadClick = async () => {
    try {
      const response = await axios.get("/graphics/Tema_4.pdf", {
        responseType: "blob",
      });
      const url = URL.createObjectURL(response.data);

      const link = document.createElement("a");
      link.href = url;
      link.download = "aviz-test.pdf";
      link.click();

      setTimeout(() => {
        URL.revokeObjectURL(url);
      }, 100);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };
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
            onClick={handleDownloadClick}
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

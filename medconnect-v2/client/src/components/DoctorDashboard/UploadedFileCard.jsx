import React from "react";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import { CardContent, Card, Grid, Typography, Box } from "@mui/material";

function UploadedFileCard({ fileName, uploadDate, fileValidationStatus }) {
  // const isFileValidated = false;
  return (
    <>
      <Card sx={{ backgroundColor: "#FFFFFFCC", borderRadius: "10px" }}>
        <CardContent
          sx={{
            "&:last-child": {
              paddingBottom: "1rem",
            },
          }}
        >
          <Grid container justifyContent="space-between">
            <Grid item xs={3}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.3rem",
                }}
              >
                <DescriptionOutlinedIcon fontSize="small" color="secondary" />
                <Typography variant="p" color="primary">
                  {fileName}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="p" color="primary">
                {uploadDate}
              </Typography>
            </Grid>
            {fileValidationStatus ? (
              <Grid item xs={1} textAlign="right">
                <Typography variant="p" color="#22E41B">
                  Validat
                </Typography>
              </Grid>
            ) : (
              <Grid item xs={1} textAlign="right">
                <Typography variant="p" color="#EF8585">
                  Invalidat
                </Typography>
              </Grid>
            )}
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}

export default UploadedFileCard;

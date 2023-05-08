import { React } from "react";
import { Typography, Grid, Card, CardContent, Box } from "@mui/material";
import CMRUploadedFileCard from "./CMRUploadedFileCard";

function SelectedDoctorDocuments({ selectedDoctorData }) {
  return (
    <>
      <Grid item xs={12} md={12}>
        <Card sx={{ backgroundColor: "#F8F9FA", height: "510px" }}>
          <CardContent>
            <Grid container flexDirection="column" gap="1rem">
              <Grid
                item
                xs={12}
                marginBottom="0.5rem"
                marginLeft="1.5rem"
                marginRight="1.5rem"
              >
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="p" color="primary" fontWeight="500">
                    Fisier
                  </Typography>
                  <Typography variant="p" color="primary" fontWeight="500">
                    Data incarcarii
                  </Typography>
                  <Typography variant="p" color="primary" fontWeight="500">
                    Validare
                  </Typography>
                  <Typography variant="p" color="primary" fontWeight="500">
                    Status
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <CMRUploadedFileCard
                  fileName="fisierul_meu"
                  uploadDate="23/03/2023"
                  fileValidationStatus={true}
                  selectedDoctorData={selectedDoctorData}
                />
              </Grid>
              <Grid item xs={12}>
                <CMRUploadedFileCard
                  fileName="diploma1"
                  uploadDate="03/03/2023"
                  fileValidationStatus={false}
                  selectedDoctorData={selectedDoctorData}
                />
              </Grid>
              <Grid item xs={12}>
                <CMRUploadedFileCard
                  fileName="document_cu_nume_mai_lung"
                  uploadDate="25/07/2022"
                  fileValidationStatus={true}
                  selectedDoctorData={selectedDoctorData}
                />
              </Grid>
              <Grid item xs={12}>
                <CMRUploadedFileCard
                  fileName="document_cu_nume_mai_lung"
                  uploadDate="25/07/2022"
                  fileValidationStatus={true}
                  selectedDoctorData={selectedDoctorData}
                />
              </Grid>
              <Grid item xs={12}>
                <CMRUploadedFileCard
                  fileName="document_cu_nume_mai_lung"
                  uploadDate="25/07/2022"
                  fileValidationStatus={true}
                  selectedDoctorData={selectedDoctorData}
                />
              </Grid>
              {/* <Grid item xs={12}>
                <UploadedFileCard
                  fileName="document_cu_nume_mai_lung"
                  uploadDate="25/07/2022"
                  fileValidationStatus={true}
                />
              </Grid> */}
              <Box flexGrow={1}></Box>

              <Grid
                item
                xs={12}
                alignSelf="center"
                marginTop="0.3rem"
                justifySelf="flex-end"
              >
                <Typography variant="p">Paginare</Typography>
              </Grid>
            </Grid>
          </CardContent>
          {/* <Grid
            container
            display="flex"
            alignItems="center"
            justifyContent="flex-end"
          >
            <Grid item xs={12} marginTop="0.3rem">
              <Typography variant="p">Paginare</Typography>
            </Grid>
          </Grid> */}
        </Card>
      </Grid>
    </>
  );
}

export default SelectedDoctorDocuments;

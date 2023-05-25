import { React, useState } from "react";
import { Typography, Grid, Card, CardContent, Box } from "@mui/material";
import CMRUploadedFileCard from "./CMRUploadedFileCard";
import { useGetUserDocuments } from "./DoctorsContent";
import PaginationContainer from "./PaginationContainer";

function SelectedDoctorDocuments({ selectedDoctorData, selectedDoctorId }) {
  const [page, setPage] = useState(1);
  const documents = useGetUserDocuments(selectedDoctorId, page);
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
              {documents.files &&
                documents.files.map((document) => (
                  <Grid item xs={12} key={document._id}>
                    <CMRUploadedFileCard
                      fileName={document.filename}
                      uploadDate={new Date(
                        document.uploadDate
                      ).toLocaleDateString("en-GB")}
                      fileUrl={document.fileUrl}
                      fileId={document.fileId}
                      fileValidationStatus={document.validated}
                      selectedDoctorData={selectedDoctorData}
                    />
                  </Grid>
                ))}
              {/* <Grid item xs={12}>
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
              </Grid> */}
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
                <PaginationContainer
                  page={page}
                  limit={documents.limit ? documents.limit : 0}
                  totalResults={
                    documents.totalFetchedFiles
                      ? documents.totalFetchedFiles
                      : 0
                  }
                  setPage={(page) => setPage(page)}
                />
                {/* <PaginationContainer /> */}
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

import { React, useState } from "react";
import { Typography, Grid, Card, CardContent, Box } from "@mui/material";
import CMRUploadedFileCard from "./CMRUploadedFileCard";
import { useGetUserDocuments } from "./DoctorsContent";
import PaginationContainer from "./PaginationContainer";

function SelectedDoctorDocuments({ selectedDoctorData, selectedDoctorId }) {
  const [page, setPage] = useState(1);
  const [refresh, setRefresh] = useState(0);
  const documents = useGetUserDocuments(selectedDoctorId, page, refresh);
  return (
    <>
      <Grid item xs={12} md={12}>
        <Card
          sx={{
            backgroundColor: "#F8F9FA",
            maxHeight: "500px",
            minHeight: "500px",
            position: "relative",
          }}
        >
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
                    Fișier
                  </Typography>
                  <Typography variant="p" color="primary" fontWeight="500">
                    Data încărcării
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
                      fileId={document._id}
                      processedCredits={document.extractedCredits}
                      fileValidationStatus={document.validated}
                      selectedDoctorData={selectedDoctorData}
                      setRefresh={setRefresh}
                    />
                  </Grid>
                ))}

              <Grid
                item
                xs={12}
                alignSelf="center"
                marginTop="0.3rem"
                justifySelf="flex-end"
                sx={{
                  position: "absolute",
                  bottom: "5px",
                  width: "100%",
                }}
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
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </>
  );
}

export default SelectedDoctorDocuments;

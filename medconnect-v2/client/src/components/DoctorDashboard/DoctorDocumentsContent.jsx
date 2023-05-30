import { React, useRef, useState, useContext, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import UploadedFileCard from "./UploadedFileCard";
import axios from "axios";
import { API_URL } from "../../utils/constants";
import { AuthContext } from "../../contexts/AuthContext";
import PaginationContainer from "../CMRDashboard/PaginationContainer";

export function useGetUserFiles(user, page, refresh) {
  const [filesData, setFilesData] = useState([]);

  useEffect(() => {
    const getFiles = async () => {
      try {
        if (user && user._id) {
          const response = await axios.get(
            `${API_URL}/files/getUserFiles/${user._id}?page=${page}`,
            {
              headers: {
                Authorization: `Bearer ${user.token}`,
              },
            }
          );
          setFilesData(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getFiles();
  }, [user, page, refresh]);

  return filesData;
}

function DoctorDocumentsContent() {
  const fileInputRef = useRef();
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [page, setPage] = useState(1);
  const [refresh, setRefresh] = useState(0); // new state variable for triggering a refresh
  const { user } = useContext(AuthContext);
  const userFilesData = useGetUserFiles(user, page, refresh);
  console.log(userFilesData);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  // const handleFileUpload = (event) => {
  //   // Implement the file upload logic here, e.g., send it to your server
  //   console.log("Uploading file:", selectedFile);
  //   event.stopPropagation();
  // };

  const handleFileUpload = async (event) => {
    // Prevent event bubbling if necessary
    event.stopPropagation();

    // Implement the file upload logic here
    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      const url = `${API_URL}/files/upload`;

      // Send it to your server
      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${user.token}`,
        },
      });

      // Use the response data
      console.log("File uploaded successfully:", response.data);
      setUploadStatus("success");
      setRefresh(refresh + 1); // Trigger a refresh
    } catch (error) {
      console.log("Error during file upload:", error);
      setUploadStatus("error");
    }
  };

  return (
    <>
      <Box sx={{ marginLeft: "6rem", marginTop: "1rem" }}>
        {/* whole content box above */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "1.25rem",
          }}
        >
          <Typography variant="h3" fontWeight="500">
            Documentele mele
          </Typography>
        </Box>
        <Grid
          container
          spacing={2}
          sx={{
            // backgroundColor: "blue",
            marginTop: "1rem",
          }}
        >
          <Grid item xs={12}>
            <Card
              sx={{
                backgroundColor: "#F8F9FA",
                maxHeight: "25vh",
                minHeight: "25vh",
              }}
            >
              <CardContent onClick={handleClick} sx={{ cursor: "pointer" }}>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />
                <Grid
                  container
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Grid item xs={12} marginBottom="0.5rem">
                    <FileUploadOutlinedIcon
                      sx={{ fontSize: "90px", opacity: 0.1 }}
                    />
                  </Grid>
                  {uploadStatus === "success" ? (
                    <Typography variant="p" color="primary" fontWeight="500">
                      Fișierul a fost încărcat!
                    </Typography>
                  ) : selectedFile ? (
                    <Grid
                      item
                      xs={12}
                      container
                      justifyContent="center"
                      alignItems="center"
                      gap="1rem"
                    >
                      <Typography
                        variant="p"
                        color="primary"
                        sx={{
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          maxWidth: "70%",
                        }}
                      >
                        {selectedFile.name}
                      </Typography>
                      <Button
                        color="secondary"
                        variant="contained"
                        size="small"
                        onClick={handleFileUpload}
                        sx={{ maxWidth: "10%" }}
                      >
                        Încarcă
                      </Button>
                    </Grid>
                  ) : (
                    <Grid item xs={12}>
                      <Typography variant="p" color="primary" fontWeight="400">
                        Apasă aici pentru a încărca fișiere
                      </Typography>
                    </Grid>
                  )}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card
              sx={{
                backgroundColor: "#F8F9FA",
                maxHeight: "50vh",
                minHeight: "50vh",
              }}
            >
              <CardContent>
                <Grid container flexDirection="column">
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
                        Status
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    {userFilesData &&
                      userFilesData.files &&
                      userFilesData.files.map((file) => (
                        <Grid item xs={12} key={file._id} marginBottom="1rem">
                          <UploadedFileCard
                            fileId={file._id}
                            fileName={file.filename}
                            fileUrl={file.fileUrl}
                            uploadDate={new Date(
                              file.uploadDate
                            ).toLocaleDateString("en-GB")}
                            fileValidationStatus={file.validated}
                          />
                        </Grid>
                      ))}
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    alignSelf="center"
                    marginTop="0.3rem"
                    sx={{ position: "absolute", bottom: "5px" }}
                  >
                    <PaginationContainer
                      page={page}
                      limit={userFilesData.limit ? userFilesData.limit : 0}
                      totalResults={
                        userFilesData.totalFetchedFiles
                          ? userFilesData.totalFetchedFiles
                          : 0
                      }
                      setPage={(page) => setPage(page)}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default DoctorDocumentsContent;

import { React, useState, useEffect } from "react";
import { Box, Typography, Grid } from "@mui/material";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import { API_URL } from "../../utils/constants";
import DoctorSearchResultContainer from "./DoctorSearchResultContainer";
import NoDoctorSearchResult from "./NoDoctorSearchResult";
import SelectedDoctorDocuments from "./SelectedDoctorDocuments";

export function useGetSearchedUsers(searchQuery) {
  const [searchedUsers, setSearchedUsers] = useState([]);

  useEffect(() => {
    const fetchSearchedUsers = async () => {
      try {
        const url = `${API_URL}/users/searchedUsers?search=${searchQuery}`;
        const response = await axios.get(url);
        setSearchedUsers(response.data);
      } catch (error) {
        console.error("Error fetching searched doctors:", error);
      }
    };

    if (searchQuery) {
      fetchSearchedUsers();
    } else {
      setSearchedUsers([]);
    }
  }, [searchQuery]);

  return searchedUsers;
}

export function useGetSelectedUserData(selectedDoctorId) {
  const [selectedDoctorData, setSelectedDoctorData] = useState(null);

  useEffect(() => {
    const fetchSelectedDoctorData = async () => {
      try {
        const url = `${API_URL}/users/${selectedDoctorId}`;
        const response = await axios.get(url);
        setSelectedDoctorData(response.data);
      } catch (error) {
        console.error("Error fetching selected doctor data:", error);
      }
    };

    if (selectedDoctorId) {
      fetchSelectedDoctorData();
    } else {
      setSelectedDoctorData(null);
    }
  }, [selectedDoctorId]);

  return selectedDoctorData;
}

function DoctorsContent() {
  const [searchText, setSearchText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchAttempted, setSearchAttempted] = useState(false);
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);
  const searchedUsers = useGetSearchedUsers(searchQuery);
  const selectedDoctorData = useGetSelectedUserData(selectedDoctorId);
  const handleSeeDocumentsClick = (doctorId) => {
    setSelectedDoctorId(doctorId);
  };

  const handleSearch = () => {
    setSearchQuery(searchText);
    setSearchAttempted(true);
    setSelectedDoctorId(null);
  };

  // useGetSearchedUsers();
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
          {selectedDoctorData ? (
            <Typography variant="h3" fontWeight="500">
              {selectedDoctorData.firstName + " " + selectedDoctorData.lastName}
            </Typography>
          ) : (
            <Typography variant="h3" fontWeight="500">
              Medici înregistrați
            </Typography>
          )}
        </Box>
        <Grid
          container
          spacing={2}
          sx={{
            // backgroundColor: "blue",
            marginTop: "1rem",
          }}
        >
          <Grid item xs={12} md={12}>
            <TextField
              label="Caută un medic..."
              fullWidth={true}
              value={searchText}
              // placeholder="Caută un medic..."
              onChange={(e) => setSearchText(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleSearch}>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          {selectedDoctorId ? (
            <SelectedDoctorDocuments selectedDoctorData={selectedDoctorData} />
          ) : (
            <Grid item xs={12} md={12}>
              {searchedUsers.length > 0 ? (
                <DoctorSearchResultContainer
                  searchedUsersResult={searchedUsers}
                  onClickSeeDocuments={handleSeeDocumentsClick}
                />
              ) : searchAttempted ? (
                <NoDoctorSearchResult />
              ) : null}
            </Grid>
          )}
        </Grid>
      </Box>
    </>
  );
}

export default DoctorsContent;

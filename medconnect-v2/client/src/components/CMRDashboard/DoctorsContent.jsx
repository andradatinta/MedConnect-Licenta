import { React, useState, useEffect } from "react";
import { Box, Typography, Grid } from "@mui/material";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import DoctorSearchResultCard from "./DoctorSearchResultCard";
import axios from "axios";
import { API_URL } from "../../utils/constants";
import DoctorSearchResultContainer from "./DoctorSearchResultContainer";

function useGetSearchedUsers(searchQuery) {
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

function DoctorsContent() {
  // const base_url = API_URL;
  const [searchText, setSearchText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const searchedUsers = useGetSearchedUsers(searchQuery);

  const handleSearch = () => {
    setSearchQuery(searchText);
  };

  useGetSearchedUsers();
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
            Medici înregistrați
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
          <Grid item xs={12} md={12}>
            {/* {searchedUsers.map((doctor) => (
              <DoctorSearchResultCard
                key={doctor._id}
                lastName={doctor.lastName}
                firstName={doctor.firstName}
                specialization={doctor.specialization}
                cuim={doctor.cuim}
                // de adaugat documentele lui
              />
            ))} */}
            <DoctorSearchResultContainer searchedUsersResult={searchedUsers} />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default DoctorsContent;

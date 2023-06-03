import { React, useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  FormGroup,
  Checkbox,
  Grid,
  Box,
} from "@mui/material";
import { Refresh as RefreshIcon } from "@mui/icons-material";
import { FilterControlLabel } from "./CalendarContent.styles";
import { specializations } from "../../utils/constants";
import { monthNames } from "../../utils/constants";
function FilterMenu2({ onFilterChange }) {
  const [selectedSpecializations, setSelectedSpecializations] = useState([]);
  const [selectedMonths, setSelectedMonths] = useState([]);

  const handleChecked = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedSpecializations((prev) => [...prev, value]);
    } else {
      setSelectedSpecializations((prev) =>
        prev.filter((item) => item !== value)
      );
    }
  };

  const handleMonthChecked = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedMonths((prev) => [...prev, value]);
    } else {
      setSelectedMonths((prev) => prev.filter((item) => item !== value));
    }
  };

  useEffect(() => {
    onFilterChange(selectedSpecializations, selectedMonths);
  }, [selectedSpecializations, onFilterChange, selectedMonths]);
  return (
    <>
      <Card
        sx={{
          borderRadius: "1rem",
          padding: "1rem",
          height: "calc(100vh - 128px)",
          width: "100%",
          // overflowY: "scroll",
        }}
      >
        <CardContent
          sx={{
            // backgroundColor: "blue",
            height: "100%",
            // display: "column",
            // justifyContent: "space-between",
            padding: "0",
          }}
        >
          <Typography variant="h6" textTransform="uppercase">
            Filtre
          </Typography>
          <Box
            sx={{
              height: "50%",
              overflowY: "scroll",
              marginBottom: "0.8rem",
              "&::-webkit-scrollbar": {
                width: "10px",
              },
              "&::-webkit-scrollbar-track": {
                background: "#f1f1f1",
                marginTop: "1rem",
              },
              "&::-webkit-scrollbar-thumb": {
                background: "#888",
                borderRadius: "30px",
              },
              "&::-webkit-scrollbar-thumb:hover": {
                background: "#555",
              },
            }}
          >
            <Box display="flex" alignItems="center">
              <Typography variant="h5">Specialitate</Typography>
              <IconButton onClick={() => setSelectedSpecializations([])}>
                <RefreshIcon fontSize="small" />
              </IconButton>
            </Box>
            <FormGroup
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                width: "100%",
              }}
            >
              {specializations.map((specialization) => (
                <FilterControlLabel
                  key={specialization}
                  control={
                    <Checkbox
                      size="small"
                      value={specialization}
                      onChange={handleChecked}
                      checked={selectedSpecializations.includes(specialization)}
                    />
                  }
                  label={specialization}
                />
              ))}
            </FormGroup>
          </Box>
          <Box sx={{ height: "50%", marginBottom: "0.8rem" }}>
            <Box display="flex" alignItems="center">
              <Typography variant="h5">Lună</Typography>
              <IconButton onClick={() => setSelectedMonths([])}>
                <RefreshIcon fontSize="small" />
              </IconButton>
            </Box>
            <Grid container spacing={2}>
              <Grid item md={6}>
                <FormGroup>
                  {monthNames.slice(0, 6).map((month, index) => (
                    <FilterControlLabel
                      key={month}
                      control={
                        <Checkbox
                          size="small"
                          value={month}
                          onChange={handleMonthChecked}
                          checked={selectedMonths.includes(month)}
                        />
                      }
                      label={month}
                    />
                  ))}
                </FormGroup>
              </Grid>
              <Grid item md={6}>
                <FormGroup>
                  {monthNames.slice(6).map((month, index) => (
                    <FilterControlLabel
                      key={month}
                      control={
                        <Checkbox
                          size="small"
                          value={month}
                          onChange={handleMonthChecked}
                          checked={selectedMonths.includes(month)}
                        />
                      }
                      label={month}
                    />
                  ))}
                </FormGroup>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>
    </>
  );
}

export default FilterMenu2;

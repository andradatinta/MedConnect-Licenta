import React from "react";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Grid,
  Box,
} from "@mui/material";
import { Refresh as RefreshIcon } from "@mui/icons-material";
import { FilterControlLabel } from "./CalendarContent.styles";
function FilterMenu2() {
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
            sx={{ height: "50%", overflowY: "scroll", marginBottom: "0.8rem" }}
          >
            <Box display="flex" alignItems="center">
              <Typography variant="h5">Specialitate</Typography>
              <IconButton>
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
              <FilterControlLabel
                control={<Checkbox size="small" />}
                label="Alergologie și imunologie clinică"
              />
              <FilterControlLabel
                control={<Checkbox size="small" />}
                label="Alergologie și imunologie clinică"
              />
              <FilterControlLabel
                control={<Checkbox size="small" />}
                label="Alergologie și imunologie clinică"
              />
              <FilterControlLabel
                control={<Checkbox size="small" />}
                label="Alergologie și imunologie clinică"
              />
              <FilterControlLabel
                control={<Checkbox size="small" />}
                label="Alergologie și imunologie clinică"
              />
              <FilterControlLabel
                control={<Checkbox size="small" />}
                label="Alergologie și imunologie clinică"
              />
              <FilterControlLabel
                control={<Checkbox size="small" />}
                label="Alergologie și imunologie clinică"
              />
              <FilterControlLabel
                control={<Checkbox size="small" />}
                label="Alergologie și imunologie clinică"
              />
            </FormGroup>
          </Box>
          <Box sx={{ height: "50%", marginBottom: "0.8rem" }}>
            <Box display="flex" alignItems="center">
              <Typography variant="h5">Lună</Typography>
              <IconButton>
                <RefreshIcon fontSize="small" />
              </IconButton>
            </Box>
            <Grid container spacing={2}>
              <Grid item md={6}>
                <FormGroup>
                  <FilterControlLabel
                    control={<Checkbox size="small" />}
                    label="Ianuarie"
                  />
                  <FilterControlLabel
                    control={<Checkbox size="small" />}
                    label="Februarie"
                  />
                  <FilterControlLabel
                    control={<Checkbox size="small" />}
                    label="Martie"
                  />
                  <FilterControlLabel
                    control={<Checkbox size="small" />}
                    label="Aprilie"
                  />
                  <FilterControlLabel
                    control={<Checkbox size="small" />}
                    label="Mai"
                  />
                  <FilterControlLabel
                    control={<Checkbox size="small" />}
                    label="Iunie"
                  />
                </FormGroup>
              </Grid>
              <Grid item md={6}>
                <FormGroup>
                  <FilterControlLabel
                    control={<Checkbox size="small" />}
                    label="Iulie"
                  />
                  <FilterControlLabel
                    control={<Checkbox size="small" />}
                    label="August"
                  />
                  <FilterControlLabel
                    control={<Checkbox size="small" />}
                    label="Septembrie"
                  />
                  <FilterControlLabel
                    control={<Checkbox size="small" />}
                    label="Octombrie"
                  />
                  <FilterControlLabel
                    control={<Checkbox size="small" />}
                    label="Noiembrie"
                  />
                  <FilterControlLabel
                    control={<Checkbox size="small" />}
                    label="Decembrie"
                  />
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

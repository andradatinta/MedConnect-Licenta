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
} from "@mui/material";
import { Refresh as RefreshIcon } from "@mui/icons-material";
import { FilterControlLabel } from "./CalendarContent.styles";
function FilterMenu() {
  return (
    <>
      <Card
        sx={{
          borderRadius: "1rem",
          padding: "1rem",
          height: "calc(100vh - 128px)",
          width: "100%",
          overflowY: "scroll",
        }}
      >
        <CardContent>
          <Typography variant="h6">Filtre</Typography>
          <Grid
            container
            spacing={2}
            direction="column"
            sx={{
              marginTop: "1rem",
              marginBottom: "1rem",
              height: "100%",
            }}
          >
            <Grid item sx={{ flex: 1 }}>
              <Typography variant="subtitle1">Specialitate</Typography>
              <IconButton>
                <RefreshIcon fontSize="small" />
              </IconButton>
              <FormGroup
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  width: "100%",
                  // maxHeight: "50%",
                  // overflowY: "scroll",
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
            </Grid>
            <Grid item marginTop="1rem" marginBottom="1rem" sx={{ flex: 1 }}>
              <Typography variant="subtitle1">Lună</Typography>
              <IconButton>
                <RefreshIcon fontSize="small" />
              </IconButton>

              <Grid container>
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
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}

export default FilterMenu;

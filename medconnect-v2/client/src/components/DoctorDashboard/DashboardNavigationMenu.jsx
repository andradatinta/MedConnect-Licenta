import { React, useState, useEffect, useContext } from "react";
import { Card, CardContent, Typography, Grid, Box } from "@mui/material";
import DashboardMenuButtons from "./DashboardMenuButtons";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import CMRDashboardMenuButtons from "../CMRDashboard/CMRDashboardMenuButtons";

function DashboardNavigationMenu() {
  const [selectedButton, setSelectedButton] = useState("");
  const { user } = useContext(AuthContext);
  const location = useLocation();

  useEffect(() => {
    const currentRoute = location.pathname;

    switch (currentRoute) {
      case "/doctor":
        setSelectedButton("progres");
        break;
      case "/doctor/documents":
        setSelectedButton("documents");
        break;
      case "/doctor/upcoming":
        setSelectedButton("upcomingEvents");
        break;
      case "/doctor/settings":
        setSelectedButton("settings");
        break;
      case "/cmr":
        setSelectedButton("doctors");
        break;
      case "/cmr/settings":
        setSelectedButton("settings");
        break;
      default:
        setSelectedButton("");
    }
  }, [location.pathname, user]);

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
          <Grid container>
            <Grid item xs={12} marginLeft="0.5rem" marginBottom="0.3rem">
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.6rem",
                }}
              >
                <AccountCircleOutlinedIcon
                  fontSize="medium"
                  color="secondary"
                />
                <Typography
                  variant="h6"
                  textTransform="uppercase"
                  sx={{ textTransform: "none", fontSize: "1.1rem" }}
                >
                  {user.firstName + " " + user.lastName}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} marginBottom="2.5rem" marginLeft="0.5rem">
              <Typography
                variant="p"
                sx={{
                  letterSpacing: "0.16px",
                  color: "#000000",
                  opacity: "0.5",
                }}
              >
                {user.specialization}
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            {user.type === "doctor" ? (
              <DashboardMenuButtons selectedButton={selectedButton} />
            ) : (
              <CMRDashboardMenuButtons selectedButton={selectedButton} />
            )}
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}

export default DashboardNavigationMenu;

import { React, useContext, useEffect, useState } from "react";
import axios from "axios";
import { Grid, Button, Typography } from "@mui/material";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import { AuthContext } from "../../contexts/AuthContext";
import { API_URL } from "../../utils/constants";

export function useGetUserAccreditationDate(user) {
  const [accreditationDate, setAccreditationDate] = useState(null);

  useEffect(() => {
    const fetchAccreditationDate = async () => {
      try {
        const url = `${API_URL}/users/${user._id}/accreditation`;
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        let fetchedAccreditationDate = new Date(
          response.data.accreditationDate
        );
        fetchedAccreditationDate.setFullYear(
          fetchedAccreditationDate.getFullYear() + 5
        );
        setAccreditationDate(
          fetchedAccreditationDate.toLocaleDateString("en-GB")
        );
      } catch (error) {
        console.error("Error fetching accreditation date:", error);
      }
    };

    if (user) {
      fetchAccreditationDate();
    }
  }, [user]);

  return accreditationDate;
}

function DashboardDownloadCard() {
  const { user } = useContext(AuthContext);
  const accreditationDate = useGetUserAccreditationDate(user);

  const handleDownloadClick = async () => {
    try {
      const response = await axios.get("/graphics/Tema_4.pdf", {
        responseType: "blob",
      });
      const url = URL.createObjectURL(response.data);

      const link = document.createElement("a");
      link.href = url;
      link.download = "aviz-test.pdf";
      link.click();

      setTimeout(() => {
        URL.revokeObjectURL(url);
      }, 100);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  return (
    <>
      <Grid container flexDirection="column" alignItems="center" gap="1rem">
        <Grid item xs={12}>
          <DescriptionOutlinedIcon sx={{ fontSize: "100px", opacity: 0.1 }} />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5" fontWeight="400">
            Valabil până la {accreditationDate}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Button
            color="secondary"
            variant="contained"
            onClick={handleDownloadClick}
            sx={{ maxWidth: "100%" }}
          >
            Descarcă
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

export default DashboardDownloadCard;

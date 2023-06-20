import React from "react";
import AboutUsCard from "./AboutUsCard";
import CMRMemberLandingPage from "./CMRMemberLandingPage";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Grid } from "@mui/material";

function AboutUs() {
  const isMediumLarge = useMediaQuery("(max-width:1225px)");
  return (
    <>
      <Grid
        container
        direction={isMediumLarge ? "column" : "row"}
        justifyContent="center"
        alignItems="center"
        spacing={2}
        sx={{ marginTop: "3.75rem" }}
      >
        <Grid
          item
          xs={7}
          sm={3}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <AboutUsCard
            iconUrl="/graphics/calendar-about-us.svg"
            title="Calendarul Evenimentelor"
            description="Ai acces la calendarul evenimentelor EMC locale, naționale și
            internaționale, la care te poți înscrie direct cu
            MedConnect."
          />
        </Grid>
        <Grid
          item
          xs={7}
          sm={3}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <AboutUsCard
            iconUrl="/graphics/credits-about-us.svg"
            title="Managementul"
            description="Ține evidența digitală a punctajului tău și fii informat cu privire la numărul
            de credite necesar pentru a atinge minimul."
            breakLineTitle="creditelor EMC"
          />
        </Grid>
        <Grid
          item
          xs={7}
          sm={3}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <AboutUsCard
            iconUrl="/graphics/cmr-about-us.svg"
            title="Acreditare eficientă"
            description="În calitate de membru CMR, validează mai rapid punctajele medicilor pentru
            obținerea avizului lor de practică."
          />
        </Grid>
      </Grid>
      <CMRMemberLandingPage />
    </>
  );
}

export default AboutUs;

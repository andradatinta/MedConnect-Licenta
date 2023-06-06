import React from "react";
import AboutUsCard from "./AboutUsCard";
import CMRMemberLandingPage from "./CMRMemberLandingPage";

import { Grid } from "@mui/material";

function AboutUs() {
  return (
    <>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        spacing={2}
        sx={{ marginTop: "3.75rem" }}
      >
        <Grid
          item
          xs={7}
          sm={3}
          // xl={2}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <AboutUsCard
            iconUrl="/graphics/calendar-about-us.svg"
            title="Calendarul Evenimentelor"
            description="Ai acces la calendarul evenimentelor EMC locale, naționale și
            internaționale, la care te poți înscrie direct prin intermediul
            MedConnect."
          />
        </Grid>
        <Grid
          item
          xs={7}
          sm={3}
          // xl={2}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <AboutUsCard
            iconUrl="/graphics/credits-about-us.svg"
            title="Managementul"
            description="Ține evidența digitală a punctajului tău și fii notificat cu privire la numărul
            de credite necesar pentru a atinge minimul, timpul rămas până la următoarea evaluare
            profesională etc."
            breakLineTitle="creditelor EMC"
          />
        </Grid>
        <Grid
          item
          xs={7}
          sm={3}
          // xl={2}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <AboutUsCard
            iconUrl="/graphics/cmr-about-us.svg"
            title="Acreditare eficientă"
            description="În calitate de membru CMR, validează mai rapid punctajele medicilor pentru
            obținerea avizului anual de practică."
          />
        </Grid>
      </Grid>
      <CMRMemberLandingPage />
    </>
  );
}

export default AboutUs;

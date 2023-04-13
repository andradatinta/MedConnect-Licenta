import React from "react";
import AboutUsCard from "./AboutUsCard";

import { CustomCentered } from "./LandingPageContent.styles";
import CMRMemberLandingPage from "./CMRMemberLandingPage";

function AboutUs() {
  return (
    <>
      <CustomCentered sx={{ gap: "80px", marginTop: "3.75rem" }}>
        <AboutUsCard
          iconUrl="/graphics/calendar-about-us.svg"
          title="Calendarul Evenimentelor"
          description="Ai acces la calendarul evenimentelor EMC locale, naționale și
          internaționale, la care te poți înscrie direct prin intermediul
          MedConnect."
        />
        <AboutUsCard
          iconUrl="/graphics/credits-about-us.svg"
          title="Managementul"
          description="Ține evidența digitală a punctajului tău și fii notificat cu privire la numărul
          de credite necesar pentru a atinge minimul, timpul rămas până la următoarea evaluare
          profesională etc."
          breakLineTitle="creditelor EMC"
        />
        <AboutUsCard
          iconUrl="/graphics/cmr-about-us.svg"
          title="Acreditare eficientă"
          description="În calitate de membru CMR, validează mai rapid punctajele medicilor pentru
          obținerea avizului anual de practică."
        />
      </CustomCentered>
      <CMRMemberLandingPage />
    </>
  );
}

export default AboutUs;

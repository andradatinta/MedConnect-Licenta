import React from "react";
import NavBar from "../components/NavBar/NavBar";
// import LandingPageContent from "../components/LandingPageContent/LandingPageContent";
import LandingPageContentGrid from "../components/LandingPageContent/LandingPageContentGrid";
import AboutUs from "../components/LandingPageContent/AboutUs";
import Footer from "../components/LandingPageContent/Footer";

function LandingPage() {
  return (
    <>
      <NavBar />
      <LandingPageContentGrid />
      <AboutUs />
      <Footer />
    </>
  );
}

export default LandingPage;

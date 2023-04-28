import React from "react";
import NavBar from "../components/NavBar/NavBar";
import DoctorDashboardContent from "../components/DoctorDashboard/DoctorDashboardContent";

function DoctorDashboard() {
  return (
    <>
      <NavBar />
      <DoctorDashboardContent />
      {/* {clickedOption === "progres" ? <ProgressContent /> : <div>Lol</div>} */}
      {/* <Outlet /> */}
    </>
  );
}

export default DoctorDashboard;

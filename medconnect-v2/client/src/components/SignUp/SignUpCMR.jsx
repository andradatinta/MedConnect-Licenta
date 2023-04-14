import React from "react";
import NavBar from "../NavBar/NavBar";
import SignUpContent from "./SignUpContent";

function SignUpCMR() {
  return (
    <>
      <NavBar />
      <SignUpContent isDoctor={false} />
    </>
  );
}

export default SignUpCMR;

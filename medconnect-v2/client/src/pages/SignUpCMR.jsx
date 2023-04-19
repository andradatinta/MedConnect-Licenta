import React from "react";
import NavBar from "../components/NavBar/NavBar";
import SignUpContent from "../components/SignUp/SignUpContent";

function SignUpCMR() {
  return (
    <>
      <NavBar />
      <SignUpContent isDoctor={false} />
    </>
  );
}

export default SignUpCMR;

import React from "react";
import NavBar from "../components/NavBar/NavBar";
import SignUpContent from "../components/SignUp/SignUpContent";

function SignUpDoctor() {
  return (
    <>
      <NavBar />
      <SignUpContent isDoctor={true} />
    </>
  );
}

export default SignUpDoctor;

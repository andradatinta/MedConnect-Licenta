import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { Container, Typography } from "@mui/material";
// import { Card, CardContent } from "@mui/material";
export const FullViewportContainer = styled(Container)(({ theme }) => ({
  height: "calc(100vh - 64px)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  boxSizing: "border-box",
  width: "100%",
}));

export const ImageBox = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

export const FormHeading = styled(Typography)(({ theme }) => ({
  marginBottom: "2rem",
  fontWeight: "500",
  fontSize: "2.5rem",
  textAlign: "center",
}));
// export const CenteredHeaderAndImage = styled(Box)(({ theme }) => ({
//   height: "calc(100vh - 128px)",
//   width: "100%",
//   display: "flex",
//   flexWrap: "wrap",
//   // backgroundColor: "grey",
//   alignItems: "center",
//   justifyContent: "space-between",
//   paddingLeft: "10rem",
//   paddingRight: "10rem",
//   boxSizing: "border-box",
// }));

import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { Container, Button } from "@mui/material";
// import { Card, CardContent } from "@mui/material";

export const MainContainer = styled(Box)(({ theme }) => ({
  height: "calc(100vh - 128px)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  boxSizing: "border-box",
  width: "100%",
  paddingLeft: "5rem",
  paddingRight: "5rem",
}));

export const CMRLandingContainer = styled(Box)(({ theme }) => ({
  // width: "100%",
  display: "flex",
  flexWrap: "wrap",
  // backgroundColor: "grey",
  alignItems: "center",
  justifyContent: "center",
  paddingLeft: "10rem",
  paddingRight: "10rem",
  boxSizing: "border-box",
}));

export const FlexColumn = styled(Box)(({ theme }) => ({
  flexBasis: "50%",
  maxWidth: "550px",
}));

export const FlexColumnImage = styled(Box)(({ theme }) => ({
  flexBasis: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

export const MarginBottomBig = styled(Box)(({ theme }) => ({
  marginBottom: "2rem",
}));

export const CustomCentered = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginBottom: "2rem",
}));

export const AboutUsCardsContainer = styled(Container)(({ theme }) => ({
  display: "flex",
  // justifyContent: "center",
  alignItems: "center",
  boxSizing: "border-box",
  flexDirection: "column",
  paddingLeft: "0px",
  paddingRight: "0px",
}));
// export const AboutUsCardsContainer = styled(Container)(({ theme }) => ({
//   display: "grid",
//   gridTemplateRows: "auto 1fr auto",
//   height: "100%",
//   boxSizing: "border-box",
//   paddingLeft: "0px",
//   paddingRight: "0px",
// }));

export const WideButton = styled(Button)(({ theme }) => ({
  boxShadow: "5px 5px 15px #00000029",
  textAlign: "center",
  backgroundColor: "#6F00FF",
  color: "#ffffff",
  // width: "279px",
  // height: "61px",
  width: "fit-content",
  maxWidth: "575px",
  fontSize: "16px",
  padding: "10px 30px",
  letterSpacing: "0.63px",
  "&:hover": {
    backgroundColor: "#8C33FF",
    cursor: "pointer",
  },
}));

export const GridWideButton = styled(Button)(({ theme }) => ({
  boxShadow: "5px 5px 15px #00000029",
  textAlign: "center",
  backgroundColor: "#6F00FF",
  color: "#ffffff",
  width: "100%",
  fontSize: "16px",
  padding: "10px 0",
  letterSpacing: "0.63px",
  "&:hover": {
    backgroundColor: "#8C33FF",
    cursor: "pointer",
  },
}));

export const FooterLinkButton = styled(Button)(({ theme }) => ({
  backgroundColor: "transparent",
  color: "#ffffff",
  padding: 0,
  "&:hover": {
    backgroundColor: "transparent",
    cursor: "pointer",
  },
}));

// export const AboutUsCard = styled(CardContent)(({ theme }) => ({
//   background: "#F8F9FA 0% 0% no-repeat padding-box",
//   boxShadow: "0px 3px 6px #00000029",
//   borderRadius: "30px",
//   opacity: "1",
// }));

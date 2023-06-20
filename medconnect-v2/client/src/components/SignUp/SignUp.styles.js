import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { Container, Typography } from "@mui/material";
export const FullViewportContainer = styled(Container)(({ theme }) => ({
  minHeight: "calc(100vh - 64px)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  boxSizing: "border-box",
  width: "100%",
  "@media (max-width: 768px)": {
    minHeight: "calc(100vh - 64px)",
  },
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

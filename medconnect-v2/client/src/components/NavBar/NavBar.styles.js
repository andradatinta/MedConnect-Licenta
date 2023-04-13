import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

export const NavBarButton = styled(Button)(({ theme }) => ({
  backgroundColor: "transparent",
  color: "#034694",
}));

export const NavigationLinks = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "20px",
}));

export const NavigationAccount = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "20px",
  marginLeft: "80px",
}));

import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export const NavigationLinks = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "20px",
}));

export const NavigationAccount = styled(Box)(({ theme }) => {
  const currentTheme = useTheme();
  const isScreenSmall = useMediaQuery(currentTheme.breakpoints.down("md"));
  return {
    display: "flex",
    gap: "20px",
    marginLeft: isScreenSmall ? "0px" : "80px",
  };
});

import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";

export const DashboardMenuButton = styled(({ isSelected, ...other }) => (
  <Button {...other} />
))(({ theme, isSelected }) => ({
  // padding: "6px 20px",
  minWidth: "100%",
  maxWidth: "100%",
  justifyContent: "flex-start",
  textTransform: "none",
  backgroundColor: isSelected ? "#ffffff" : "#F8F9FA",
  boxShadow: isSelected ? "3px 3px 15px #00000029" : "none",
  borderRadius: "15px",
  border: isSelected ? "1.5px solid #7070701A" : "none",
  opacity: "1",
  color: "#034694",
  "&:hover": {
    boxShadow: "3px 3px 20px #00000029",
    backgroundColor: "#FFFFFFCC",
  },
}));

export const ProgressSelectToggleButton = styled(({ isSelected, ...other }) => (
  <Button {...other} />
))(({ theme, isSelected }) => ({
  // padding: "6px 20px",
  minWidth: "4rem",
  maxWidth: "80%",
  textTransform: "none",
  backgroundColor: isSelected ? "#034694" : "#F8F9FA",
  boxShadow: "5px 5px 15px #00000029",
  borderRadius: "30px",
  opacity: "1",
  color: isSelected ? "#ffffff" : "#2125297A",
  "&:hover": {
    boxShadow: "8px 8px 20px #00000040",
    backgroundColor: isSelected ? "#034694" : "#F8F9FA",
  },
}));

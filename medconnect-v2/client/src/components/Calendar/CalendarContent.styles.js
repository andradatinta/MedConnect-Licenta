// CalendarContent.styles.js
import { styled } from "@mui/system";
import {
  Button,
  DialogContent,
  FormControlLabel,
  Typography,
} from "@mui/material";

export const CalendarSelectToggleButton = styled(({ isSelected, ...other }) => (
  <Button {...other} />
))(({ theme, isSelected }) => ({
  padding: "6px 20px",
  minWidth: "9.68rem",
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

export const FilterControlLabelTypography = styled(Typography)({
  fontSize: "0.8rem ",
  color: "#212529",
  // whiteSpace: "nowrap",
  "@media (max-width: 600px)": {
    fontSize: "0.45rem !important",
  },
  "@media (max-width: 480px)": {
    fontSize: "0.4rem !important",
  },
  textOverflow: "ellipsis",
  // overflow: "hidden",
});

export const FilterControlLabel = (props) => (
  <FormControlLabel
    {...props}
    sx={{
      marginBottom: "3px",
    }}
    label={
      <FilterControlLabelTypography>{props.label}</FilterControlLabelTypography>
    }
  />
);

export const DetailsDialogContent = styled(DialogContent)({
  display: "flex",
  alignItems: "center",
});

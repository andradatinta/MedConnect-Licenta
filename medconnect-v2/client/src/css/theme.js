import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: "3rem",
      textAlign: "left",
      fontWeight: "600",
      color: "#034694",
      lineHeight: "56px",
    },
    h2: {
      fontSize: "1.87rem",
      color: "#034694",
      fontWeight: "500",
    },
    h3: {
      fontSize: "1.56rem",
      color: "#034694",
      lineHeight: "2rem",
    },

    h4: {
      fontSize: "1.25rem",
      color: "#034694",
      lineHeight: "2rem",
      textTransform: "uppercase",
      letterSpacing: "0.3px",
    },
    h5: {
      fontSize: "1rem",
      color: "#034694",
      fontWeight: "500",
    },
    p: {
      fontSize: "1rem",
      // color: "#034694",
    },
  },
  palette: {
    primary: {
      main: "#034694",
    },
    secondary: {
      main: "#6F00FF",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none !important",
          borderRadius: "30px",
        },
        containedSizeMedium: {
          boxShadow: "5px 5px 15px #00000029",
          textAlign: "center",
          color: "#ffffff",
          // width: "279px",
          // height: "61px",
          width: "fit-content",
          maxWidth: "200px",
          fontSize: "16px",
          padding: "8px 16px",
          letterSpacing: "0.63px",
          "&:hover": {
            backgroundColor: "#8C33FF",
            cursor: "pointer",
          },
        },
        containedSizeLarge: {
          boxShadow: "5px 5px 15px #00000029",
          textAlign: "center",
          color: "#ffffff",
          // width: "279px",
          // height: "61px",
          width: "fit-content",
          maxWidth: "200px",
          fontSize: "16px",
          padding: "12px 44px",
          letterSpacing: "0.63px",
          "&:hover": {
            backgroundColor: "#8C33FF",
            cursor: "pointer",
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          // Custom styles for IconButton, e.g., disable hover effect
          "&:hover": {
            backgroundColor: "transparent",
            cursor: "pointer",
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: "none",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "#F8F9FA",
          boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.29)",
          borderRadius: "30px",
          opacity: 1,
          width: "300px",
          height: "330px",
        },
      },
    },
  },
});

export default theme;

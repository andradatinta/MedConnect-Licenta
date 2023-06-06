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
    h6: {
      color: "#034694",
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
          fontSize: "16px", // adjust as needed
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
          width: "100%",
          maxWidth: "35%",
          fontSize: "16px",
          padding: "12px 0",
          letterSpacing: "0.63px",
          "&:hover": {
            backgroundColor: "#8C33FF",
            cursor: "pointer",
          },
        },
        containedSizeSmall: {
          textTransform: "none",
          backgroundColor: "#6F00FF",
          boxShadow: "5px 5px 15px #00000029",
          borderRadius: "30px",
          border: "#7070701A",
          opacity: "1",
          color: "#ffffff",
          "&:hover": {
            boxShadow: "5px 5px 15px #00000040",
            backgroundColor: "#8C33FF",
          },
          width: "100%",
          fontSize: "10px",
          padding: "8px 4px",
          letterSpacing: "0.63px",
        },
        outlinedSizeSmall: {
          textTransform: "none",
          backgroundColor: "#F8F9FA",
          boxShadow: "5px 5px 15px #00000029",
          borderRadius: "30px",
          border: "#7070701A",
          opacity: "1",
          color: "#034694",
          "&:hover": {
            boxShadow: "5px 5px 15px #00000040",
            backgroundColor: "#F8F9FA",
            border: "#7070701A",
          },
          width: "100%",
          fontSize: "10px",
          padding: "8px 4px",
          letterSpacing: "0.63px",
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
          // width: "300px",
          // height: "330px",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: "15px",
          },
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
          textDecoration: "none",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "1rem",
          color: "#034694",
          fontWeight: "500",
        },
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        label: {
          fontSize: "1rem",
          color: "#034694",
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          background: "#F8F9FA 0% 0% no-repeat padding-box",
          opacity: 1,
          borderRadius: "30px",
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          "&::-webkit-scrollbar": {
            width: "10px",
          },
          "&::-webkit-scrollbar-track": {
            background: "#f1f1f1",
            marginTop: "1rem",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#888",
            borderRadius: "30px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            background: "#555",
          },
          padding: "2rem 4rem",
        },
      },
    },
  },
});

export default theme;

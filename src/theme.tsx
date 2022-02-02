import { createTheme } from "@mui/material/styles"

export const theme = createTheme({
  components: {
    // Name of the component
    MuiButton: {
      styleOverrides: {
        // Name of the rule
        root: {
          color: "#ffffff", // Some CSS
          textDecoration: "none",
          "&:hover": {
            background: "rgba(255,255,255,0.15)",
          },
        },
      },
    },
    MuiPaginationItem: {
      styleOverrides: {
        root: {
          color: "#ffffff",
          background: "rgba(255,255,255,0.15)",
          textDecoration: "none",
          "&:hover": {
            background: "rgba(255,255,255,0.3)",
          },
          "&:selected": {
            background: "red",
          },
        },
      },
    },
  },

  typography: {
    fontFamily: "'Barlow', sans-serif",
  },
  palette: {
    mode: "light",
    // primary: {
    //   main: "#1DB954",
    // },
    // secondary: {
    //   main: "#edf2ff",
    // },
  },
})

import { createTheme } from "@mui/material/styles"

export const theme = createTheme({
  components: {
    // Name of the component
    MuiButton: {
      styleOverrides: {
        // Name of the rule
        root: {
          color: "#ffffff", // Some CSS
          "&:hover": {
            background: "rgba(255,255,255,0.15)",
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

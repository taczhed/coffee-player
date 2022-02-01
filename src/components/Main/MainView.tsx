import { Grid, Box, Container } from "@mui/material"
import useSpotifyAuth from "../../hooks/useSpotifyAuth"
import Application from "./Application/Application"
import Navigation from "../Navigation/Navigation"
// import { useTheme } from "@mui/material/styles"
const background = require("../../assets/background/gradient1.jpeg")

const MainView = () => {
  // const theme = useTheme()

  return (
    <Box
      sx={{
        backgroundImage: `url(${background})`,
        width: "100%",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Grid
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          overflow: "hidden",
          height: "100%",
          width: "100%",
          borderRadius: 0,
          // md and more do bottom
          //md={10}
          // [theme.breakpoints.up("md")]: {
          //   height: "80%",
          //   borderRadius: 12,
          //   background: `rgba(255,255,255,0.15)`,
          // },
        }}
      >
        <Navigation />
        <Application />
      </Grid>
    </Box>
  )
}

export default MainView

import { Box } from "@mui/material"
import Application from "./Application/Application"
import Navigation from "../Navigation/Navigation"
import auth from "../../auth.json"
import SpotifyWebApi from "spotify-web-api-node"
import useSpotifyAuth from "../../hooks/useSpotifyAuth"
import { useCookies } from "react-cookie"
const background = require("../../assets/background/gradient1.jpeg")
const code = new URLSearchParams(window.location.search).get("code")

const MainView = () => {
  useSpotifyAuth(code ? code : undefined)

  const [cookies] = useCookies()

  const SpotifyApi = new SpotifyWebApi({
    clientId: auth.clientId,
    clientSecret: auth.clientSecret,
    accessToken: cookies.accessToken,
  })

  return (
    <Box
      sx={{
        backgroundImage: `url(${background})`,
        width: "100%",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
        overflow: "hidden",
      }}
    >
      <Navigation SpotifyApi={SpotifyApi} />
      <Application SpotifyApi={SpotifyApi} />
    </Box>
  )
}

export default MainView

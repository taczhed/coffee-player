import { Box } from "@mui/material"
import { useState, useEffect } from "react"
import SpotifyWebApi from "spotify-web-api-node"
import useSpotifyAuth from "../../../useSpotifyAuth"
import AutoSearchBar from "./AutoSearchBar"
import Player from "./Player"

const auth = require("../../../auth.json")
const code = new URLSearchParams(window.location.search).get("code")
const SpotifyApi = new SpotifyWebApi({
  clientId: auth.clientId,
})

const Application = () => {
  const [currentSong, setCurrentSong] = useState<string | undefined>(undefined)
  const accessToken = useSpotifyAuth(code)

  useEffect(() => {
    if (!accessToken) return
    SpotifyApi.setAccessToken(accessToken)
  }, [accessToken])

  return (
    <Box sx={{ width: "100%", height: "100%", position: "relative" }}>
      <AutoSearchBar
        accessToken={accessToken}
        SpotifyApi={SpotifyApi}
        setCurrentSong={setCurrentSong}
      />
      <Player accessToken={accessToken} currentSong={currentSong} />
    </Box>
  )
}
export default Application

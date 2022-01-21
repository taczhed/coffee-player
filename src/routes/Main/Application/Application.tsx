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
  const accessToken = useSpotifyAuth(code ? code : undefined)

  useEffect(() => {
    if (!accessToken) return
    SpotifyApi.setAccessToken(accessToken)
  }, [accessToken])

  const renderApplication = () => {
    if (accessToken) {
      return (
        <>
          <AutoSearchBar
            accessToken={accessToken}
            SpotifyApi={SpotifyApi}
            setCurrentSong={setCurrentSong}
          />
          <Player accessToken={accessToken} currentSong={currentSong} />
        </>
      )
    } else return null
  }

  return (
    <Box sx={{ width: "100%", height: "100%", position: "relative" }}>
      {renderApplication()}
    </Box>
  )
}
export default Application

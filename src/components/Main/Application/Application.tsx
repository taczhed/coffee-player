import { Box } from "@mui/material"
import { useEffect } from "react"
import { useCookies } from "react-cookie"
import SpotifyWebApi from "spotify-web-api-node"
import useSpotifyAuth from "../../../hooks/useSpotifyAuth"
import AutoSearchBar from "../../SearchBar/AutoSearchBar"
import Content from "./Content"
import Player from "./Player"

interface ApplicationProps {
  SpotifyApi: SpotifyWebApi
}

const Application = ({ SpotifyApi }: ApplicationProps) => {
  const [cookies] = useCookies()

  useEffect(() => {
    if (!cookies.accessToken) return
    SpotifyApi.setAccessToken(cookies.accessToken)
  }, [cookies.accessToken, SpotifyApi])

  const renderApplication = () => {
    if (cookies.accessToken) {
      return (
        <Box sx={{ height: "100%", width: "100%", position: "relative" }}>
          <AutoSearchBar SpotifyApi={SpotifyApi} />
          <Content SpotifyApi={SpotifyApi} />
          <Player SpotifyApi={SpotifyApi} />
        </Box>
      )
    } else return null
  }

  return <Box sx={{ height: "100%", width: "100%" }}>{renderApplication()}</Box>
}
export default Application

import { Box } from "@mui/material"
import { useEffect } from "react"
import SpotifyWebApi from "spotify-web-api-node"
import useSpotifyAuth from "../../../hooks/useSpotifyAuth"
import { useAppSelector } from "../../../store/hooks"
import AutoSearchBar from "../../SearchBar/AutoSearchBar"
import Content from "./Content"
import Player from "./Player"
import auth from "../../../auth.json"

const code = new URLSearchParams(window.location.search).get("code")

const Application = () => {
  const accessToken = useAppSelector((state) => state.accessToken.value)

  const SpotifyApi = new SpotifyWebApi({
    clientId: auth.clientId,
    clientSecret: auth.clientSecret,
    accessToken: accessToken,
  })

  useSpotifyAuth(code ? code : undefined)
  useEffect(() => {
    if (!accessToken) return
    SpotifyApi.setAccessToken(accessToken)
  }, [accessToken])

  const renderApplication = () => {
    if (accessToken) {
      return (
        <>
          <AutoSearchBar accessToken={accessToken} SpotifyApi={SpotifyApi} />
          <Content SpotifyApi={SpotifyApi} />
          <Player accessToken={accessToken} SpotifyApi={SpotifyApi} />
        </>
      )
    } else return null
  }

  return <Box sx={{ width: "100%", height: "100%" }}>{renderApplication()}</Box>
}
export default Application

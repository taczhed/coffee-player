import { Box } from "@mui/material"
import { useState, useEffect, createContext } from "react"
import SpotifyWebApi from "spotify-web-api-node"
import useSpotifyAuth from "../../../hooks/useSpotifyAuth"
import { useAppSelector } from "../../../store/hooks"
import AutoSearchBar from "../../SearchBar/AutoSearchBar"
import Content from "./Content"
import Player from "./Player"

const auth = require("../../../auth.json")
const code = new URLSearchParams(window.location.search).get("code")
const SpotifyApi = new SpotifyWebApi({
  clientId: auth.clientId,
})

const Application = () => {
  console.log("Application re-render")

  const authorization = useSpotifyAuth(code ? code : undefined)
  const accessToken = useAppSelector((state) => state.accessToken.value)

  useEffect(() => {
    if (!accessToken) return
    SpotifyApi.setAccessToken(accessToken)
  }, [accessToken])

  const renderApplication = () => {
    if (accessToken) {
      return (
        <>
          <AutoSearchBar accessToken={accessToken} SpotifyApi={SpotifyApi} />
          <Content />
          <Player accessToken={accessToken} />
        </>
      )
    } else return null
  }

  return <Box sx={{ width: "100%", height: "100%" }}>{renderApplication()}</Box>
}
export default Application

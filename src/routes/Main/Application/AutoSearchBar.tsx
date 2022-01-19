import { InputBase, Button, Box, Stack, Typography } from "@mui/material"
import React, { useState, useEffect } from "react"
import SearchIcon from "@mui/icons-material/Search"
import SpotifyWebApi from "spotify-web-api-node"
import useSpotifyAuth from "../../../useSpotifyAuth"
import { reduceTracks, smashArtists } from "../../../utilities/searchFunctions"
import AutoSearchBarItem from "./AutoSearchBarItem"
const auth = require("../../../auth.json")

const SpotifyApi = new SpotifyWebApi({
  clientId: auth.clientId,
})

interface Track {
  artists: string[]
  title: string
  uri: string
  albumUrl: string
}

const AutoSearchBar = () => {
  const code = new URLSearchParams(window.location.search).get("code")
  const accessToken = useSpotifyAuth(code)
  const [searchText, setSearchText] = useState("")
  const [searchResults, setSearchResults] = useState<Array<Track>>([])

  useEffect(() => {
    if (!accessToken) return
    SpotifyApi.setAccessToken(accessToken)
  }, [accessToken])

  useEffect(() => {
    if (searchText === "") return setSearchResults([])
    if (!accessToken) return

    SpotifyApi.searchTracks(searchText).then((res) => {
      let data = res.body.tracks
      let tracks = reduceTracks(data)

      if (searchText === "") return setSearchResults([])
      else setSearchResults(tracks ? tracks.slice(0, 5) : [])
    })
  }, [searchText, accessToken])

  return (
    <Box
      sx={{
        width: "100%",
        py: 2,
        px: 3,
        background: "rgba(255, 255, 255, 0.15)",
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          borderRadius: 20,
          position: "relative",
        }}
      >
        <Button
          sx={{
            width: 48,
            height: 48,
            borderRadius: 0,
            background: "rgba(255, 255, 255, 0.15)",
          }}
        >
          <SearchIcon
            sx={{
              color: "white",
            }}
          />
        </Button>
        <InputBase
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search..."
          sx={{
            color: "white",
            fontSize: 16,
            width: "100%",
            background: "rgba(255, 255, 255, 0.15)",
            px: 1,
          }}
        />
        {searchResults.length > 0 ? (
          <Stack
            sx={{
              left: 0,
              top: 48,
              width: "100%",
              position: "absolute",
              background: "rgba(200, 200, 200, 0.75)",
              py: 1,
            }}
          >
            {searchResults.map((result, index) => (
              <AutoSearchBarItem
                key={index}
                title={result.title}
                artists={smashArtists(result.artists)}
                imgSrc={result.albumUrl}
              />
            ))}
          </Stack>
        ) : null}
      </Box>
    </Box>
  )
}

export default AutoSearchBar

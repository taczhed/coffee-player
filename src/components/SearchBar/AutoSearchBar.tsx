import { InputBase, Button, Box, Stack } from "@mui/material"
import React, { useState, useEffect } from "react"
import SearchIcon from "@mui/icons-material/Search"
import SpotifyWebApi from "spotify-web-api-node"
import { reduceTracks, smashArtists } from "../../utilities/searchFunctions"
import AutoSearchBarItem from "./AutoSearchBarItem"

interface Track {
  artists: string[]
  title: string
  uri: string
  albumUrl: string
}

interface AutoSearchBarProps {
  accessToken: string | undefined
  SpotifyApi: SpotifyWebApi
}

const AutoSearchBar = ({ accessToken, SpotifyApi }: AutoSearchBarProps) => {
  const [searchText, setSearchText] = useState("")
  const [searchResults, setSearchResults] = useState<Array<Track>>([])
  const [areSearchResultsFocused, setAreSearchResultsFocused] = useState(false)

  //typing into searchbar mechanism
  useEffect(() => {
    if (searchText === "") return setSearchResults([])
    if (!accessToken) return

    SpotifyApi.searchTracks(searchText).then((res) => {
      let data = res.body.tracks
      let tracks = reduceTracks(data)

      if (searchText === "") return setSearchResults([])
      else setSearchResults(tracks ? tracks.slice(0, 5) : [])
    })
  }, [searchText, accessToken, SpotifyApi])

  return (
    <Box
      sx={{
        width: "100%",
        background: "rgba(255, 255, 255, 0.15)",
        py: {
          xs: 0,
          sm: 1,
        },
        px: {
          xs: 0,
          sm: 1,
        },
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
              width: {
                xs: 18,
                sm: 48,
              },
              color: "white",
            }}
          />
        </Button>
        <InputBase
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onClick={() => setAreSearchResultsFocused(true)}
          placeholder="Search..."
          sx={{
            color: "white",
            fontSize: {
              xs: 12,
              sm: 16,
            },
            width: "100%",
            background: "rgba(255, 255, 255, 0.15)",
            px: 1,
          }}
        />
        {areSearchResultsFocused && searchResults.length > 0 ? (
          <Stack
            onClick={() =>
              setTimeout(() => setAreSearchResultsFocused(false), 100)
            }
            sx={{
              left: 0,
              top: 48,
              width: "100%",
              position: "absolute",
              background: "rgba(215, 215, 215, 1)",
              py: {
                xs: 0,
                sm: 1,
              },
            }}
          >
            {searchResults.map((result, index) => (
              <AutoSearchBarItem
                key={index}
                title={result.title}
                uri={result.uri}
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

import { useEffect, useState } from "react"
import useSpotifyPlayer from "../../../useSpotifyPlayer"
import SpotifyPlayer from "react-spotify-web-playback"
import { Box } from "@mui/material"

interface PlayerProps {
  accessToken: string | undefined
  currentSong: string | undefined
}

const Player = ({ accessToken, currentSong }: PlayerProps) => {
  const { lastCachedTrack, fetchRecommendations } =
    useSpotifyPlayer(accessToken)
  const [playerState, setPlayerState] = useState<any>(null)

  // fetchRecommendations()

  useEffect(() => {
    fetchRecommendations()
  }, [])

  return (
    <Box
      sx={{
        position: "absolute",
        width: "100%",
        height: 84,
        background: "rgba(255, 255, 255, 0.15)",
        bottom: 0,
        fontFamily: "'Barlow', sans-serif",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {lastCachedTrack ? (
        <>
          <SpotifyPlayer
            callback={(state) => setPlayerState(state)}
            name="Coffee Player"
            // play
            persistDeviceSelection
            syncExternalDevice
            showSaveIcon
            token={accessToken ? accessToken : "token_undefined"}
            uris={currentSong ? [currentSong] : [lastCachedTrack.uri]}
            styles={{
              height: 84,
              activeColor: "teal",
              sliderColor: "teal",
              sliderHeight: 6,
            }}
          />
          <Box
            sx={{
              position: "absolute",
              right: 100,
            }}
          >
            0:00 / 0:00
          </Box>
        </>
      ) : null}
    </Box>
  )
}

export default Player

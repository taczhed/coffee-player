import { useEffect, useState } from "react"
import useSpotifyPlayer from "../../../hooks/useSpotifyPlayer"
import SpotifyPlayer from "react-spotify-web-playback"
import { Box } from "@mui/material"
import { useAppSelector } from "../../../store/hooks"

interface PlayerProps {
  accessToken: string | undefined
}

const Player = ({ accessToken }: PlayerProps) => {
  const { lastCachedTrack } = useSpotifyPlayer(accessToken)
  const [playerState, setPlayerState] = useState<any>(null)
  const currentSong = useAppSelector((state) => state.currentSong.value)

  return (
    <Box
      sx={{
        width: "100%",
        height: 80,
        background: "rgba(255, 255, 255, 0.15)",
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
            play
            // autoPlay
            persistDeviceSelection
            syncExternalDevice
            showSaveIcon
            token={accessToken ? accessToken : "token_undefined"}
            uris={currentSong ? [currentSong] : [lastCachedTrack.uri]}
            styles={{
              height: 80,
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

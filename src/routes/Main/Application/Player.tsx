import { Box, Button, Typography } from "@mui/material"
import { useEffect } from "react"
import useSpotifyPlayer from "../../../useSpotifyPlayer"
import { playerArtists } from "../../../utilities/searchFunctions"

interface PlayerProps {
  accessToken: string | undefined
  currentSong: string | undefined
}

const Player = ({ accessToken, currentSong }: PlayerProps) => {
  const { deviceId, player, playerState, currentTrack, playSong } =
    useSpotifyPlayer(accessToken)

  useEffect(() => {
    playSong([currentSong ? currentSong : "invalid_song"])
  }, [currentSong])

  return (
    <Box
      sx={{
        position: "absolute",
        width: "100%",
        height: 100,
        background: "rgba(255, 255, 255, 0.15)",
        bottom: 0,
        fontFamily: "'Barlow', sans-serif",
        display: "flex",
        alignItems: "center",
      }}
    >
      <img
        src={currentTrack?.album.images[0].url}
        alt=""
        height={100}
        width={100}
      />
      <Box sx={{ ml: 2 }}>
        <Typography variant="h6">{currentTrack?.name}</Typography>
        <Typography variant="body1">
          {playerArtists(currentTrack?.artists)}
        </Typography>
      </Box>
      <Button
        onClick={() => playSong(["spotify:track:0c9Lta2FrUObLdGpIYBROW"])}
      >
        Play
      </Button>
    </Box>
  )
}

export default Player

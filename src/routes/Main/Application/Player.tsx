import { Box } from "@mui/material"
import SpotifyPlayer from "react-spotify-web-playback"

interface PlayerProps {
  accessToken: string | null
  currentSong: string | undefined
}

const code = new URLSearchParams(window.location.search).get("code")

const Player = ({ accessToken, currentSong }: PlayerProps) => {
  const renderSpotifyPlayer = () => {
    if (code !== accessToken) {
      return (
        <SpotifyPlayer
          token={accessToken ? accessToken : "error"}
          uris={
            currentSong
              ? [currentSong]
              : ["spotify:track:0c9Lta2FrUObLdGpIYBROW"]
          }
          styles={{
            height: "80px",
            bgColor: "rgba(255, 255, 255, 1)",
            trackNameColor: "#000000",
            trackArtistColor: "#555555",
            sliderColor: "cyan",
          }}
        />
      )
    }
  }

  return (
    <Box
      sx={{
        position: "absolute",
        width: "100%",
        height: 80,
        background: "rgba(255, 255, 255, 0.15)",
        bottom: 0,
        fontFamily: "'Barlow', sans-serif",
      }}
    >
      {renderSpotifyPlayer()}
    </Box>
  )
}

export default Player

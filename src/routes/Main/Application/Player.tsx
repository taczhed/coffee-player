import { Box, Button, Slider, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import useSpotifyPlayer from "../../../useSpotifyPlayer"
import { playerArtists } from "../../../utilities/searchFunctions"
import PlayArrowIcon from "@mui/icons-material/PlayArrow"
import PauseIcon from "@mui/icons-material/Pause"
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious"
import SkipNextIcon from "@mui/icons-material/SkipNext"

interface PlayerProps {
  accessToken: string | undefined
  currentSong: string | undefined
}

const Player = ({ accessToken, currentSong }: PlayerProps) => {
  const [isPaused, setIsPaused] = useState(true)
  const {
    deviceId,
    player,
    playerState,
    currentTrack,
    playSong,
    getCurrentPosition,
  } = useSpotifyPlayer(accessToken)

  useEffect(() => {
    playSong([currentSong ? currentSong : "invalid_song"])
    setIsPaused(false)
  }, [currentSong])

  console.log(playerState)

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
        justifyContent: "space-between",
      }}
    >
      {/* Song informations */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: 320,
        }}
      >
        <img
          src={currentTrack?.album.images[0].url}
          alt=""
          height={100}
          width={100}
        />
        <Box
          sx={{
            ml: 2,
            overflow: "hidden",
            whiteSpace: "nowrap",
            color: "white",
          }}
        >
          <Typography variant="subtitle2">{currentTrack?.name}</Typography>
          <Typography variant="overline">
            {playerArtists(currentTrack?.artists)}
          </Typography>
        </Box>
      </Box>

      {/* Controls */}
      <Box
        id="button-container"
        sx={{
          width: 320,
          position: "absolute",
          left: "calc(50% - 320px / 2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 20,
        }}
      >
        <Button>
          <SkipPreviousIcon fontSize={"large"} />
        </Button>

        <Button
          onClick={() => {
            player?.togglePlay()
            setIsPaused((prev) => !prev)
          }}
        >
          {isPaused ? (
            <PlayArrowIcon fontSize={"large"} />
          ) : (
            <PauseIcon fontSize={"large"} />
          )}
        </Button>

        <Button>
          <SkipNextIcon fontSize={"large"} />
        </Button>
      </Box>

      {/* progress bar */}
      <Slider
        aria-label="time-indicator"
        size="small"
        // value={playerState?.position}
        min={0}
        step={1}
        max={playerState?.duration}
        // onChange={(_, value) => setPosition(value as number)}
        sx={{
          color: "white",
          height: 5,
          position: "absolute",
          bottom: 87,
          "& .MuiSlider-thumb": {
            width: 8,
            height: 8,
            transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
            "&:before": {
              boxShadow: "0 2px 12px 0 rgba(0,0,0,0.4)",
            },
            "&:hover, &.Mui-focusVisible": {
              boxShadow: `0px 0px 0px 8px "rgb(0 0 0 / 16%)"`,
            },
            "&.Mui-active": {
              width: 20,
              height: 20,
            },
          },
          "& .MuiSlider-rail": {
            opacity: 0.28,
          },
        }}
      />
    </Box>
  )
}

export default Player

import { Box, Typography } from "@mui/material"
import PlayArrowIcon from "@mui/icons-material/PlayArrow"
import { useAppDispatch } from "../store/hooks"
import { handleCurrentSong } from "../store/currentSongSlice"

interface TableRowProps {
  track: Spotify.Track
}

const TableRow = ({ track }: TableRowProps) => {
  const dispatch = useAppDispatch()
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        backgroundColor: "rgba(255,255,255,0.30)",
        width: "100%",
        justifyContent: "flex-start",
        alignItems: "center",
        color: "white",
        p: 0.5,
      }}
    >
      <Box
        sx={{
          width: 48,
          height: 48,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 20,
          backgroundImage: `url(${
            track.album.images[track.album.images.length - 1].url
          })`,
          transition: "0.3s",
          "&:hover": {
            cursor: "pointer",
            transform: "rotate(20deg)",
          },
        }}
        onClick={() => dispatch(handleCurrentSong(track.uri))}
      >
        <PlayArrowIcon />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          textAlign: "left",
          px: 2,
        }}
      >
        <Typography variant="body1">{track.artists[0].name}</Typography>
        <Typography variant="overline">{track.name}</Typography>
      </Box>
    </Box>
  )
}

export default TableRow

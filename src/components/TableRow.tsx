import { Box, Typography } from "@mui/material"
import PlayArrowIcon from "@mui/icons-material/PlayArrow"
import EqualizerIcon from "@mui/icons-material/Equalizer"
import { useAppDispatch, useAppSelector } from "../store/hooks"
import { handleCurrentTrack } from "../store/currentTrackSlice"

interface TableRowProps {
  track: any
}

const TableRow = ({ track }: TableRowProps) => {
  const dispatch = useAppDispatch()
  const currentSong = useAppSelector((state) => state.currentTrack.value)
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
          width: { xs: 30, sm: 48 },
          height: { xs: 30, sm: 48 },
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
        onClick={() => dispatch(handleCurrentTrack(track))}
      >
        {track === currentSong ? <EqualizerIcon /> : <PlayArrowIcon />}
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          textAlign: "left",
          px: { xs: 1, sm: 2 },
        }}
      >
        <Typography variant="body1" sx={{ fontSize: { xs: 12, sm: 16 } }}>
          {track.artists[0].name}
        </Typography>
        <Typography variant="overline" sx={{ fontSize: { xs: 10, sm: 12 } }}>
          {track.name}
        </Typography>
      </Box>
    </Box>
  )
}

export default TableRow

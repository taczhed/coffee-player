import { CircularProgress, Stack } from "@mui/material"
import TableRow from "./TableRow"

interface TrackListProps {
  tracks: Array<Spotify.Track>
}

const TrackList = ({ tracks }: TrackListProps) => {
  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      spacing={1}
      sx={{ width: "100%" }}
    >
      {tracks.length === 0 ? (
        <CircularProgress color="info" />
      ) : (
        tracks.map((track) => <TableRow key={track.id} track={track} />)
      )}
    </Stack>
  )
}

export default TrackList

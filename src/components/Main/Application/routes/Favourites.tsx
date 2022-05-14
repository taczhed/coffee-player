import { Box, Pagination, Stack } from "@mui/material"
import { useEffect, useState } from "react"
import useSpotifyContent from "../../../../hooks/useSpotifyContent"
import { useAppSelector } from "../../../../store/hooks"
import RouteHeader from "../../../RouteHeader"
import TrackList from "../../../TrackList"

const Favourites = () => {
  const accessToken = useAppSelector((state) => state.accessToken.value)
  const { fetchSavedSongs } = useSpotifyContent(accessToken)
  const [totalNumberOfTracks, setTotalNumberOfTracks] = useState(0)
  const [pageNumber, setPageNumber] = useState(1)
  const [favouriteTracks, setFavouriteTracks] = useState<Array<Spotify.Track>>(
    [],
  )

  useEffect(() => {
    ;(async () => {
      const data = await fetchSavedSongs(pageNumber)
      let items = data.items.map((item: { track: Spotify.Track }) => item.track)
      setTotalNumberOfTracks(data.total)
      setFavouriteTracks(items)
    })()
  }, [pageNumber])

  const countPages = () => {
    return Math.ceil(totalNumberOfTracks / 30)
  }

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <RouteHeader
        title="Favourites"
        subtitle="Playlist of your favourite tracks"
      />
      <TrackList tracks={favouriteTracks} />
      <Stack spacing={1} sx={{ my: 1 }}>
        <Pagination
          count={countPages()}
          shape="rounded"
          size="small"
          onChange={(event: React.ChangeEvent<unknown>, value: number) =>
            setPageNumber(value)
          }
        />
      </Stack>
    </Box>
  )
}

export default Favourites

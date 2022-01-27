import { Box, CircularProgress, Stack, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import TableRow from "../../../components/TableRow"
import useSpotifyRecommendations from "../../../useSpotifyRecommendations"
import { useAppSelector } from "../../../utilities/hooks"
import RecommendationBox from "./RecommendationBox"

const Discover = () => {
  const accessToken = useAppSelector((state) => state.accessToken.value)
  const { fetchRecommendations } = useSpotifyRecommendations(accessToken)

  const [recommendedTracks, setRecommendedTracks] = useState<
    Array<Spotify.Track>
  >([])

  useEffect(() => {
    toggleRecommendation("Your favourite Artists")
  }, [])

  const toggleRecommendation = async (type: string) => {
    setRecommendedTracks([])
    const {
      recomendationsBasedOnArtists,
      recomendationsBasedOnRecentlyPlayedTracks,
    } = await fetchRecommendations()

    console.log(recomendationsBasedOnArtists)

    if (type === "Your favourite Artists")
      setRecommendedTracks(recomendationsBasedOnArtists)
    if (type === "Recently played tracks")
      setRecommendedTracks(recomendationsBasedOnRecentlyPlayedTracks)
  }

  return (
    <Box sx={{ width: "100%", height: "100%", px: 4, py: 2 }}>
      <Stack direction="row" justifyContent="center" alignItems="center">
        <Box sx={{ mr: 6 }}>
          <Typography variant="h4" color="white" sx={{ fontWeight: 500 }}>
            Discover
          </Typography>
          <Typography variant="body1" color="white">
            Generate recommendations by
          </Typography>
        </Box>

        <RecommendationBox
          title="Your favourite Artists"
          bgc="rgba(255,255,255,0.30)"
          toggleRecommendation={toggleRecommendation}
        />

        <RecommendationBox
          title="Recently played tracks"
          bgc="rgba(255,255,255,0.30)"
          toggleRecommendation={toggleRecommendation}
        />
      </Stack>
      <Stack
        justifyContent="center"
        alignItems="center"
        spacing={1}
        sx={{
          mt: 4,
          height: "calc(100% - 220px)",
          overflowY: "scroll",
          "&::-webkit-scrollbar": {
            width: 5,
            height: 5,
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            borderRadius: 10,
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(255, 255, 255, 0.50)",
            borderRadius: 10,
          },
        }}
      >
        {recommendedTracks.length === 0 ? (
          <CircularProgress color="info" />
        ) : (
          recommendedTracks.map((track) => (
            <TableRow key={track.id} track={track} />
          ))
        )}
      </Stack>
    </Box>
  )
}

export default Discover

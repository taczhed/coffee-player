import { Box, CircularProgress, Stack, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import TableRow from "../../../TableRow"
import useSpotifyRecommendations from "../../../../hooks/useSpotifyRecommendations"
import { useAppSelector } from "../../../../store/hooks"
import RecommendationBox from "../../../RecommendationBox"

const Discover = () => {
  const accessToken = useAppSelector((state) => state.accessToken.value)
  const { fetchRecommendations } = useSpotifyRecommendations(accessToken)

  const [recommendedTracks, setRecommendedTracks] = useState<
    Array<Spotify.Track>
  >([])

  const [boxImages, setBoxImages] = useState<Array<string>>([])

  useEffect(() => {
    toggleRecommendation("Your favourite Artists")
  }, [])

  const toggleRecommendation = async (type: string) => {
    setRecommendedTracks([])
    const {
      recomendationsBasedOnArtists,
      recomendationsBasedOnRecentlyPlayedTracks,
    } = await fetchRecommendations()

    console.log(recomendationsBasedOnRecentlyPlayedTracks)

    if (type === "Your favourite Artists")
      setRecommendedTracks(recomendationsBasedOnArtists)
    if (type === "Recently played tracks")
      setRecommendedTracks(recomendationsBasedOnRecentlyPlayedTracks)
  }

  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        sx={{ mb: 3 }}
      >
        <Box sx={{ mr: 6 }}>
          <Typography variant="h3" color="white" sx={{ fontWeight: 500 }}>
            Discover
          </Typography>
          <Typography variant="body1" color="white">
            Generate recommendations by
          </Typography>
        </Box>

        <RecommendationBox
          title="Your favourite Artists"
          toggleRecommendation={toggleRecommendation}
        />

        <RecommendationBox
          title="Recently played tracks"
          toggleRecommendation={toggleRecommendation}
        />
      </Stack>
      <Stack justifyContent="center" alignItems="center" spacing={1}>
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

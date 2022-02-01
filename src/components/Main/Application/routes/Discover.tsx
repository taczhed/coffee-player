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

    setBoxImages([
      recomendationsBasedOnArtists[0].album.images[
        recomendationsBasedOnArtists[0].album.images.length - 2
      ].url,
      recomendationsBasedOnRecentlyPlayedTracks[0].album.images[
        recomendationsBasedOnRecentlyPlayedTracks[0].album.images.length - 2
      ].url,
    ])

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
          bgcimg={boxImages[0]}
          title="Your favourite Artists"
          toggleRecommendation={toggleRecommendation}
        />

        <RecommendationBox
          bgcimg={boxImages[1]}
          title="Recently played tracks"
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

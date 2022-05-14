import { Box } from "@mui/material"
import { useEffect, useState } from "react"
import useSpotifyContent from "../../../../hooks/useSpotifyContent"
import { useAppSelector } from "../../../../store/hooks"
import RecommendationBox from "../../../RecommendationBox"
import RouteHeader from "../../../RouteHeader"
import TrackList from "../../../TrackList"

const Discover = () => {
  const accessToken = useAppSelector((state) => state.accessToken.value)
  const { fetchRecommendations } = useSpotifyContent(accessToken)

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

    if (type === "Your favourite Artists")
      setRecommendedTracks(recomendationsBasedOnArtists)
    if (type === "Recently played tracks")
      setRecommendedTracks(recomendationsBasedOnRecentlyPlayedTracks)
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
        title="Discover"
        subtitle="Generate recommendations by"
        buttons={[
          <RecommendationBox
            key={1}
            title="Your favourite Artists"
            toggleRecommendation={toggleRecommendation}
          />,
          <RecommendationBox
            key={2}
            title="Recently played tracks"
            toggleRecommendation={toggleRecommendation}
          />,
        ]}
      />
      <TrackList tracks={recommendedTracks} />
    </Box>
  )
}

export default Discover

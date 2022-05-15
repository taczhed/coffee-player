import { Box } from "@mui/material"
import { useEffect, useState } from "react"
import { useCookies } from "react-cookie"
import SpotifyWebApi from "spotify-web-api-node"
import useSpotifyContent from "../../../../hooks/useSpotifyContent"
import RecommendationBox from "../../../RecommendationBox"
import RouteHeader from "../../../RouteHeader"
import TrackList from "../../../TrackList"

interface DiscoverProps {
  SpotifyApi: SpotifyWebApi
}

const Discover = ({ SpotifyApi }: DiscoverProps) => {
  const [cookies] = useCookies()
  const [recommendedTracks, setRecommendedTracks] = useState<Array<any>>([])
  const { fetchRecommendations } = useSpotifyContent(
    cookies.accessToken,
    SpotifyApi,
  )

  useEffect(() => {
    toggleRecommendation("Your favourite Artists")
  }, [])

  const toggleRecommendation = async (type: string) => {
    if (type === "Your favourite Artists")
      setRecommendedTracks(await fetchRecommendations("artists"))
    else if (type === "Recently played tracks")
      setRecommendedTracks(await fetchRecommendations("tracks"))
    else setRecommendedTracks([])
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

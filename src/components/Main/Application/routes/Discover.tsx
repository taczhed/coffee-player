import { Box } from "@mui/material"
import { useEffect, useState } from "react"
import SpotifyWebApi from "spotify-web-api-node"
import useSpotifyContent from "../../../../hooks/useSpotifyContent"
import { useAppSelector } from "../../../../store/hooks"
import RecommendationBox from "../../../RecommendationBox"
import RouteHeader from "../../../RouteHeader"
import TrackList from "../../../TrackList"

interface DiscoverProps {
  SpotifyApi: SpotifyWebApi
}

const Discover = ({ SpotifyApi }: DiscoverProps) => {
  const accessToken = useAppSelector((state) => state.accessToken.value)
  const { getRecommendations } = useSpotifyContent(accessToken, SpotifyApi)

  const [recommendedTracks, setRecommendedTracks] = useState<Array<any>>([])

  useEffect(() => {
    toggleRecommendation("Your favourite Artists")
  }, [])

  const toggleRecommendation = async (type: string) => {
    setRecommendedTracks([])

    if (type === "Your favourite Artists")
      setRecommendedTracks(await getRecommendations("artists"))
    if (type === "Recently played tracks")
      setRecommendedTracks(await getRecommendations("tracks"))
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

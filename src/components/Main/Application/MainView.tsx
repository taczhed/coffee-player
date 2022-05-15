import { Box } from "@mui/material"
import SpotifyWebApi from "spotify-web-api-node"
import AutoSearchBar from "../../SearchBar/AutoSearchBar"
import Content from "./Content"
import Player from "./Player"

interface MainViewProps {
  SpotifyApi: SpotifyWebApi
}

const MainView = ({ SpotifyApi }: MainViewProps) => {
  return (
    <Box sx={{ height: "100%", width: "100%", position: "relative" }}>
      <AutoSearchBar SpotifyApi={SpotifyApi} />
      <Content SpotifyApi={SpotifyApi} />
      <Player SpotifyApi={SpotifyApi} />
    </Box>
  )
}
export default MainView

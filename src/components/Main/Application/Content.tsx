import { Box } from "@mui/material"
import { Switch, Route } from "react-router-dom"
import SpotifyWebApi from "spotify-web-api-node"
import Discover from "./routes/Discover"
import Favourites from "./routes/Favourites"

interface ContentProps {
  SpotifyApi: SpotifyWebApi
}

const Content = ({ SpotifyApi }: ContentProps) => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "calc(100% - 80px * 2)",
        overflowY: "scroll",
        p: {
          xs: 1,
          sm: 3,
        },
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
      <Switch>
        <Route path="/favourites">
          <Favourites SpotifyApi={SpotifyApi} />
        </Route>

        <Route path="/albums">Albums</Route>

        <Route path="/artists">Artists</Route>

        <Route path="*">
          <Discover SpotifyApi={SpotifyApi} />
        </Route>
      </Switch>
    </Box>
  )
}

export default Content

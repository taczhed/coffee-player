import { Box } from "@mui/material"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import Discover from "../../Contents/Discover/Discover"

const Content = () => {
  return (
    <Box sx={{ width: "100%", height: "calc(100% - 80px * 2)" }}>
      <Switch>
        <Route path="/favourites">Favourites</Route>
        <Route path="/albums">Albums</Route>
        <Route path="/artists">Artists</Route>
        <Route path="*">
          <Discover />
        </Route>
      </Switch>
    </Box>
  )
}

export default Content

import { Box } from "@mui/material"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import Discover from "./routes/Discover"

const Content = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "calc(100% - 80px * 2)",
        overflowY: "scroll",
        p: 3,
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

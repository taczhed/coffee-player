import { Box } from "@mui/material"
import React, { useEffect, useState } from "react"
import Logo from "./Logo"
import NavigationElement from "./NavigationElement"
import FavoriteIcon from "@mui/icons-material/Favorite"
import TravelExploreIcon from "@mui/icons-material/TravelExplore"
import GroupIcon from "@mui/icons-material/Group"
import useSpotifyContent from "../../hooks/useSpotifyContent"
import SpotifyWebApi from "spotify-web-api-node"
import { useCookies } from "react-cookie"
import UserBox from "./UserBox"

interface NavigationProps {
  SpotifyApi: SpotifyWebApi
}

const Navigation = ({ SpotifyApi }: NavigationProps) => {
  const navigationItems = [
    { name: "Discover", url: "", icon: <TravelExploreIcon /> },
    { name: "Favourites", url: "favourites", icon: <FavoriteIcon /> },
    { name: "Most Listened", url: "most-listened", icon: <GroupIcon /> },
    // { name: "Albums", url: "albums", icon: <AlbumIcon /> },
    // { name: "Artists", url: "artists", icon: <GroupIcon /> },
  ]
  const [userData, setUserData] =
    useState<SpotifyApi.CurrentUsersProfileResponse>()
  const [cookies] = useCookies()
  const { getMe } = useSpotifyContent(cookies.accessToken, SpotifyApi)
  const userDataSetter = async () => setUserData(await getMe())

  useEffect(() => {
    userDataSetter()
  }, [])

  return (
    <Box
      sx={{
        width: {
          xs: 64,
          sm: 164,
        },
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
        py: 1,
        background: "rgba(255,255,255,0.15)",
        borderRight: "1px solid rgba(255,255,255,0.15)",
      }}
    >
      <Box>
        <Logo />
        {navigationItems.map((element) => (
          <NavigationElement
            key={element.url}
            name={element.name}
            url={element.url}
            icon={element.icon}
          />
        ))}
      </Box>

      <UserBox userData={userData} />
    </Box>
  )
}

export default Navigation

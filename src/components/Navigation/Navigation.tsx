import { Box } from "@mui/material"
import React, { useEffect, useState } from "react"
import Logo from "./Logo"
import NavigationElement from "./NavigationElement"
import FavoriteIcon from "@mui/icons-material/Favorite"
import AlbumIcon from "@mui/icons-material/Album"
import GroupIcon from "@mui/icons-material/Group"
import useSpotifyContent from "../../hooks/useSpotifyContent"
import SpotifyWebApi from "spotify-web-api-node"
import { useCookies } from "react-cookie"

interface NavigationProps {
  SpotifyApi: SpotifyWebApi
}

const Navigation = ({ SpotifyApi }: NavigationProps) => {
  const navigationItems = [
    { name: "Favourites", url: "favourites", icon: <FavoriteIcon /> },
    { name: "Albums", url: "albums", icon: <AlbumIcon /> },
    { name: "Artists", url: "artists", icon: <GroupIcon /> },
  ]

  const [cookies] = useCookies()
  const [userData, setUserData] = useState<any>()
  const { getMe } = useSpotifyContent(cookies.accessToken, SpotifyApi)

  const userDataSetter = async () => {
    const data = await getMe()
    console.log(data)
    setUserData(data)
  }

  useEffect(() => {
    userDataSetter()
  }, [])

  useEffect(() => {
    // console.log(userData)
  }, [userData])

  return (
    <Box
      sx={{
        width: {
          xs: 64,
          sm: 164,
        },
        height: "100%",
        py: 1,
        background: "rgba(255,255,255,0.15)",
        borderRight: "1px solid rgba(255,255,255,0.15)",
      }}
    >
      <Logo />
      {navigationItems.map((element) => (
        <NavigationElement
          key={element.url}
          name={element.name}
          url={element.url}
          icon={element.icon}
        />
      ))}

      {console.log(userData)}
    </Box>
  )
}

export default Navigation

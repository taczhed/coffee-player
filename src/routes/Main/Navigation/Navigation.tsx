import { Box } from "@mui/material"
import React, { useState } from "react"
import Logo from "./Logo"
import NavigationElement from "./NavigationElement"
import FavoriteIcon from "@mui/icons-material/Favorite"
import AlbumIcon from "@mui/icons-material/Album"
import GroupIcon from "@mui/icons-material/Group"

const Navigation = () => {
  const navigationItems = [
    { name: "Example", url: "favourites", icon: <FavoriteIcon /> },
    { name: "Albums", url: "albums", icon: <AlbumIcon /> },
    { name: "Artists", url: "artists", icon: <GroupIcon /> },
  ]
  return (
    <Box
      sx={{
        width: 164,
        height: "100%",
        py: 1,
        background: "rgba(255,255,255,0.15)",
        borderRight: "2px solid rgba(255,255,255,0.15)",
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
    </Box>
  )
}

export default Navigation
